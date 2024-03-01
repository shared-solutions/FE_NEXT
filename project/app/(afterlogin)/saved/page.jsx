"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import arrow2 from "@/app/public/image/arrow2.png";
import styles from "@/app/modules/savedCss/saved.module.scss";
import AllPost from "@/app/components/saved/AllPost";
import MyCategory from "@/app/components/saved/MyCategory";

export default function Saved() {
  const [content, setContent] = useState("allpost");

  const handleClickButton = (value) => {
    setContent(value);
  };
  const selectComponent = {
    allpost: <AllPost />,
    mycategory: <MyCategory />,
  };
  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <Link href="/home">
          <Image src={arrow2} alt="previous" />
        </Link>
        <h3>저장된 게시물</h3>
      </div>
      <div className={styles.rowContainer}>
        <div
          className={`${styles.selectContainer} ${
            content === "allpost" ? "" : styles.disabled
          }`}
          onClick={() => handleClickButton("allpost")}
          style={{ marginRight: "4%" }}
        >
          모든 게시물
        </div>
        <div
          className={`${styles.selectContainer} ${
            content === "mycategory" ? "" : styles.disabled
          }`}
          onClick={() => handleClickButton("mycategory")}
        >
          내 카테고리
        </div>
      </div>
      <div className={styles.content}>
        {content && selectComponent[content]}
      </div>
    </div>
  );
}
