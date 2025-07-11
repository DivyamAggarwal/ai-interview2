"use client"
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Copy, Link as LinkIcon, Check, MessageSquare, Hash, CheckCircle, Clock, Users, Briefcase } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Form from './_components/Form';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function CreateInterview() {
    const router = useRouter();
    const [formData, setFormData] = useState();
    const [step, setStep] = useState(1);
    const [interviewId, setInterviewId] = useState();
    const [copied, setCopied] = useState(false);

    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        console.log("formdata", formData)
    }

    const onGoToNext = () => {
        if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type) {
            toast.error('Please fill in all required fields')
            return;
        }
        setStep(step + 1);
    }

    const onCreateLink = (interview_id) => {
        setInterviewId(interview_id);
        setStep(step + 1);
    }

    const copyToClipboard = async () => {
        const link = `${typeof window !== 'undefined' ? window.location.origin : ""}/interview/${interviewId}`;
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Failed to copy link");
        }
    }

    const getStepTitle = () => {
        switch (step) {
            case 1: return "Configure your interview parameters to generate tailored questions";
            case 2: return "Review and customize your generated questions";
            case 3: return "Share your interview link with candidates";
            default: return "Create Interview";
        }
    }

    const getStepIcon = (stepNumber) => {
        switch (stepNumber) {
            case 1: return <Briefcase className="h-5 w-5" />;
            case 2: return <MessageSquare className="h-5 w-5" />;
            case 3: return <LinkIcon className="h-5 w-5" />;
            default: return null;
        }
    }

    const renderInterviewLink = () => {
        const link = `${typeof window !== 'undefined' ? window.location.origin : ""}/interview/${interviewId}`;
        
        return (
            <div className="max-w-5xl mx-auto text-center py-20 px-10">
                <div className="mb-16">
                    <div className="p-8 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-full w-36 h-36 mx-auto mb-10 flex items-center justify-center shadow-xl">
                        <LinkIcon className="h-16 w-16 text-green-600" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        🎉 Interview Link Generated Successfully!
                    </h2>
                    <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                        Your interview is now ready and configured! Share this secure link with candidates to begin their interview journey. 
                        The link remains active and can be used multiple times within the validity period.
                    </p>
                </div>

                {/* Interview Summary Card */}
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-10 mb-12 text-left shadow-xl border border-blue-100 max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <MessageSquare className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Interview Configuration</h3>
                            <p className="text-gray-600 mt-1">Review your interview setup details</p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <Briefcase className="h-5 w-5 text-blue-600" />
                                    <span className="text-gray-600 font-medium">Position</span>
                                </div>
                                <span className="font-bold text-gray-900 text-lg">{formData?.jobPosition}</span>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock className="h-5 w-5 text-purple-600" />
                                    <span className="text-gray-600 font-medium">Duration</span>
                                </div>
                                <span className="font-bold text-gray-900 text-lg">{formData?.duration} minutes</span>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <Users className="h-5 w-5 text-orange-600" />
                                <span className="text-gray-600 font-medium">Interview Types</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData?.type?.map((type, index) => (
                                    <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Link Sharing Section */}
                <div className="bg-white rounded-3xl p-10 mb-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <LinkIcon className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Share Interview Link</h3>
                            <p className="text-gray-600 mt-1">Copy and share this secure link with your candidates</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                        <Input
                            readOnly
                            value={link}
                            className="flex-1 bg-white border-gray-300 text-base h-14 px-6"
                        />
                        <Button
                            onClick={copyToClipboard}
                            className={`px-8 py-4 h-14 text-base font-semibold rounded-xl transition-all duration-200 ${
                                copied 
                                    ? 'bg-green-600 hover:bg-green-700' 
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                            }`}
                        >
                            {copied ? (
                                <>
                                    <Check className="h-5 w-5 mr-2" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="h-5 w-5 mr-2" />
                                    Copy Link
                                </>
                            )}
                        </Button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <p className="text-blue-700 text-sm">
                            💡 <strong>Tip:</strong> This link can be shared via email, messaging apps, or embedded in your recruitment process. 
                            Candidates can access it from any device with an internet connection.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
                    <Button
                        variant="outline"
                        onClick={() => router.push('/dashboard')}
                        className="px-10 py-4 h-auto text-base font-semibold rounded-xl border-2 hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Dashboard
                    </Button>
                    <Button
                        onClick={() => {
                            setStep(1);
                            setFormData(undefined);
                            setInterviewId(undefined);
                        }}
                        className="px-10 py-4 h-auto text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                    >
                        Create Another Interview
                        <Briefcase className="h-5 w-5 ml-2" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12'>
            <div className='max-w-6xl mx-auto px-6'>
                {/* Header Card */}
                <div className='bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100'>
                    <div className='flex items-center gap-6 mb-8'>
                        <button
                            onClick={() => router.back()}
                            className='p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group'
                        >
                            <ArrowLeft className='h-6 w-6 text-gray-600 group-hover:text-gray-800' />
                        </button>
                        <div className='flex-1'>
                            <h1 className='font-bold text-xl text-gray-900 mb-2'>Create New Interview</h1>
                            <p className='text-gray-600 text-base'>{getStepTitle()}</p>
                        </div>
                    </div>

                    {/* Enhanced Progress Steps */}
                    <div className='mb-8'>
                        <div className='flex justify-between items-center mb-6'>
                            {[1, 2, 3].map((stepNumber) => (
                                <div key={stepNumber} className='flex items-center gap-4'>
                                    <div className={`
                                        w-12 h-12 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300
                                        ${step >= stepNumber 
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                                            : 'bg-gray-200 text-gray-500'
                                        }
                                    `}>
                                        {step > stepNumber ? (
                                            <Check className="h-6 w-6" />
                                        ) : (
                                            getStepIcon(stepNumber)
                                        )}
                                    </div>
                                    <div className='text-left'>
                                        <div className={`text-sm font-bold ${step >= stepNumber ? 'text-blue-600' : 'text-gray-400'}`}>
                                            Step {stepNumber}
                                        </div>
                                        <div className={`text-sm ${step >= stepNumber ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {stepNumber === 1 && 'Setup Details'}
                                            {stepNumber === 2 && 'Generate Questions'}
                                            {stepNumber === 3 && 'Share Link'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Progress value={step * 33.33} className='h-3 bg-gray-200 rounded-full' />
                        <div className='flex justify-between text-xs text-gray-500 mt-2'>
                            <span>Start</span>
                            <span>{Math.round(step * 33.33)}% Complete</span>
                            <span>Finish</span>
                        </div>
                    </div>
                </div>

                {/* Step Content Card */}
                <div className='bg-white rounded-3xl shadow-xl border border-gray-100 min-h-[600px]'>
                    {step === 1 && (
                        <div className='p-10'>
                            <Form 
                                onHandleInputChange={onHandleInputChange} 
                                GoToNext={() => onGoToNext()} 
                            />
                        </div>
                    )}
                    {step === 2 && (
                        <div className='p-10'>
                            <QuestionList 
                                formData={formData} 
                                onCreateLink={(interview_id) => onCreateLink(interview_id)} 
                            />
                        </div>
                    )}
                    {step === 3 && renderInterviewLink()}
                </div>
            </div>
        </div>
    )
}

export default CreateInterview
