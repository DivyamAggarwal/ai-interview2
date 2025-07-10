import React from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import { Copy, Send, Calendar, Briefcase, CheckCircle, Clock } from 'lucide-react'
import { toast } from "sonner";

function InterviewCard({ interview }) {
  const copyLink = () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/interview/' + interview?.interview_id;
    navigator.clipboard.writeText(url);
    toast("Link copied to clipboard!");
  }

  const onSend = () => {
    window.location.href = "mailto:divyam7@gmail.com?subject=Interview Link&body=Hi, I would like to share the interview link with you: " + process.env.NEXT_PUBLIC_HOST_URL + '/interview/' + interview?.interview_id;
  }

  return (
    <div className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/50 hover:border-slate-300/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className='relative p-6'>
        {/* Header Section */}
        <div className='flex items-center justify-between mb-4'>
          <div className='relative'>
            <div className='h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
              <CheckCircle className="w-2 h-2 text-white" />
            </div>
          </div>
          
          <div className='flex items-center gap-2 px-3 py-1.5 bg-slate-200/50 rounded-full border border-slate-300/30'>
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className='text-sm font-medium text-slate-600'>
              {moment(interview?.created_at).format('DD MMM YYYY')}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className='space-y-3'>
          <div>
            <h3 className="font-bold text-xl text-slate-800 group-hover:text-indigo-700 transition-colors duration-300">
              {interview.jobPosition}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500 font-medium">
                {moment(interview?.created_at).fromNow()}
              </span>
            </div>
          </div>
          
          <div className="relative">
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
              {interview.jobDescription}
            </p>
            <div className="absolute bottom-0 right-0 w-8 h-4 bg-gradient-to-l from-slate-100 to-transparent group-hover:from-indigo-50/50" />
          </div>
        </div>

        {/* Actions Section */}
        <div className='mt-6 flex gap-3'>
          <Button 
            variant={'outline'} 
            onClick={copyLink}
            className="flex-1 group/copy bg-white/80 hover:bg-white border-slate-300/50 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl py-2.5"
          >
            <Copy className="w-4 h-4 mr-2 group-hover/copy:rotate-12 transition-transform duration-300" />
            <span className="font-medium">Copy Link</span>
          </Button>
          
          <Button 
            onClick={onSend}
            className="flex-1 group/send bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-2.5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/send:translate-x-[100%] transition-transform duration-700 ease-out" />
            <Send className="w-4 h-4 mr-2 z-10 group-hover/send:translate-x-1 transition-transform duration-300" />
            <span className="font-medium z-10">Send</span>
          </Button>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Enhanced hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default InterviewCard