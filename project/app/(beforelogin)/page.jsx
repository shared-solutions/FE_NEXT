'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if(status === "authenticated"){
      router.replace('/home')
    } else {
      router.replace('/i/login')
    }
  }, [session, status, router])
  
  return (
      <div>

      </div>
  )
}
