"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient'
import React,{useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'; 
import { usePathname } from 'next/navigation';
function Provider({children}) {
    const [user,setUser]=useState();
    const router = useRouter();
    const pathname = usePathname()
    useEffect(()=>{
        CreateNewUser();
    },[])
    const CreateNewUser=()=>{
        supabase.auth.getUser().then(async({data:{user}})=>{
            let { data: Users, error } = await supabase
                .from('Users')
                .select('*')
                .eq('email',user?.email);
            console.log(Users)
            if(Users?.length==0){
                const { data, error }=await supabase.from("Users")
                .insert([
                    { 
                        name:user?.user_metadata?.name,
                        email:user?.email,
                        profile_photo:user?.user_metadata?.avatar_url
                    }
                ])
                .select();
                console.log(data);
                // setUser(data);
                setUser(data?.[0]); 
                if (pathname === "/auth") router.push("/dashboard");
                
                return;
            }
            setUser(Users[0]);
            if (pathname === "/auth") router.push("/dashboard");
        })
    }
  return (
    <UserDetailContext.Provider value={{user,setUser}}>
        <div>
        {children}
        </div>
    </UserDetailContext.Provider>
  )
}

export default Provider
export const useUser=()=>{
    const context=useContext(UserDetailContext);
    return context;
}
