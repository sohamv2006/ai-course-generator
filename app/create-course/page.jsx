'use client'
import { Button } from '@/components/ui/button';
import React, {use, useContext, useEffect, useState} from 'react'
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { HiLightBulb } from "react-icons/hi2";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { GoogleGenAI } from "@google/genai";
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';



function CreateCourse() {
  const StepperOptions=[
    {
      id:1,
      name:"Category",
      icon:<HiMiniSquares2X2 />
    },
    {
      id:2,
      name:"Topic and Desc",
      icon:<HiLightBulb />
    },
    {
      id:3,
      name:"Options",
      icon:<HiClipboardDocumentCheck />
    }
  ]
const {userCourseInput,setUserCourseInput}=useContext(UserInputContext);
const [loading,setLoading]=useState(false);
const [activeIndex,setActiveIndex]=useState(0);  
const{user}=useUser();  
const router = useRouter();
  useEffect(()  => {
    console.log(userCourseInput);
  },[userCourseInput])

const GenerateCourseLayout = async() => {
  setLoading(true);
  const BASIC_PROMPT = 'Generate a course Tutorial on following details with feild as Course Name, Description, Along with Chapter Name, about, Duration ';
  const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ', Topic: ' + userCourseInput?.topic + ', Level: ' + userCourseInput?.level + ', Duration: ' + userCourseInput?.duration + ', No of Chapters: ' + userCourseInput?.noOfChapters + ', Display Video Link: ' + userCourseInput?.displayvideo + '. Make sure to generate the response in JSON format only with keys as courseName, description, chapters (Array of objects with chapterName, about, duration as keys).';
  const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
  console.log(FINAL_PROMPT);
  const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
  const text = await result.response.text();
  console.log(text);
  console.log(JSON.parse(text));
  setLoading(false);
  SaveCourseLayoutInDb(JSON.parse(result.response?.text())); 
};

const SaveCourseLayoutInDb = async(courseLayout) => {

  var id = uuid4(); //Course ID
  var id = uuid4();
  setLoading(true);
  const result = await db.insert(CourseList).values({
    courseId: id,
    name: userCourseInput?.topic,
    level: userCourseInput?.level,
    category: userCourseInput?.category,
    courseOutput: courseLayout,
    createdBy: user?.primaryEmailAddress?.emailAddress,
    userName: user?.fullName,
    userProfileImage: user?.imageUrl
  })
  console.log("Finish");
  setLoading(false);
  router.replace('/create-course/'+id);  
  setLoading(false);  
}


useEffect(()=>{
  console.log(userCourseInput);
},[userCourseInput])
    
const checkstatus=()=>{
  if(userCourseInput?.length==0){
    return true;
  }
  if(activeIndex===0 && (userCourseInput?.category?.length==0 || userCourseInput?.category==undefined))
    {
      return true;
    }
    if(activeIndex===1 && (userCourseInput?.topic?.length==0 || userCourseInput?.topic==undefined))
    {
      return true;
    }
    if(activeIndex===2 && (userCourseInput?.level==undefined || userCourseInput?.duration==undefined || userCourseInput?.displayvideo==undefined || userCourseInput?.noOfChapters==undefined))
    {
      return true;
    }
    return false;
}

  return (
    <div>

      {/* Stepper */}
      <div className='flex flex-col justify-center items-center mt-10 px-5'>
        <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
        <div className='flex mt-10'>
          {StepperOptions.map((items,index)=>(
            <div className='flex items-center' key={items.id}>
              <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                <div className={`p-3 rounded-full text-white ${activeIndex >= index ? "bg-primary" : "bg-gray-200"}`}>
                  {items.icon}
                </div>
                <h2 className='hidden md:block md:text-sm'>{items.name}</h2>
              </div>
              {index!=StepperOptions?.length-1&&
              <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300
                ${activeIndex-1>= index && 'bg-primary'}
              `}></div>} 
            </div>
            
          ))}
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10 '>
      {/* Component */}
          {activeIndex===0?<SelectCategory/>:
          activeIndex==1?<TopicDescription/>:
          activeIndex==2?<SelectOption/>:null}

      {/* Next Previous Button */}
      <div className='flex justify-between mt-10'>  
        <Button disabled={activeIndex===0} 
        className={activeIndex === 0 ? "bg-purple-600 " : "bg-primary "}
        onClick={()=>setActiveIndex(activeIndex-1)} >
          Previous
        </Button>
        {activeIndex < 2 &&<Button disabled={checkstatus()} onClick={()=>setActiveIndex(activeIndex+1)}>Next</Button>}
        {activeIndex== 2 &&<Button  disabled={checkstatus()} onClick={()=>GenerateCourseLayout()}>Generate Course Layout</Button>}
      </div>
      </div>
      <LoadingDialog loading={loading}/>
    </div>
  )
}

export default CreateCourse