"use client"
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';

function Login() {
    const signInWithGoogle=async()=>{
        const {error}=await supabase.auth.signInWithOAuth({
            provider:'google',
            options: {
            // 👇 Highlight: Redirect to /auth after login
            redirectTo: `${process.env.NEXT_PUBLIC_HOST_URL}/auth`
          }
        })
        if(error){
            console.error('Error:',error.message)
        }
    }
  return (
    <div className=' flex flex-col items-center justify-center '>
      <div className='flex flex-col items-center mt-2 border rounded-2xl p-4'>
        <Image src={'/logo.jpeg'} alt='logo' width={110} height={110} className='rounded-3xl mb-1'/>
      
      <div>
        <Image src={'/login.webp'} alt='login' width={600} height={420} className='rounded-2xl'/>
        <h2 className='text-2xl font-bold text-center mt-3'>Welcome to Ai Recruiter</h2>
        <p className='text-gray-500 text-center'>Sign in with Google Authentication</p>
        <Button className='mt-5 w-full' onClick={signInWithGoogle}>Continue with Google</Button>
      </div>
    </div>
    </div>
  );
}

export default Login;