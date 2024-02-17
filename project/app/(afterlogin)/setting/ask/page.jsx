"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/app/modules/settingCss/ask.module.scss";
import Header from "@/app/components/setting/Header";
import Image from "next/image";
import down from "@/app/public/image/down.png";
import up from "@/app/public/image/up.png";

export default function Ask() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const handleModal = () => {
    setCategoryOpen(!categoryOpen);
  };

  return (
    <div className={styles.container}>
      <Header text="문의하기" />
      <h2 className={styles.text}>문의하실 내용을 적어주세요.</h2>
      <div className={styles.ask_container}>
        {!categoryOpen ? (
          <div className={styles.category}>
            <p>카테고리</p>
            <Image
              src={down}
              alt="down"
              width={18}
              height={8}
              onClick={handleModal}
            />{" "}
          </div>
        ) : (
          <div className={styles.categoryOpen}>
            <Image
              src={up}
              alt="up"
              width={18}
              height={8}
              onClick={handleModal}
            />
            <p>기술적 문제</p>
            <p>기술적 문제</p>
            <p>기술적 문제</p>
            <p>기술적 문제</p>
            <p>기술적 문제</p>
          </div>
        )}

        <textarea
          className={styles.content}
          placeholder="내용을 입력해주세요"
        />
        <Link href="/setting">
          <button className={styles.button}>제출하기</button>
        </Link>
      </div>
    </div>
  );
}
