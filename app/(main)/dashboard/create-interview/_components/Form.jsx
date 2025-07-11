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
import { ArrowRight, Clock, Briefcase, FileText, Users } from 'lucide-react'

function Form({ onHandleInputChange, GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);
  const [formData, setFormData] = useState({
    jobPosition: '',
    jobDescription: '',
    duration: ''
  });

  useEffect(() => {
    if (interviewType.length > 0) {
      onHandleInputChange('type', interviewType)
    }
  }, [interviewType])

  const AddInterviewType = (typeName) => {
    const data = interviewType.includes(typeName);
    if (!data) {
      setInterviewType(prev => [...prev, typeName])
    } else {
      const result = interviewType.filter((item) => item !== typeName);
      setInterviewType(result);
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    onHandleInputChange(field, value);
  }

  const isFormValid = () => {
    return formData.jobPosition.trim() && 
           formData.jobDescription.trim() && 
           formData.duration && 
           interviewType.length > 0;
  }

  return (
    <div className='max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100'>
      {/* Header */}
      <div className='mb-8 text-center'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Interview Setup</h1>
        <p className='text-gray-600'>Configure your interview parameters to generate tailored questions</p>
      </div>

      {/* Job Position */}
      <div className='mb-8'>
        <div className='flex items-center gap-2 mb-3'>
          <Briefcase className='h-5 w-5 text-blue-600' />
          <h2 className='text-base font-semibold text-gray-900'>Job Position</h2>
          <span className='text-red-500'>*</span>
        </div>
        <Input 
          placeholder="e.g. Senior Data Analyst, Frontend Developer" 
          className='h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors' 
          onChange={(event) => handleInputChange('jobPosition', event.target.value)}
        />
      </div>

      {/* Job Description */}
      <div className='mb-8'>
        <div className='flex items-center gap-2 mb-3'>
          <FileText className='h-5 w-5 text-green-600' />
          <h2 className='text-base font-semibold text-gray-900'>Job Description</h2>
          <span className='text-red-500'>*</span>
        </div>
        <Textarea 
          placeholder='Provide a detailed job description including key responsibilities, required skills, and qualifications...' 
          className='min-h-[140px] border-gray-300 focus:border-green-500 focus:ring-green-500 transition-colors resize-none' 
          onChange={(event) => handleInputChange('jobDescription', event.target.value)}
        />
      </div>

      {/* Interview Duration */}
      <div className='mb-8'>
        <div className='flex items-center gap-2 mb-3'>
          <Clock className='h-5 w-5 text-purple-600' />
          <h2 className='text-base font-semibold text-gray-900'>Interview Duration</h2>
          <span className='text-red-500'>*</span>
        </div>
        <Select onValueChange={(value) => handleInputChange('duration', value)}>
          <SelectTrigger className="w-full h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
            <SelectValue placeholder="Choose interview duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5" className="py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>5 minutes - Quick screening</span>
              </div>
            </SelectItem>
            <SelectItem value="15" className="py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>15 minutes - Brief interview</span>
              </div>
            </SelectItem>
            <SelectItem value="30" className="py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>30 minutes - Standard interview</span>
              </div>
            </SelectItem>
            <SelectItem value="45" className="py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>45 minutes - Detailed interview</span>
              </div>
            </SelectItem>
            <SelectItem value="60" className="py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>60 minutes - Comprehensive interview</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className='mb-10'>
        <div className='flex items-center gap-2 mb-4'>
          <Users className='h-5 w-5 text-orange-600' />
          <h2 className='text-base font-semibold text-gray-900'>Interview Type</h2>
          <span className='text-red-500'>*</span>
        </div>
        <p className='text-sm text-gray-600 mb-4'>Select one or more interview types that match your requirements</p>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
          {InterviewType.map((type, index) => (
            <div 
              key={index} 
              className={`
                flex items-center gap-3 p-4 cursor-pointer rounded-xl border-2 transition-all duration-200
                hover:shadow-md hover:scale-105 active:scale-95
                ${interviewType.includes(type.name) 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-400 text-blue-700 shadow-md' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700'
                }
              `} 
              onClick={() => AddInterviewType(type.name)}
            >
              <type.icon className={`h-5 w-5 ${interviewType.includes(type.name) ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className='font-medium text-sm'>{type.name}</span>
              {interviewType.includes(type.name) && (
                <div className='ml-auto w-2 h-2 bg-blue-600 rounded-full'></div>
              )}
            </div>
          ))}
        </div>
        {interviewType.length > 0 && (
          <div className='mt-3 text-sm text-blue-600'>
            {interviewType.length} type{interviewType.length > 1 ? 's' : ''} selected
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className='flex justify-center'>
        <Button 
          onClick={GoToNext}
          disabled={!isFormValid()}
          className={`
            px-8 py-3 h-auto text-base font-semibold rounded-xl transition-all duration-200
            ${isFormValid() 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105' 
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
        >
          <span>Generate Questions</span>
          <ArrowRight className='ml-2 h-5 w-5' />
        </Button>
      </div>

      {/* Form Validation Hint */}
      {!isFormValid() && (
        <div className='mt-4 text-center text-sm text-gray-500'>
          Please fill in all required fields to continue
        </div>
      )}
    </div>
  )
}

export default Form
