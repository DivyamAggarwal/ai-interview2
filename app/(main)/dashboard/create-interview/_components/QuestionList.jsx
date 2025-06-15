import { Loader2, Loader2Icon } from 'lucide-react';
import Loadable from 'next/dist/shared/lib/loadable.shared-runtime';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({formData}) {
  const [loading,setLoading]=useState(true);
  const [questionList,setQuestionList]=useState();
  const {user}=useUser();
  const [saveLoading,setsaveLoading]=useState(false);
  useEffect(()=>{
    if(formData){
      GenerateQuestionList();
    }
  },[formData])
  
  // const GenerateQuestionList=async()=>{
  //   setLoading(true);
  //   try{
  //         const result=await axios.post('/api/ai-model',{
  //          ...formData
  //         })
  //         console.log(result.data.content);
  //         const Content=result.data.content;
  //         const FINAL_CONTENT=Content.replace('"```json','').replace('```','')
  //         setQuestionList(JSON.parse(FINAL_CONTENT?.interviewQuestions));
  //         setLoading(false);
  //   }
  //   catch(e){
  //     toast('Server Error, Pls Try Again!')
  //     setLoading(false);
  //   }
  // }
const GenerateQuestionList = async () => {
  setLoading(true);
  try {
    const result = await axios.post('/api/ai-model', {
      ...formData
    });

    let content = result.data.content;

    // Remove markdown wrappers if they exist
    const cleaned = content
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    // Parse the whole content once
    const parsed = JSON.parse(cleaned);

    // Now extract the questions
    setQuestionList(parsed.interviewQuestions);
    setLoading(false);
  } catch (e) {
    console.error("❌ Error:", e.message);
    toast('Server Error, Please Try Again!');
    setLoading(false);
  }
};
const onFinish=async()=>{
  setsaveLoading(true);
  const interview_id=uuidv4();
  const { data, error } = await supabase
  .from('Interviews')
  .insert([
    {
      ...formData,
      questionList:questionList,
      userEmail:user?.email,
      interview_id:interview_id
    },
  ])
  .select()
  setsaveLoading(false);
  
}

    
  // return (
  //   <div>
  //     {loading && 
  //     <div className='p-5 bg-purple-100 rounded-xl border border-primary flex gap-5 items-center'>
  //       <Loader2Icon className='animate-spin'/>
  //       <div>
  //         <h2 className='font-medium'>Generating Interview Question</h2>
  //         <p className='text-primary'>Our AI is crafting personalized question bases on your job position</p>
  //       </div>
        
  //     </div>
  //     }
  //     {questionList?.length>0 && 
  //       <div className='p-5 border border-gray-200 rounded-xl '>
  //         {questionList.map((item,index)=>(
  //           <div key={index} className='p-3 border border-gray-200 rounded-xl'>
  //             <h2 className='font-medium'>{item.question}</h2>
  //             <h2>Type:{item?.type}</h2>
  //           </div>
  //         ))}
  //       </div>}
  //   </div>
  // )
  return (
  <div>
    {loading ? (
      <div className='p-5 bg-purple-100 rounded-xl border border-primary flex gap-5 items-center'>
        <Loader2Icon className='animate-spin'/>
        <div>
          <h2 className='font-medium'>Generating Interview Questions</h2>
          <p className='text-primary'>Our AI is crafting personalized questions based on your job position</p>
        </div>
      </div>
    ) : (
      questionList?.length > 0 ? (
        <div>
          <QuestionListContainer questionList={questionList}/>
        </div>
      ) : (
        <p className='text-gray-500 mt-4'>No questions available.</p>
      )
    )}
    <div className='flex justify-end mt-6 '>
      {/* <Button className={'cursor-pointer'} onClick={()=>onFinish()} disabled={saveLoading}>
        {saveLoading&&<Loader2 className='animate-spin'/>}
        Finish</Button> */}
        <Button 
  className='cursor-pointer' 
  onClick={onFinish} 
  disabled={saveLoading || loading}
>
  {(saveLoading || loading) && <Loader2 className='animate-spin mr-2' />}
  Finish
</Button>

    </div>
  </div>
);

}

export default QuestionList
