"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     // 이미 인증된 사용자인 경우
  //     router.replace('/home');
  //   } else if (status === "loading") {
  //     // 세션 로딩 중인 경우, 아무 작업 안 함
  //   } else {
  //     // 로그인되지 않은 경우
  //     router.replace('/i/login');
  //   }
  // }, [session, status, router]);

  return <div></div>;
}
