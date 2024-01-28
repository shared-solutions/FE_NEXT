"use client";
import { useState } from "react";
import Answer from "@/app/components/profile/Answer";
import Question from "@/app/components/profile/Question";
import styles from "../../modules/profileCss/myqna.module.scss";

export default function Myqna() {
  const [content, setContent] = useState("question");

  const handleClickButton = (value) => {
    setContent(value);
  };
  const selectComponent = {
    question: <Question />,
    answer: <Answer />,
  };
  return (
    <>
      <div className={styles.rowContainer}>
        <h5>나의 Q&A</h5>
      </div>
      <div className={styles.rowContainer}>
        <div
          className={`${styles.selectContainer} ${
            content === "question" ? "" : styles.disabled
          }`}
          onClick={() => handleClickButton("question")}
          style={{ "margin-right": "4%" }}
        >
          질문
        </div>
        <div
          className={`${styles.selectContainer} ${
            content === "answer" ? "" : styles.disabled
          }`}
          onClick={() => handleClickButton("answer")}
        >
          답변
        </div>
      </div>
      <div className={styles.rowContainer}>
        {content === "question" ? (
          <div className={styles.grid}>
            <p style={{ "font-weight": "900" }}>총 14건 </p>
            <p style={{ color: "#8E8E8E", "font-weight": "normal" }}>
              (채택 100%)
            </p>
            <p style={{ color: "#FFC600", "font-weight": "normal" }}>
              관리하기
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      {content && selectComponent[content]}
    </>
  );
}
