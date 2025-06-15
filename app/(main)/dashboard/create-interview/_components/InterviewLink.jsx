import Image from 'next/image';
import React from 'react';

function InterviewLink({ interview_id, formData }) {
  return (
    <div className='flex items-center justify-center mt-6'>
      <Image src="/check1.webp" alt="check" width={200} height={200} className='w-[100px] h-[80px]' />

    </div>
  );
}

export default InterviewLink;
