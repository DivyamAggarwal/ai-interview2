"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Vapi from "@vapi-ai/web"
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import TimerComponent from './_components/TimerComponent';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams,useRouter } from 'next/navigation';


function StartInterview() {
  const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);
  const vapi=new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  //const [activeUser,setActiveUser]=useState(false);
  const [isRecruiterSpeaking, setIsRecruiterSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callEnd, setCallEnd] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [conversation,setConversation]=useState();
  const {interview_id}=useParams()
  const router=useRouter()
  useEffect(()=>{
    interviewInfo&& startCall();
  },[interviewInfo])
  // const vapiRef = useRef();
  
 const startCall=()=>{
    let questionList="";
    interviewInfo?.interviewData?.questionList?.forEach((item,index) => {
      questionList=item?.question+","+questionList
    });
    const assistantOptions = {
        name: "AI Recruiter",
        firstMessage: "Hi"+ interviewInfo?.userName+", how are you? Ready for your interview on"+ interviewInfo?.interviewData?.jobPosition+"?",
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `
      You are an AI voice assistant conducting interviews.
      Your job is to ask candidates provided interview questions, assess their responses.
      Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
      "Hey there! Welcome to your `+ interviewInfo?.interviewData?.jobPosition+` interview. Let’s get started with a few questions!"
      Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
      Questions: `+questionList+`
      If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
      "Need a hint? Think about how React tracks component updates!"
      Provide brief, encouraging feedback after each answer. Example:
      "Nice! That’s a solid answer."
      "Hmm, not quite! Want to try again?"
      Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
      After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
      "That was great! You handled some tough questions well. Keep sharpening your skills!"
      End on a positive note:
      "Thanks for chatting! Hope to see you crushing projects soon!"
      Key Guidelines:
      ✅ Be friendly, engaging, and witty ✅
      ✅ Keep responses short and natural, like a real conversation
      ✅ Adapt based on the candidate’s confidence level
      ✅ Ensure the interview remains focused on React
      `.trim(),
            },
          ],
        },
    };
    vapi.start(assistantOptions)
  }
  const stopInterview=()=>{
    setIsRecruiterSpeaking(false);
    setIsUserSpeaking(false);
    setStartTimer(false);
    vapi.stop();
    console.log("Stop");
    setCallEnd(true);
    GenerateFeedback()
  }
  
  // vapi.on("message",(message)=>{
  //   console.log(message?.conversation);
  //   setConversation(message?.conversation)
  // })
  useEffect(()=>{
    const handleMessage=(message)=>{
      console.log('Message',message);
      if(message?.conversation){
        const convoString=JSON.stringify(message.conversation)
        console.log('Conversation string:',convoString)
        setConversation(convoString)
      }
    }
    vapi.on("message",handleMessage);
    vapi.on("call-start",()=>{
    console.log("Call has started");
    toast('Call Connected...');
    setStartTimer(true);
  })
  vapi.on("speech-start",()=>{
    console.log("Assistant speech has started");
    setIsRecruiterSpeaking(true);
    setIsUserSpeaking(false);
  })
  vapi.on("speech-end",()=>{
    console.log("Assistant speech has ended");
    setIsRecruiterSpeaking(false);
    setIsUserSpeaking(true);
  })
  vapi.on("call-end",()=>{
    console.log("Call has ended");
    setIsRecruiterSpeaking(false);
    setIsUserSpeaking(false);
    toast('Call Disconnected...')
    setStartTimer(false);
  })
    return ()=>{
      vapi.off("message",handleMessage);
      vapi.off('call-start',()=>console.log("END"));
      vapi.off('call-end',()=>console.log("END"));
      vapi.off('speech-start',()=>console.log("END"));
      vapi.off('speech-end',()=>console.log("END"));
    }
  },[])
   const GenerateFeedback=async()=>{
    const result=await axios.post('/api/ai-feedback',{
      conversation:conversation
    })
    console.log(result?.data)
    const Content=result.data.content;
    const FINAL_CONTENT=Content.replace('```json','').replace('```','');
    console.log(FINAL_CONTENT);
    const {data,error}=await supabase
      .from('interview-feedback')
      .insert([
        {userName:interviewInfo?.userName,
          userEmail:interviewInfo?.userEmail,
          interview_id:interview_id,
          feedback:JSON.parse(FINAL_CONTENT),
          recommendation:false
        }
      ])
      .select()
      console.log(data)
      router.replace('/interview/'+interview_id+"/completed");
  }
  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>AI Interview Session
        <span className='flex gap-2 items-center'>
            <Timer/>
            <TimerComponent start={startTimer}/>
        </span> 
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-6'>
            <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
              <div className='relative'>
                {isRecruiterSpeaking && (<span className='absolute inset-0 rounded-full bg-purple-500 opacity-75 animate-ping'></span>)}
                <Image src={'/ai.png'} width={100} height={100} alt='photo1' className='w-[60px] h-[60px] rounded-full object-cover'/>
              </div>
                <h2>AI Recruiter</h2>
            </div>
            <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
              <div className='relative'>
                {isUserSpeaking && (<span className='absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping'></span>)}
                <h2 className='text-2xl bg-primary h-[50px] w-[50px] text-white p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
              </div>
                <h2>{interviewInfo?.userName}</h2>
            </div>
        </div>
        <div className='flex justify-center mt-6 items-center gap-6'>
            <Mic className='h-12 w-12 p-3 bg-gray-500 rounded-full text-white cursor-pointer'/>
            {/* <AlertConfirmation stopInterview={()=>stopInterview()}> */}
              {!loading ?<Phone className='h-12 w-12 bg-red-500 p-3 rounded-full text-white cursor-pointer' onClick={()=>stopInterview()}/>:<Loader2Icon className='animate-spin'/>}
            {/* </AlertConfirmation> */}
        </div>
        <h2 className='text-sm text-gray-400 text-center mt-4'>Interview in Progress</h2>
    </div>
  )
}

export default StartInterview
