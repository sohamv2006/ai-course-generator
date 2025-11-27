import React, { useContext } from 'react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserInputContext } from '@/app/_context/UserInputContext';

function SelectOption() {
    const {userCourseInput,setUserCourseInput}=useContext(UserInputContext);
    const handleTopicChange=(fieldName,value)=>{
        setUserCourseInput(prev=>({
            ...prev,
             [fieldName]:value
      }))
    }
  return (
    <div className='px-10 md:px-20 lg:px-44 text-rounded-md'>
        <div className='grid grid-cols-2 gap-10'>
            <div>
                <label htmlFor="level-select" className='text-sm'>Difficulty Level</label>
                <Select onValueChange={(value)=>handleTopicChange('level',value)}
                    defaultValue={userCourseInput?.level}>
                    <SelectTrigger id="level-select" className="w-full rounded-full">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermidiate">Intermidiate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label htmlFor="duration-select" className='text-sm'>Course Duration</label>
                <Select onValueChange={(value)=>handleTopicChange('duration',value)}
                    defaultValue={userCourseInput?.duration}>
                    <SelectTrigger id="duration-select" className="w-full rounded-full">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1 hour">1 hour</SelectItem>
                        <SelectItem value="2 hour">2 hour</SelectItem>
                        <SelectItem value="More than 3 hour">More than 3 hour</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label htmlFor="displayvideo-select" className='text-sm'>Add video</label>
                <Select onValueChange={(value)=>handleTopicChange('displayvideo',value)}
                    defaultValue={userCourseInput?.displayvideo}>
                    <SelectTrigger id="displayvideo-select" className="w-full rounded-full">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1 hour">Yes</SelectItem>
                        <SelectItem value="2 hour">No</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label htmlFor="noOfChapters-input" className='text-sm'>No of Chapters</label>
                <Input
                  id="noOfChapters-input"
                  type="number"
                  className="h-14 text-lg rounded-full"
                  onChange={(event)=>handleTopicChange('noOfChapters',event.target.value)}
                  defaultValue={userCourseInput?.noOfChapters}
                />
            </div>
        </div>
    </div>
  )
}

export default SelectOption