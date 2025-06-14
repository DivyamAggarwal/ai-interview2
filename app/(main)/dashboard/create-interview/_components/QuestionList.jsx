import React, { useEffect } from 'react'

function QuestionList({formData}) {
  useEffect(()=>{
    if(formData){
      GenerateQuestionList();
    }
  },[formData])
  const GenerateQuestionList=()=>{

  }
  return (
    <div>
      Qvenv
    </div>
  )
}

export default QuestionList
