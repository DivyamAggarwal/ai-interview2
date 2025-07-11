"use client";
import { Button } from "@/components/ui/button";
import { Plus, Video, Sparkles, Calendar, Clock, User, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import InterviewCard from "../dashboard/_components/InterviewCard";

function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq('userEmail', user?.email)
        .order('id', { ascending: false });

      if (error) {
        console.error("Error fetching interviews:", error);
      } else {
        console.log("Interviews:", Interviews);
        setInterviewList(Interviews || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {/* Enhanced Header Section */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-3xl blur-xl" />
        <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Video className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Interview Collection
                </h1>
                <p className="text-gray-600 text-lg">
                  Manage and review all your created interviews
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-xl border border-blue-200">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">
                  {interviewList.length} Interview{interviewList.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <Link href={'/dashboard/create-interview'}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3 font-semibold group relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                  <Plus className="w-5 h-5 mr-2 z-10" />
                  <span className="z-10">Create New</span>
                  <Sparkles className="w-4 h-4 ml-2 z-10" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" 
                 style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && interviewList?.length === 0 && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-3xl blur-2xl" />
          <div className="relative bg-white/70 backdrop-blur-xl border border-blue-200/50 rounded-3xl p-16 text-center shadow-xl">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-20" />
                <div className="relative p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border-2 border-blue-200">
                  <Video className="h-16 w-16 text-blue-600" />
                </div>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No Interviews Yet
            </h3>
            <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
              Start building your interview collection by creating your first AI-powered interview session. It's quick and easy!
            </p>
            
            <Link href={'/dashboard/create-interview'}>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-10 py-4 text-lg font-semibold group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                <Plus className="w-6 h-6 mr-3 z-10" />
                <span className="z-10">Create Your First Interview</span>
                <Sparkles className="w-5 h-5 ml-3 z-10" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Interview Grid */}
      {!loading && interviewList?.length > 0 && (
        <div className="space-y-8">
          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Interviews</p>
                  <p className="text-2xl font-bold text-gray-800">{interviewList.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl border border-purple-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Recent Activity</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {interviewList.length > 0 ? 'Active' : 'None'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl border border-green-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-2xl font-bold text-gray-800">Ready</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Cards Grid */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              Your Interviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewList.map((interview, index) => (
                <div key={index} className="group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative transform group-hover:scale-[1.02] transition-transform duration-300">
                      <InterviewCard interview={interview} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/10 to-purple-100/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

export default AllInterview;
