"use client";
import { useState, useEffect } from "react";
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
  const userEmail = process.env.NEXT_PUBLIC_USER_EMAIL;
  const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
  const router = useRouter();
  const data = useSession;
  const Logout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/login");
    });
  };
  const [userData, setUserData] = useState([]);

  const handleLogin = async () => {
    try {
      const endpoint = "https://dev.gomin-chingu.site/user/login";
      const requestBody = {
        email: userEmail,
        password: userPassword,
      };
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.result[0].token) {
        localStorage.setItem("token", response.data.result[0].token);
        console.log();
        //alert("성공적으로 로그인했습니다!");
      }
      console.log(response.data.result);
    } catch (error) {
      console.log(userEmail);
      console.log(userPassword);
      console.log(error);
      //alert("ID 또는 비밀번호가 틀립니다.");
    }
  };
  const atkToken = localStorage.getItem("token");

  const getMyPage = async () => {
    try {
      const url = "https://dev.gomin-chingu.site/user/my-page"; // API 엔드포인트 URL로 교체
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          atk: atkToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.result);
        console.log("MyPage data:", data);
      } else {
        console.error("Failed to get MyPage data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    handleLogin();
    getMyPage();
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.background}>
        <Close />
        <div className={styles.container}>
          <ProfileImage />
          <Info userData={userData} />
          <Category />
          <Features logout={Logout} />
        </div>
      </div>
    </div>
  );
}
