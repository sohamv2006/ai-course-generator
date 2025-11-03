import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { CourseList } from '@/configs/schema';

function EditChapters({ course,index, refreshData }) {
  const Chapters = course?.courseOutput?.chapters || [];
  const [chapterName, setName] = useState("");
  const [about, setAbout] = useState("");

  // ✅ Safe data loading
  useEffect(() => {
      setName(Chapters[index]?.chapterName);
      setAbout(Chapters[index]?.about);
    
  }, [course])

  const onUpdateHandler = async() => {

    Chapters[index].chapterName = chapterName;
    Chapters[index].about = about;
    const result=await db.update(CourseList).set({
    courseOutput:course?.courseOutput
    }).where(eq(CourseList?.id,course?.id))
    .returning({id:CourseList.id}); 

    refreshData(true);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription asChild>
             <div>
                <div className="mt-3">
                  <label>Course Title</label>
                <Input
                  value={chapterName}
                  onChange={(event) => setName(event?.target.value)}
                  placeholder="Enter chapter name"
                />
              </div>

              <div className="mt-3">
                <label>Course Description</label>
                <Textarea
                  className="h-40"
                  value={about}
                  onChange={(event) => setAbout(event?.target.value)}
                  placeholder="Enter about"
                />
              </div>
            </div>
          </DialogDescription>

        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
