"use client";
import styles from "@/app/modules/menuCss/menu.module.scss";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import ProfileImage from "@/app/components/menu/ProfileImage";
import Info from "@/app/components/menu/Info";
import Category from "@/app/components/menu/Category";
import Features from "@/app/components/menu/Features";
import Close from "@/app/components/menu/Close";

export default function MyPage() {
  const router = useRouter();
  const data = useSession;
  const Logout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/login");
    });
  };

  const handleLogin = async () => {
    try {
      const endpoint = "http://localhost:3000/user/login";
      const requestBody = {
        email: "yingo24655@gmail.com",
        password: "asdfasdf",
      };
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.result[0].token) {
        localStorage.setItem("token", response.data.result[0].token);
        console.log();
        alert("성공적으로 로그인했습니다!");
      }
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
      alert("ID 또는 비밀번호가 틀립니다.");
    }
  };


  return (
    <div className={styles.modal}>
      <div className={styles.background}>
        <Close />
        <div className={styles.container}>
          <ProfileImage />
          <Info />
          <Category />
          <Features logout={Logout} />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
