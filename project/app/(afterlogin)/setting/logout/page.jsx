"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/modules/settingCss/logout.module.scss";
import Header from "@/app/components/setting/Header";
import useAuthStore from "@/app/zustand/useAuthStore";
export default function Logout() {
  
  const {setToken} = useAuthStore()
  const router = useRouter();
  const token = localStorage.getItem('token')
  const Logout = async () => { 
    try {

      const response = await fetch('/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'atk' :token
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('rtk');
        setToken("");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        router.replace('/i/login')
      } else {
        console.error('Logout failed');
        alert("이미 로그아웃되셨습니다.")
        window.location.href='/login'
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }

    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className={styles.container}>
      <Header text="로그아웃" />
      <h1 className={styles.text}>로그아웃 하시겠습니까?</h1>
      <button className={styles.button_logout} onClick={Logout}>
        로그아웃
      </button>
      <Link href="/home">
        <button className={styles.button_cancel}>취소</button>
      </Link>
    </div>
  );
}