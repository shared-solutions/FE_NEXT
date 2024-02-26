"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/modules/profileCss/profile.module.scss";
import { getMyQuestion } from "@/app/api/user/profile/my-profile";
import { getMyAnswer } from "@/app/api/user/profile/my-profile";
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
  const [currentPage, setCurrentPage] = useState(0);

  const handleRankButton = () => {
    setRank(true);
  };

  const handlePageChange = async (page) => {
    try {
      setCurrentPage(page);
      // 데이터 초기화
      setMyQuestion([]);
      setMyAnswer([]);
      
      const question = await getMyQuestion(page);
      setUserData(question);
      setMyQuestion(question.postList);
      const answer = await getMyAnswer(page);
      setMyAnswer(answer);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handlePageChange(currentPage);
    };
    fetchData();
  }, [currentPage]);

  return (
    <div className={!rank ? styles.background : styles.rank_image}>
      <ProfileHeader header="프로필" />
      <div className={styles.container}>
        {!rank ? (
          <ProfileImage image={userData.userPhoto} />
        ) : (
          <RankImage data={userData} />
        )}
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
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
