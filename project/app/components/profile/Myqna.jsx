"use client";
import { useEffect, useState } from "react";
import Answer from "@/app/components/profile/Answer";
import Question from "@/app/components/profile/Question";
import styles from "../../modules/profileCss/myqna.module.scss";

export default function Myqna({
  questionData,
  answerData,
  adoptPost,
  onPageChange,
}) {
  const [content, setContent] = useState("question");
  const [currentPage, setCurrentPage] = useState(0);

  const handleClickButton = (value) => {
    setContent(value);
    setCurrentPage(0);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await onPageChange(page);
  };

  const selectComponent = {
    question: <Question data={questionData} />,
    answer: <Answer data={answerData} />,
  };

  useEffect(() => {

  }, [questionData, answerData])

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
      {/* 페이지네이션 */}
      <div className={styles.paginationContainer}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          이전
        </button>
        <span>{currentPage + 1}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}
        disabled={content === "question" ? !questionData.length : !answerData.length}>다음</button>
      </div>
    </>
  );
}
