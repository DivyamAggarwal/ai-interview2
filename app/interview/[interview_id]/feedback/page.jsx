'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import Image from 'next/image'

function InterviewFeedback() {
  const router = useRouter()
  const { interview_id } = useParams()
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
  // Prevent multiple rapid auth changes from interfering
  let timeoutId
  
  const delayedFetch = () => {
    if (timeoutId) clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => {
      if (interview_id) {
        console.log('Auth settled - fetching feedback for:', interview_id)
        fetchFeedback()
      }
    }, 3000) // Wait 3 seconds for auth to settle
  }
  
  delayedFetch()
  
  return () => {
    if (timeoutId) clearTimeout(timeoutId)
  }
}, [interview_id])


  const fetchFeedback = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('Fetching feedback for interview_id:', interview_id)
      
      // Query with correct table name and column names
      const { data: feedbackData, error: feedbackError } = await supabase
        .from('interview-feedback')  // Exact table name with spaces
        .select('*')
        .eq('interview_id', interview_id)
        .order('created_at', { ascending: false })  // Correct timestamp column
        .limit(1)
        .single()

      if (feedbackError) {
        console.error('Feedback error details:', feedbackError)
        
        if (feedbackError.code === 'PGRST116') {
          throw new Error('No feedback found for this interview')
        }
        
        throw new Error(`Database error: ${feedbackError.message}`)
      }

      if (!feedbackData) {
        throw new Error('No feedback data found for this interview')
      }

      console.log('Raw feedback data:', feedbackData)

      // Parse the feedback JSON
      let parsedFeedback
      try {
        if (typeof feedbackData.feedback === 'string') {
          parsedFeedback = JSON.parse(feedbackData.feedback)
        } else if (typeof feedbackData.feedback === 'object') {
          parsedFeedback = feedbackData.feedback
        } else {
          throw new Error('Invalid feedback format')
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError)
        throw new Error(`Invalid feedback JSON: ${parseError.message}`)
      }

      // Convert boolean recommendation to string for display
      const getRecommendationText = (boolValue) => {
        if (boolValue === true) return 'Recommended'
        if (boolValue === false) return 'Not Recommended'
        return 'Not Available'
      }

      // Set the feedback state
      setFeedback({
        ...parsedFeedback.feedback,
        userName: feedbackData.userName,
        userEmail: feedbackData.userEmail,
        createdAt: feedbackData.created_at,  // Correct column name
        interviewId: feedbackData.interview_id,
        recommendationBoolean: feedbackData.recommendation,
        recommendationText: getRecommendationText(feedbackData.recommendation)
      })

      console.log('Feedback loaded successfully')

    } catch (err) {
      console.error('fetchFeedback error:', err)
      setError(err.message || 'Failed to load feedback')
      toast.error(`Error: ${err.message || 'Failed to load feedback'}`)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100 border-green-200'
    if (score >= 6) return 'text-yellow-600 bg-yellow-100 border-yellow-200'
    if (score >= 4) return 'text-orange-600 bg-orange-100 border-orange-200'
    return 'text-red-600 bg-red-100 border-red-200'
  }

  const getScoreLabel = (score) => {
    if (score >= 9) return 'Exceptional'
    if (score >= 7) return 'Strong'
    if (score >= 5) return 'Good'
    if (score >= 3) return 'Fair'
    return 'Needs Improvement'
  }

  const getRecommendationColor = (recommendationText) => {
    switch (recommendationText) {
      case 'Recommended':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Not Recommended':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

 const calculateOverallScore = () => {
  if (!feedback?.rating) return 0
  const ratings = feedback.rating
  const scores = [
    parseFloat(ratings.technicalSkills) || 0,
    parseFloat(ratings.communication) || 0,
    parseFloat(ratings.problemSolving) || 0,
    parseFloat(ratings.experience) || 0
  ]
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length
  return Number(average.toFixed(1))
}


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading feedback...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-6">
            <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => fetchFeedback()}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!feedback) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="text-center max-w-md">
          <div className="text-yellow-600 mb-6">
            <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.462-.64-6.318-1.76M6.5 7.5A1.5 1.5 0 015 6c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Feedback Available</h2>
            <p className="text-gray-600 mb-6">No feedback has been generated for this interview yet.</p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Interview Feedback</h1>
            <p className="text-gray-600 text-lg">AI-powered interview analysis and evaluation</p>
            
            {/* Interview Info */}
            <div className="mt-6 grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">Interview ID</p>
                <p className="text-lg font-semibold text-gray-800">{feedback.interviewId}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">Assessment Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Info */}
        {(feedback.userName || feedback.userEmail) && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Candidate Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Name</p>
                <p className="text-lg text-gray-800">{feedback.userName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Email</p>
                <p className="text-lg text-gray-800">{feedback.userEmail || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Overall Score & Recommendation */}
<div className="grid md:grid-cols-2 gap-8 mb-8">
  
  {/* Overall Performance */}
  <div className="bg-white rounded-2xl shadow-lg p-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Overall Performance</h2>
    <div className="text-center">
      {(() => {
        const overallScore = calculateOverallScore()
        return (
          <>
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-4xl font-bold border-4 ${getScoreColor(overallScore)}`}>
              {overallScore}
              <span className="text-2xl ml-1">/10</span>
            </div>
            <p className={`text-xl font-semibold mt-4 ${getScoreColor(overallScore)}`}>
              {getScoreLabel(overallScore)}
            </p>
          </>
        )
      })()}
    </div>
  </div>

  {/* Recommendation */}
  <div className="bg-white rounded-2xl shadow-lg p-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Hiring Recommendation</h2>
    <div className="text-center">
      <div className={`inline-flex items-center px-8 py-4 rounded-full text-xl font-bold border-2 ${getRecommendationColor(feedback.recommendationText)}`}>
        {feedback.recommendationText}
      </div>
      <p className="text-gray-600 mt-4 text-sm leading-relaxed">
        {feedback.RecommendationMsg || 'Based on the interview assessment and scoring.'}
      </p>
    </div>
  </div>
</div>

        {/* Skills Assessment */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Skills Assessment
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Technical Skills */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray={`${(feedback.rating?.technicalSkills || 0) * 10}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-800">{feedback.rating?.technicalSkills || 0}</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Technical Skills</h4>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(feedback.rating?.technicalSkills || 0)}`}>
                {getScoreLabel(feedback.rating?.technicalSkills || 0)}
              </div>
            </div>

            {/* Communication */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray={`${(feedback.rating?.communication || 0) * 10}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-800">{feedback.rating?.communication || 0}</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Communication</h4>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(feedback.rating?.communication || 0)}`}>
                {getScoreLabel(feedback.rating?.communication || 0)}
              </div>
            </div>

            {/* Problem Solving */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    strokeDasharray={`${(feedback.rating?.problemSolving || 0) * 10}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-800">{feedback.rating?.problemSolving || 0}</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Problem Solving</h4>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(feedback.rating?.problemSolving || 0)}`}>
                {getScoreLabel(feedback.rating?.problemSolving || 0)}
              </div>
            </div>

            {/* Experience */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray={`${(feedback.rating?.experience || 0) * 10}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-800">{feedback.rating?.experience || 0}</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Experience</h4>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(feedback.rating?.experience || 0)}`}>
                {getScoreLabel(feedback.rating?.experience || 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        {feedback.summary && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.462-.64-6.318-1.76M6.5 7.5A1.5 1.5 0 015 6c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z" />
              </svg>
              Interview Summary
            </h3>
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <p className="text-gray-700 leading-relaxed text-lg">
                {feedback.summary}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to Dashboard
          </button>
          
          <button
            onClick={() => window.print()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Report
          </button>

          <button
            onClick={() => fetchFeedback()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Feedback
          </button>
        </div>
      </div>
    </div>
  )
}

export default InterviewFeedback
