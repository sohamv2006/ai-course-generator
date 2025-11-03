import React from 'react'
import Image from 'next/image';
import { HiOutlinePuzzle } from "react-icons/hi";
import { Button } from '@/components/ui/button';
import EditCourseBasicInfo from './EditCourseBasicInfo';
import Link from 'next/link';

function CourseBasicInfo({course, refreshData, edit=true}) {
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 className='font-bold text-3xl'>{course?.courseOutput?.courseName} {edit&& <EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)}/>}</h2>
                <p className='text-wm text-gray-400 mt-3 mr-5'>{course?.courseOutput?.description}</p>
                <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><HiOutlinePuzzle />{course?.category}</h2>
                {!edit && <Link href={'/Course/'+course?.courseId+"/start"}><Button className='w-full mt-5'>Start</Button></Link>}
            </div>
            <div>
                <Image src={'/placeholder.png'} alt={'placeholderImage'}width={300} height={300} className='w-full rounded-xl h-[250px] object-cover'/>
            </div>
        </div>
        
    </div>
  )
}

export default CourseBasicInfo