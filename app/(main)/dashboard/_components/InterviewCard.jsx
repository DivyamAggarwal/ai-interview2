import React from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import { toast } from "sonner";
function InterviewCard({interview}) {
    const copyLink=()=>{
        const url=process.env.NEXT_PUBLIC_HOST_URL+'/interview/'+interview?.interview_id;
        navigator.clipboard.writeText(url);
        toast("Link copied to clipboard!");
    }
    const onSend=()=>{
        window.location.href="mailto:divyam7@gmail.com?subject=Interview Link&body=Hi, I would like to share the interview link with you: "+process.env.NEXT_PUBLIC_HOST_URL+'/interview/'+interview?.interview_id;
    }
  return (
    <div className='p-5 bg-white rounded-lg shadow hover:shadow-lg transition-shadow'>
      <div className='flex items-center justify-between '>
        <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
        <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
      </div>
      <div className='mt-3'>
        <h3 className="font-semibold text-lg">{interview.jobPosition}</h3>
        <p className="mt-2 text-sm text-gray-500">{interview.jobDescription}</p>
      </div>
      <div className='mt-5 flex gap-4 w-full'>
        <Button variant={'outline'} onClick={copyLink}><Copy/>Copy Link</Button>
        <Button onClick={onSend}><Send/>Send</Button>
      </div>
    </div>
  )
}

export default InterviewCard
