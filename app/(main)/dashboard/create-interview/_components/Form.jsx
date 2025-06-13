import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
function Form({onHandleInputChange}) {
  const [interviewType,setInterviewType]=useState([]);
  useEffect(()=>{
    if(interviewType){
      onHandleInputChange('type',interviewType)
    }
  },[interviewType])
  const AddInterviewType=(typeName)=>{
    const data=interviewType.includes(typeName);
    if(!data){
      setInterviewType(prev=>[...prev,typeName])
    }else{
      const result=interviewType.filter((item)=>item!==typeName);
      setInterviewType(result);
    }
  }
  return (
    <div className='p-5 bg-white rounded-xl'>
      <div>
        <h2 className='text-sm font-medium'>Job Position</h2>
        <Input placeholder="e.g Data Analyst" className='mt-3' onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)}/>
      </div>
      <div className='mt-6'>
        <h2 className='text-sm font-medium'>Job Description</h2>
        <Textarea placeholder='Enter the detailed job description' className='mt-3 h-[160px]' onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}/>
      </div>
      <div className='mt-6'>
        <h2 className='text-sm font-medium'>Interview Duration</h2>
        <Select onValueChange={(value)=>onHandleInputChange('duration',value)}>
          <SelectTrigger className="w-full mt-3">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 min</SelectItem>
            <SelectItem value="15">15 min</SelectItem>
            <SelectItem value="30">30 min</SelectItem>
            <SelectItem value="45">45 min</SelectItem>
            <SelectItem value="60">60 min</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='mt-6'>
        <h2 className='text-sm font-medium'>Interview Type</h2>
        <div className='flex flex-wrap gap-3 mt-3'>
          {InterviewType.map((type,index)=>(
            <div key={index} className={`flex gap-2 p-2 items-center cursor-pointer
               bg-white border border-gray-400 rounded-2xl hover:bg-secondary 
            ${interviewType.includes(type.name) && 'bg-purple-100 text-primary'}`} onClick={()=>AddInterviewType(type.name)}>
              <type.icon className='h-4 w-4'/>
              <span>
                {type.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-8 flex justify-end'>
        <Button>Generate Question <ArrowRight/></Button>
      </div>
    </div>
  )
}

export default Form
