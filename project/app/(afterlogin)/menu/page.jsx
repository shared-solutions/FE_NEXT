"use client";
import { useState, useEffect } from "react";
import styles from "@/app/modules/menuCss/menu.module.scss";


import ProfileImage from "@/app/components/menu/ProfileImage";
import Info from "@/app/components/menu/Info";
import Category from "@/app/components/menu/Category";
import Features from "@/app/components/menu/Features";
import Close from "@/app/components/menu/Close";

export default function MyPage() {




  const [userData, setUserData] = useState([]);




  const getMyPage = async () => {
    try {


      const atkToken = localStorage.getItem("token");
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

          <Features />

        </div>
      </div>
    </div>
  );
}
