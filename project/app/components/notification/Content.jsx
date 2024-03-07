"use client";
import styles from "@/app/modules/notificationCss/content.module.scss";
import Image from "next/image";
import defaultUserImg from "@/app/public/image/defaultUserImg.png";
import info from "@/app/public/image/info.png";

export default function Content({ data }) {
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
      className={`${styles.content} ${data.read === true ? styles.white : ""}`}
    >
      <Image
        src={data.userPhoto ? data.userPhoto: (data.commentContent === null ? info : defaultUserImg)}
        alt="image"
        width={32}
        height={32}
        style={{ borderRadius: "50%" }}
      />
      <div className={styles.content_text}>
        <p style={{ fontWeight: "bold" }}>{data.alarmContent}</p>
        <div className={styles.text_container}>
          <p style={{ color: "#595959" }}>
            {data.commentContent === null
              ? "해당 투표가 마감되었습니다."
              : data.commentContent}
          </p>
          <p style={{ color: "#A5A5A5" }}>
            {timeDifference}
            {timeDifferenceInHours >= 24 ? "일" : "시간"} 전
          </p>
        </div>
      </div>
    </div>
  );
}
