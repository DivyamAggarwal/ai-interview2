"use client";
import { Button } from "@/components/ui/button";
import { Plus, Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import InterviewCard from "../dashboard/_components/InterviewCard";
function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false })

    if (error) {
      console.error("Error fetching interviews:", error);
    } else {
      console.log("Interviews:", Interviews);
      setInterviewList(Interviews);
    }
  };
  

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl">All Previously Created Interview</h2>

      {interviewList?.length === 0 && (
        <div className="p-4 flex flex-col gap-4 items-center mt-5 bg-white">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created</h2>
          <Link href={'/dashboard/create-interview'} className='p-5 cursor-pointer'>
            <Button><Plus />Create New Interview</Button>
          </Link>
        </div>
      )}

      {interviewList &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {interviewList.map((interview,index) => (
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>}
    </div>
  );
}

export default AllInterview
