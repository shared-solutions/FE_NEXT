"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/modules/notificationCss/notification.module.scss";
import arrow2 from "../../public/image/arrow2.png";
import more_button from "@/app/public/image/more_button.png";

import Content from "@/app/components/notification/Content";

export default function Home() {
  const [userData, setUserData] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [readAllAlarm, setReadAllAlarm] = useState(false);

  const handleLogin = async () => {
    try {
      const endpoint = "https://dev.gomin-chingu.site/user/login";
      const requestBody = {
        email: process.env.NEXT_PUBLIC_USER_EMAIL,
        password: process.env.NEXT_PUBLIC_USER_PASSWORD,
      };
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.result[0].token) {
        // 클라이언트 측에서만 localStorage에 접근
        if (typeof window !== "undefined") {
          localStorage.setItem("token", response.data.result[0].token);
        }
        console.log("로그인 성공");
      }
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
      console.log("로그인 실패");
    }
  };

  const atkToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const getMyPage = async () => {
    try {
      const page = 0;

      const url = new URL("https://dev.gomin-chingu.site/user/alarm");
      url.searchParams.append("page", page);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          atk: atkToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.result.alarmList);
        console.log("MyPage data:", data);
      } else {
        console.error("Failed to get MyPage data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleLogin();
        console.log("Fetching MyPage data...");
        await getMyPage();
        console.log("MyPage data fetched successfully!");
      } catch (error) {
        console.error("Error fetching MyPage data:", error);
      }
    };

    fetchData();
  }, []);

  const clickHandler = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <div className={styles.container}>
      {userData ? (
        <>
          <div className={styles.prev}>
            <Link href="/home">
              <Image src={arrow2} alt="previous" />
            </Link>
            <h3>알림</h3>
          </div>
          <Image
            src={more_button}
            alt="button"
            className={styles.moreImg}
            onClick={clickHandler}
          />
        </>
      ) : (
        <h3 style={{ marginTop: "25%", marginLeft: "10%" }}>Loading...</h3>
      )}
      {isButtonClicked ? (
        <div className={styles.more_container}>
          <p
            onClick={() => {
              setReadAllAlarm(true);
              clickHandler();
            }}
          >
            모두 읽음 처리
          </p>
          <p onClick={() => clickHandler()}>알림 끄기</p>
        </div>
      ) : (
        ""
      )}
      <div className={styles.contentContainer}>
        {userData &&
          userData.map((data, index) => (
            <Content key={index} alarm={readAllAlarm} data={data} />
          ))}
      </div>
    </div>
  );
}
