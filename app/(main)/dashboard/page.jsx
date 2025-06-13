import React from 'react'
import Welcome from './_components/Welcome'
import CreateOptions from './_components/CreateOptions'
import { Lateef } from 'next/font/google'
import LatestInterviewsList from './_components/LatestInterviewsList'

function Dashboard() {
  return (
    <div>
      {/* <Welcome/> */}
      <h2 className='my-3 font-bold text-2xl'>DashBoard</h2>
      <CreateOptions/>
      <LatestInterviewsList/>
    </div>
  )
}

export default Dashboard
