"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation'
function Interview() {
  const {interview_id}=useParams();
  console.log(interview_id)
  const [interviewData,setInterviewData]=useState();
  const [userName,setUserName]=useState();
  const [userEmail,setUserEmail]=useState();
  const [loading,setLoading]=useState(false);
  const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);
  const router=useRouter();
  useEffect(()=>{
    interview_id && GetInterviewDetails();
  },[interview_id])
  const GetInterviewDetails=async()=>{
    setLoading(true);
    try{
      let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select("jobPosition,jobDescription,duration,type")
      .eq('interview_id',interview_id);
      setInterviewData(Interviews[0]);
      setLoading(false);
      if(Interviews?.length==0){
        toast('Incorrect Interview Link')
        return;
      }
    }catch(e){
      setLoading(false);
      toast('Incorrect Interview Link')
    }
  }
  const onJoinInterview=async()=>{
      setLoading(true);
      let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select("*")
      .eq('interview_id',interview_id);
      console.log(Interviews[0]);
      setInterviewInfo({
        userName:userName,
        userEmail:userEmail,
        interviewData:Interviews[0]
      });
      router.push('/interview/'+interview_id+'/start')
      setLoading(false);
  }
  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-6 '>
        <div className='flex flex-col items-center border rounded-lg bg-white p-6 lg:px-33 xl:px-52 mb-8'>
         <Image src="/logo.jpeg" width={200} height={100} alt="Logo" className='w-[110px] h-[90px] rounded-2xl mt-6' />
         <h2 className='mt-4 text-lg font-bold'>AI-Powered Interview Platform</h2>
        <Image src={'/interview.png'} width={200} height={200} alt="interview" className='w-[340px] h-[280px] my-4'/>
        <h2 className='font-bold text-xl '>{interviewData?.jobPosition}</h2>
        <h2 className='flex gap-2 items-center text-gray-500  mt-3'><Clock className='h-4 w-4'/>{interviewData?.duration} min</h2> 
        <div className='w-full mt-4'>
          <h2 className=' mt-3 mb-2 font-bold'>Enter your full name:</h2>
          <Input placeholder='e.g.Rahul Aggarwal' onChange={(event)=>setUserName(event.target.value)}/>
        </div>
        <div className='w-full mt-4'>
          <h2 className=' mt-3 mb-2 font-bold'>Enter your Email:</h2>
          <Input placeholder='e.g.rahul@gmail.com' onChange={(event)=>setUserEmail(event.target.value)}/>
        </div> 
        <div className='p-3 bg-purple-100 flex gap-4 rounded-lg mt-4'>
          <Info className='text-primary'/>
          <div>
            <h2 className='font-bold'>Before you begin</h2>
            <ul>
              <li className='text-sm text-primary'>-Test your camera and microphone</li>
              <li className='text-sm text-primary'>-Ensure you have a stable a internet connection</li>
              <li className='text-sm text-primary'>-Find a quite place for interview</li>
            </ul>
          </div>
        </div>
        <Button className={'mt-6 w-full font-bold'} disabled={loading || !userName} onClick={()=>onJoinInterview()}><Video/>{loading&&<Loader2Icon/>}Join Interview</Button>
      </div> 
    </div>
  )
//   return (
//   <div className="flex justify-center mt-8">
//     <div className="flex flex-col items-center justify-center border rounded-lg bg-white px-5 py-6 w-full max-w-2xl shadow">
//       <Image src="/logo.jpeg" width={200} height={200} alt="Logo" className="w-[110px] h-[90px] rounded-2xl mt-6" />
//       <h2 className="mt-4 text-lg font-bold text-center">AI-Powered Interview Platform</h2>
//       <Image src="/interview.png" width={200} height={200} alt="interview" className="w-[340px] h-[300px] my-4" />
//       <h2 className="font-bold text-xl text-center">Full Stack Developer</h2>
//       <h2 className="flex gap-2 text-gray-500 items-center mt-3"><Clock className="h-4 w-4" />30 Min</h2>

//       <div className="w-full mt-4">
//         <h2 className="mb-1">Enter your full name</h2>
//         <Input placeholder="e.g. Rahul Aggarwal" />
//       </div>
//     </div>
//   </div>
// );


}

export default Interview
