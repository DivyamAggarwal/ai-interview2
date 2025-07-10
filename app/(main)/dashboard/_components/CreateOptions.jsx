import { Video, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {/* Create New Interview Card */}
      <Link 
        href={'./dashboard/create-interview'} 
        className='group bg-gradient-to-br from-white to-purple-50 border border-purple-200 rounded-xl p-6 cursor-pointer shadow-md hover:shadow-xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-purple-50 hover:to-white'
      >
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300 shadow-lg'>
              <Video className='h-6 w-6 text-white' />
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-70 group-hover:opacity-100'></div>
              <span className='text-xs text-green-600 font-medium opacity-70 group-hover:opacity-100'>Active</span>
            </div>
          </div>
          
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <h2 className='font-bold text-lg text-gray-800 group-hover:text-purple-700 transition-colors duration-300'>
                Create New Interview
              </h2>
              <div className='px-3 py-1 bg-purple-100 rounded-full'>
                <span className='text-xs text-purple-600 font-semibold'>Popular</span>
              </div>
            </div>
            <p className='text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
              Create AI Interview and schedule them with candidates
            </p>
          </div>
          
          <div className='flex items-center justify-between pt-2 border-t border-purple-100'>
            <div className='flex items-center space-x-2'>
              <div className='flex -space-x-2'>
                <div className='w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full border-2 border-white'></div>
                <div className='w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-white'></div>
                <div className='w-6 h-6 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full border-2 border-white'></div>
              </div>
              <span className='text-xs text-gray-500'>1.2k+ interviews</span>
            </div>
            <div className='flex items-center space-x-2 opacity-70 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0'>
              <span className='text-xs text-purple-600 font-medium'>Get Started</span>
              <svg className='w-4 h-4 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </div>
          </div>
        </div>
      </Link>

      {/* Create Phone Screen Call Card */}
      <div className='group bg-gradient-to-br from-white to-gray-50 border border-gray-300 rounded-xl p-6 cursor-pointer shadow-md hover:shadow-xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-purple-50 hover:to-white relative overflow-hidden'>
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='p-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-300 shadow-lg'>
              <Phone className='h-6 w-6 text-white' />
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-70 group-hover:opacity-100'></div>
              <span className='text-xs text-orange-600 font-medium opacity-70 group-hover:opacity-100'>Coming Soon</span>
            </div>
          </div>
          
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <h2 className='font-bold text-lg text-gray-800 group-hover:text-purple-700 transition-colors duration-300'>
                Create Phone Screen Call
              </h2>
              <div className='px-3 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full'>
                <span className='text-xs text-orange-600 font-semibold'>Beta</span>
              </div>
            </div>
            <p className='text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
              Schedule phone screening calls with potential candidates
            </p>
          </div>
          
          <div className='flex items-center justify-between pt-2 border-t border-gray-200'>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center space-x-1'>
                <div className='w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full opacity-50'></div>
                <div className='w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full opacity-30'></div>
                <div className='w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full opacity-20'></div>
              </div>
              <span className='text-xs text-gray-500'>In development</span>
            </div>
            <div className='px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300'>
              <span className='text-xs text-purple-600 font-medium'>Notify Me</span>
            </div>
          </div>
        </div>
        
        {/* Coming Soon Overlay */}
        <div className='absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <div className='text-center p-4'>
            <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2'>
              <Phone className='h-6 w-6 text-purple-600' />
            </div>
            <p className='text-sm font-medium text-gray-700'>Feature Coming Soon</p>
            <p className='text-xs text-gray-500 mt-1'>We're working on this feature</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateOptions