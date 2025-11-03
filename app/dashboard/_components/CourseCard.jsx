import React, { useState } from 'react'
import Image from 'next/image';
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { HiOutlineTrash } from "react-icons/hi2";
import { CourseList } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import Link from 'next/link';


function CourseCard({course, refreshData, displayUser=false}) {

  const [ openAlert, setOpenAlert]=useState(false);

  const handleOnDelete=async()=>{
    const resp = await db.delete(CourseList).where(eq(CourseList.courseId, course.courseId)).returning({id:CourseList.courseId});

    if (resp){
      refreshData()
    }
  }

  return (
    <div className='shadow-sm rounded-lg border p-2 hover:scale-105 hover:border-primary transition-all cursor-pointer mt-4' >
      <Link href={'/Course/'+course?.courseId}>
        <Image src={'/placeholder.png'} alt={'placeholderImage'} width={300} height={200}
      className='w-full h-[200px]object-cover rounded-lg'
      />
      </Link>
    
    <div className='p-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>{course?.courseOutput?.courseName} 
        
        {!displayUser&& <DropdownMenu>
          <DropdownMenuTrigger><HiMiniEllipsisVertical/></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={()=>setOpenAlert(true)}>
              <div className='flex items-center gap-1'>
                <HiOutlineTrash />Delete
              </div>
            </DropdownMenuItem> 
          </DropdownMenuContent>
        </DropdownMenu>}
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=>{handleOnDelete(),setOpenAlert(false)}}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </h2>
        <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
        <div className='flex justify-between items-center mt-3'>
            <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm'><HiOutlineBookOpen/>{course?.courseOutput?.numberOfChapters} Chapters</h2>
            <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm'>{course?.level}</h2>
        </div>
        {displayUser&& <div className='flex gap-2 items-center mt-2'>
          <Image src={course?.userProfileImage} alt={'userImage'}width={35} height={35} className='rounded-full'/>
          <h2 className='text-sm'>{course?.userName}</h2>
        </div>}
    </div>
    </div>
  )
}

export default CourseCard