import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, Clock, Copy, List, Mail, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

function InterviewLink({ interview_id, formData }) {
    const url=process.env.NEXT_PUBLIC_HOST_URL+'/interview/'+interview_id
    const GetInterviewUrl=()=>{
        return url;
    }
    const onCopyLink=async()=>{
        await navigator.clipboard.writeText(url);
        toast('Link Copied');
    }
  return (
    <div className='flex flex-col items-center justify-center mt-6'>
      <Image src="/check1.webp" alt="check" width={200} height={200} className='w-[100px] h-[80px]' />
        <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
        <p>Share this link with your candidate to start the interview process </p>
        <div className=' bg-white w-full rounded-lg p-6 mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='p-1 px-2 font-bold '>Interview Link</h2>
                <h2 className='p-1 px-2 bg-purple-100 text-primary rounded-xl'>Valid for 30 Days</h2>
            </div>
            <div className='mt-4 flex items-center gap-4'>
                <Input defaultValue={GetInterviewUrl()} disabled={true}/>
                <Button onClick={()=>onCopyLink()}><Copy/>Copy Link</Button>
            </div>
            <hr className='my-6'/>
            <div className='flex gap-6'>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4'/>{formData?.duration}</h2>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='h-4 w-4'/>10 Questions</h2>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Calendar className='h-4 w-4'/>{formData?.duration}</h2>
            </div>
        </div>
        <div className=' bg-white w-full rounded-lg p-6 mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='p-1 px-2 font-bold '>Share Via</h2>
            </div>
            <div className='mt-4 flex items-center gap-4'>
                <Button variant={'outline'}><Mail/>Email</Button>
                <Button variant={'outline'}><Mail/>Slack</Button>
                <Button variant={'outline'}><Mail/>Whatsapp</Button>
            </div>
        </div>
        <div className='flex gap-6 mt-6 justify-between w-full'>
            <Link href={'/dashboard'}>    
                <Button variant={'outline'}><ArrowLeft/>Back To Dashboard</Button>
            </Link>
            <Link href={'./create-interview'}>
                <Button><Plus/>Create New Interview</Button>
            </Link>
        </div>
    </div>
  );
}

export default InterviewLink;
