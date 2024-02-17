"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/modules/profileCss/profile.module.scss";
import axios from "axios";
import ProfileHeader from "@/app/components/profile/ProfileHeader";
import ProfileImage from "@/app/components/profile/ProfileImage";
import RankImage from "@/app/components/profile/RankImage";
import Rank from "@/app/components/profile/Rank";
import Adopt from "@/app/components/profile/Adopt";
import Myqna from "@/app/components/profile/Myqna";

export default function Profile() {
  const [rank, setRank] = useState(false);
  const [userData, setUserData] = useState([]);
  const [myQuestion, setMyQuestion] = useState([]);
  const [myAnswer, setMyAnswer] = useState([]);
  const handleRankButton = () => {
    console.log(rank);
    setRank(true);
  };
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
        localStorage.setItem("token", response.data.result[0].token);
        console.log();
        //alert("성공적으로 로그인했습니다!");
      }
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
      //alert("ID 또는 비밀번호가 틀립니다.");
    }
  };
  const atkToken = localStorage.getItem("token");

  const getMyQuestion = async () => {
    try {
      const page = 0;

      const url = new URL(
        "https://dev.gomin-chingu.site/user/my-page/profile/question"
      ); // API 엔드포인트 URL로 교체
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
        setUserData(data.result);
        setMyQuestion(data.result.postList);
        console.log("MyPage data:", data);
      } else {
        console.error("Failed to get MyPage data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getMyAnswer = async () => {
    try {
      const page = 0;

      const url = new URL(
        "https://dev.gomin-chingu.site/user/my-page/profile/answer"
      ); // API 엔드포인트 URL로 교체
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
        setMyAnswer(data.result.commentList);
        console.log("MyPage data:", data.result.commentList);
      } else {
        console.error("Failed to get MyPage data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    handleLogin();
    getMyQuestion();
    getMyAnswer();
  }, []);
  return (
    <div className={!rank ? styles.background : styles.rank_image}>
      <ProfileHeader header="프로필" />
      <div className={styles.container}>
        {!rank ? <ProfileImage /> : <RankImage data={userData} />}
        <p className={!rank ? styles.name : styles.name_bold}>
          {userData.nickName}님
        </p>
        <Link href="/profile/edit">
          {!rank ? <p className={styles.info_edit}>회원정보 수정</p> : ""}
        </Link>
        <Rank data={userData} clickHandler={handleRankButton} />
        <Adopt data={userData} />
        <Myqna
          adoptPost={userData.adoptPostPercent}
          questionData={myQuestion}
          answerData={myAnswer}
        />
      </div>
    </div>
  );
}
