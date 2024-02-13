"use client";
import { useState } from "react";
import styles from "@/app/modules/notificationCss/content.module.scss";
import Image from "next/image";
import woman_image from "@/app/public/image/woman_image.png";
import orange_circle from "@/app/public/image/orange_circle.png";

export default function Content({ alarm, data }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };
  const createdAtDate = new Date(data.createdAt);
  const currentTime = new Date();
  let timeDifference;
  const timeDifferenceInMilliseconds = currentTime - createdAtDate;
  const timeDifferenceInHours = Math.floor(
    timeDifferenceInMilliseconds / (1000 * 60 * 60)
  );
  if (timeDifferenceInHours >= 24) {
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    timeDifference = timeDifferenceInDays;
  } else {
    timeDifference = timeDifferenceInHours;
  }
  return (
    <div
      className={`${styles.content} ${isClicked || alarm ? styles.white : ""}`}
      onClick={handleClick}
    >
      {alarm || isClicked ? (
        <div style={{ marginTop: "-50px", marginRight: "14px" }} />
      ) : (
        <Image
          src={orange_circle}
          alt="orange"
          style={{ marginTop: "-50px", marginRight: "8px" }}
        />
      )}
      <Image src={woman_image} alt="image" />
      <div className={styles.content_text}>
        <p style={{ fontWeight: "bold" }}>
          {data.nickName}님이 회원님의 게시물에 댓글을 남겼습니다.
        </p>
        <div className={styles.text_container}>
          <p style={{ color: "#595959" }}>{data.content}</p>
          <p style={{ color: "#A5A5A5" }}>{timeDifference}{timeDifferenceInHours >= 24 ? "일" : "시간"} 전</p>
        </div>
      </div>
    </div>
  );
}
