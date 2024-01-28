"use client";
import { useState } from "react";

import styles from "@/app/modules/profileCss/profile.module.scss";

import ProfileHeader from "@/app/components/profile/ProfileHeader";
import ProfileImage from "@/app/components/profile/ProfileImage";
import RankImage from "@/app/components/profile/RankImage";
import Rank from "@/app/components/profile/Rank";
import Adopt from "@/app/components/profile/Adopt";
import Myqna from "@/app/components/profile/Myqna";

export default function Profile() {
  const [rank, setRank] = useState(false);
  const handleRankButton = () => {
    console.log(rank);
    setRank(true);
  };

  return (
    <div className={!rank ? styles.background : styles.rank_image}>
      <ProfileHeader />
      <div className={styles.container}>
        {!rank ? <ProfileImage /> : <RankImage />}
        <p className={!rank ? styles.name : styles.name_bold}>psward73님</p>
        {!rank ? <p className={styles.info_edit}>회원정보 수정</p> : ""}
        <Rank clickHandler={handleRankButton} />
        <Adopt />
        <Myqna />
      </div>
    </div>
  );
}
