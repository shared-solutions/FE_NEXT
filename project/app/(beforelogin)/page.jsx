
'use client'
import { useRouter } from "next/navigation";
import useAuthStore from "../zustand/useAuthStore";
import { useEffect } from "react";

export default async function home() {
  const router = useRouter();
  const token = useAuthStore.getState().token
  useEffect(() => {
    // 페이지 전환 시 미들웨어 로직을 실행합니다.
    if (token==='' && router.pathname !== '/i/:path*') {
      router.replace('/i/login');
    }
  }, [token, router]);
    return (
      <div>
      </div>
    )
  }
