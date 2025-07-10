import React from 'react'
import Welcome from './_components/Welcome'
import CreateOptions from './_components/CreateOptions'
import { Lateef } from 'next/font/google'
import LatestInterviewsList from './_components/LatestInterviewsList'
import { Activity, Calendar, Users, TrendingUp } from 'lucide-react'

function Dashboard() {
  return (
    <div className='space-y-8'>
      {/* Enhanced Dashboard Header */}
      <div className='bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20'></div>
          <div className='absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16'></div>
          <div className='absolute top-1/2 right-1/4 w-24 h-24 bg-white rounded-full'></div>
        </div>
        
        {/* Main Content */}
        <div className='relative z-10'>
          <div className='flex items-center justify-between'>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                {/* <div className='p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm'>
                  <Activity className='h-6 w-6 text-black' />
                </div> */}
                <div>
                  <h1 className='text-3xl font-bold'>Dashboard</h1>
                  <p className='text-purple-100 text-sm'>Monitor and manage your interviews</p>
                </div>
              </div>
              
              <div className='flex items-center space-x-6 text-sm'>
                <div className='flex items-center space-x-2'>
                  <Calendar className='h-4 w-4 text-purple-200' />
                  <span className='text-purple-100'>Today, July 11</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Users className='h-4 w-4 text-purple-200' />
                  <span className='text-purple-100'>3 Active Interviews</span>
                </div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className='hidden md:flex space-x-4'>
              <div className='bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 min-w-[120px]'>
                <div className='flex items-center space-x-2'>
                  <TrendingUp className='h-5 w-5 text-green-300' />
                  <div>
                    <p className='text-2xl font-bold text-black'>12</p>
                    <p className='text-xs text-purple-400'>This Week</p>
                  </div>
                </div>
              </div>
              
              <div className='bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 min-w-[120px]'>
                <div className='flex items-center space-x-2'>
                  <Users className='h-5 w-5 text-blue-300' />
                  <div>
                    <p className='text-2xl font-bold text-black'>84</p>
                    <p className='text-xs text-purple-400'>Total Candidates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold text-gray-800'>Quick Actions</h2>
          <p className='text-gray-500 text-sm'>Start creating interviews or manage existing ones</p>
        </div>
        <div className='flex items-center space-x-3'>
          <button className='px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium'>
            View All
          </button>
          <button className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium'>
            + New Interview
          </button>
        </div>
      </div> */}

      <CreateOptions/>
      <LatestInterviewsList/>
    </div>
  )
}

export default Dashboard