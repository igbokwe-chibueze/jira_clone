"use client"

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current"
import { useSignOut } from "@/features/auth/api/use-signout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  const {data, isLoading} = useCurrent();
  const {mutate} = useSignOut();
  
  useEffect(() => {
    if(!data && !isLoading) {
      router.push("/sign-in");
    }
  
  }, [data]);
    
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <span className='text-3xl font-bold'>This is the main page</span>
      <span className='text-md'>Only visible to authorized users</span>

      <Button onClick={() => mutate()}>Sign Out</Button>
      
    </div>
  )
}

export default HomePage