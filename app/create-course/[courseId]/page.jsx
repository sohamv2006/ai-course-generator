"use client"
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import LoadingDialog from '../_components/LoadingDialog';
import { GenerateChapterContent_AI } from '@/configs/AiModel';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';

function CourseLayout({params}) {
    const {user}=useUser();
    const [course,setCourse]=useState([]);
    const [loading, setLoading]=useState(false);
    const router=useRouter();
    useEffect(()=>{
        params &&GetCourse();
    },[params,user])
    const GetCourse=async()=>{
        const result=await db.select().from(CourseList).where(and(eq(CourseList.courseId,params?.courseId),eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress)));
        setCourse(result[0]);
        console.log(result);
    }

    const GenerateChapterContent=async()=>{
        setLoading(true);
        const chapters=course?.courseOutput?.chapters;
        chapters.forEach(async(chapter,index)=>{
            //call api to generate chapter content
            const PROMPT = 'Explain the concept in Detail on Topic:'+course?.name+', Chapter:'+chapter?.chapterName+', in JSON Format with list of array with field as title,explaination on given chapter in detail, Code Example(HTML field in <precode> format) if applicable'
            if(index< course?.courseOutput?.numberOfChapters)
            {
                try{
                    let videoId='';
                        //Generate Video URL
                        service.getVideos(course?.name+':'+chapter?.chapterName).then(resp=>{
                            console.log(resp);
                            videoId=resp[0]?.id?.videoId;
                        })
                        // Generate Chapter Content
                        const result=await GenerateChapterContent_AI.sendMessage(PROMPT);
                        console.log(result?.response?.text());
                        const content=JSON.parse(result?.response?.text());
                        
                        // Save Chapter content + Video URL
                        await db.insert(Chapters).values({
                            chapterId:index,
                            courseId:course?.courseId,
                            content:content,
                            videoId:videoId
                        })
                        setLoading(false);
                }catch(e){
                    setLoading(false);
                    console.log(e);
                }
                router.replace('/create-course/'+course?.courseId+'/finish');
            }
        })
    }

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'> 
    <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

    <LoadingDialog loading={loading}/>
    {/* Basic Info */}
        <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>
    {/* Course Detail */}
        <CourseDetail course={course} /> 
    {/* List of Lesson */}
        <ChapterList course={course} refreshData={()=>GetCourse()}/>

            <Button onClick={GenerateChapterContent}className='my-10'>Generate Course Content</Button>
    </div>
  )
}

export default CourseLayout;