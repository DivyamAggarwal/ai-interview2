import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
      <Image src="/logo.jpeg" width={200} height={100} alt="Logo" className='w-[100px] h-[80px] rounded-2xl mt-3' />
    </div>
  )
}

export default InterviewHeader
