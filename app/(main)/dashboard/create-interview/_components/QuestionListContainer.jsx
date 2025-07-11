import React from 'react'
import { MessageSquare, Hash, Clock, CheckCircle } from 'lucide-react'

function QuestionListContainer({ questionList }) {
  const getTypeColor = (type) => {
    const colors = {
      'Technical': 'bg-blue-100 text-blue-700 border-blue-200',
      'Behavioral': 'bg-green-100 text-green-700 border-green-200',
      'Situational': 'bg-purple-100 text-purple-700 border-purple-200',
      'Experience': 'bg-orange-100 text-orange-700 border-orange-200',
      'General': 'bg-gray-100 text-gray-700 border-gray-200',
      'Problem Solving': 'bg-red-100 text-red-700 border-red-200',
      'Leadership': 'bg-indigo-100 text-indigo-700 border-indigo-200'
    }
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const getTypeIcon = (type) => {
    const icons = {
      'Technical': '⚡',
      'Behavioral': '🧠',
      'Situational': '🎯',
      'Experience': '💼',
      'General': '💬',
      'Problem Solving': '🔧',
      'Leadership': '👑'
    }
    return icons[type] || '❓'
  }

  return (
    <div className='max-w-4xl mx-auto'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='p-2 bg-blue-100 rounded-lg'>
            <MessageSquare className='h-6 w-6 text-blue-600' />
          </div>
          <h2 className='font-bold text-2xl text-gray-900'>Generated Interview Questions</h2>
        </div>
        <div className='flex items-center gap-4 text-sm text-gray-600'>
          <div className='flex items-center gap-1'>
            <Hash className='h-4 w-4' />
            <span>{questionList.length} questions generated</span>
          </div>
          <div className='flex items-center gap-1'>
            <CheckCircle className='h-4 w-4 text-green-600' />
            <span>Ready for interview</span>
          </div>
        </div>
      </div>

      {/* Questions Container */}
      <div className='bg-gradient-to-br from-gray-50 to-white p-6 border border-gray-200 rounded-2xl shadow-lg'>
        {questionList.length === 0 ? (
          <div className='text-center py-12'>
            <MessageSquare className='h-16 w-16 text-gray-300 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-500 mb-2'>No questions generated yet</h3>
            <p className='text-gray-400'>Complete the form to generate interview questions</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {questionList.map((item, index) => (
              <div 
                key={index} 
                className='group p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300'
              >
                {/* Question Header */}
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-bold text-sm'>
                      {index + 1}
                    </div>
                    <div className='text-xs text-gray-500 font-medium'>
                      QUESTION {index + 1}
                    </div>
                  </div>
                  
                  {/* Type Badge */}
                  {item?.type && (
                    <div className={`
                      inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border
                      ${getTypeColor(item.type)}
                    `}>
                      <span>{getTypeIcon(item.type)}</span>
                      <span>{item.type}</span>
                    </div>
                  )}
                </div>

                {/* Question Content */}
                <div className='pl-11'>
                  <h3 className='font-semibold text-gray-900 text-lg leading-relaxed mb-3'>
                    {item.question}
                  </h3>
                  
                  {/* Question Meta Info */}
                  <div className='flex items-center gap-4 text-xs text-gray-500'>
                    <div className='flex items-center gap-1'>
                      <Clock className='h-3 w-3' />
                      <span>Est. 2-3 min response</span>
                    </div>
                    <div className='w-1 h-1 bg-gray-300 rounded-full'></div>
                    <span>Question #{index + 1} of {questionList.length}</span>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className='absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                  <div className='w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full'></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Summary */}
      {questionList.length > 0 && (
        <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 text-blue-700'>
              <CheckCircle className='h-5 w-5' />
              <span className='font-medium'>Questions ready for interview</span>
            </div>
            <div className='text-sm text-blue-600'>
              Total estimated time: {questionList.length * 3} minutes
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionListContainer
