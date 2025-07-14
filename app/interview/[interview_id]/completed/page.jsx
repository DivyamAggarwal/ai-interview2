'use client'
import Image from 'next/image'
import { useRouter,useParams } from 'next/navigation'
import React from 'react'

function InterviewCompleted() {
  const router = useRouter()
  const params = useParams()
  const interviewId = params?.interview_id
  const handleClick = () => {
    router.push('/dashboard')
  }
  const handleFeedbackClick = () => {
    if (interviewId) {
      router.push(`/interview/${interviewId}/feedback`)
    }
  }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-white text-center">
//       {/* Success Check Icon */}
//       <div className="mb-4">
//         <Image src="/check1.webp" width={80} height={80} alt="Success" />
//       </div>

//       {/* Heading */}
//       <h1 className="text-3xl font-bold mb-2 text-black">
//         Interview Complete!
//       </h1>

//       {/* Subtext */}
//       <p className="text-gray-600 mb-6">
//         Thank you for participating in the AI-driven interview with Alcruiter
//       </p>

//       {/* Illustration */}
//       <div className="mb-6">
//         <Image
//           src="/illustration.avif"
//           width={600}
//           height={300}
//           alt="Interview illustration"
//           className="rounded-xl shadow-md"
//         />
//       </div>

//       {/* Action Button */}
//       <button
//         onClick={handleClick}
//         className="bg-purple-500 hover:bg-blue-600 text-white px-5 py-3 rounded-full shadow-md flex items-center gap-2"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-5 h-5"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3 10l9-6 9 6M4.5 10.5v6.75a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V10.5"
//           />
//         </svg>
//         Go to Dashboard
//       </button>
//     </div>
//   )
// }

// export default InterviewCompleted
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

      {/* Action Buttons */}
      <div className="flex gap-4 items-center">
        {/* View Report Button */}
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

        {/* View Feedback Button */}
        <button
          onClick={handleFeedbackClick}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-md flex items-center gap-2"
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
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          View Feedback
        </button>
      </div>
    </div>
  )
}

export default InterviewCompleted