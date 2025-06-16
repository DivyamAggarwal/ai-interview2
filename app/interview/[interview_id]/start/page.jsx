"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext } from 'react'

function StartInterview() {
    const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);
  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>AI Interview Session
        <span className='flex gap-2 items-center'>
            <Timer/>
            00:00:00
        </span> 
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-6'>
            <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                <Image src={'/ai.png'} width={100} height={100} alt='photo1' className='w-[60px] h-[60px] rounded-full object-cover'/>
                <h2>AI Recruiter</h2>
            </div>
            <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                {/* <Image src={'/ai2.png'} width={100} height={100} alt='photo2' className='w-[60px] h-[60px] rounded-full object-cover'/> */}
                <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
                <h2>{interviewInfo?.userName}</h2>
            </div>
        </div>
        <div className='flex justify-center mt-6 items-center gap-6'>
            <Mic className='h-12 w-12 p-3 bg-gray-500 rounded-full text-white cursor-pointer'/>
            <Phone className='h-12 w-12 bg-red-500 p-3 rounded-full text-white cursor-pointer'/>
        </div>
        <h2 className='text-sm text-gray-400 text-center mt-4'>Interview in Progress</h2>
    </div>
  )
}

export default StartInterview
