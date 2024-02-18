"use client";
import { useState } from "react";
import Answer from "@/app/components/profile/Answer";
import Question from "@/app/components/profile/Question";
import styles from "../../modules/profileCss/myqna.module.scss";

export default function Myqna({ questionData, answerData, adoptPost }) {
  const [content, setContent] = useState("question");

  const handleClickButton = (value) => {
    setContent(value);
  };
  const selectComponent = {
    question: <Question data={questionData} />,
    answer: <Answer data={answerData} />,
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
          style={{ marginRight: "4%" }}
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
            <p style={{ fontWeight: "900" }}>총 {questionData.length}건 </p>
            <p style={{ color: "#8E8E8E", fontWeight: "normal" }}>
              (채택 {adoptPost === "NaN" ? 0 : adoptPost}%)
            </p>
            <p style={{ color: "#FFC600", fontWeight: "normal" }}>관리하기</p>
          </div>
        ) : (
          ""
        )}
      </div>
      {content && selectComponent[content]}
    </>
  );
}
