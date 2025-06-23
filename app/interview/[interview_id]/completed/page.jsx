'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewCompleted() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-white text-center">
      {/* Success Check Icon */}
      <div className="mb-4">
        <Image src="/check1.webp" width={80} height={80} alt="Success" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2 text-black">
        Interview Complete!
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 mb-6">
        Thank you for participating in the AI-driven interview with Alcruiter
      </p>

      {/* Illustration */}
      <div className="mb-6">
        <Image
          src="/illustration.avif"
          width={600}
          height={300}
          alt="Interview illustration"
          className="rounded-xl shadow-md"
        />
      </div>

      {/* Action Button */}
      <button
        onClick={handleClick}
        className="bg-purple-500 hover:bg-blue-600 text-white px-5 py-3 rounded-full shadow-md flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10l9-6 9 6M4.5 10.5v6.75a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V10.5"
          />
        </svg>
        Go to Dashboard
      </button>
    </div>
  )
}

export default InterviewCompleted
