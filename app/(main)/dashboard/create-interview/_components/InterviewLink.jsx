import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Copy } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function InterviewLink({ interviewId, formData }) {
    const GetInterviewUrl=()=>{
        const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interviewId
        return url;
    }
  return (
    <div className='flex flex-col items-center justify-center mt-6'>
      <Image src="/check1.webp" alt="check" width={200} height={200} className='w-[100px] h-[80px]' />
        <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
        <p>Share this link with your candidate to start the interview process </p>
        <div className=' bg-white w-full rounded-xl p-6 mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='p-1 px-2 font-bold '>Interview Link</h2>
                <h2 className='p-1 px-2 bg-purple-100 text-primary rounded-xl'>Valid for 30 Days</h2>
            </div>
            <div className='mt-4 flex items-center gap-4'>
                <Input defaultValue={GetInterviewUrl()} disabled={true}/>
                <Button><Copy/>Copy Link</Button>
            </div>
            <hr className='my-6'/>
            <div>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4'/>30{formData?.duration}</h2>
            </div>
        </div>
    </div>
  );
}

export default InterviewLink;
