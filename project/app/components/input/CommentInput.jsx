import React, { useState } from "react";
import styles from "@/app/modules/inputCss/commentInput.module.scss";

export const CommentInput = ({ onButtonClick }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== "") {
      // 버튼 클릭 이벤트 처리
      onButtonClick(inputValue);
      // 입력값 초기화
      setInputValue("");
    }
  };

  return (
    <div className={styles.inputlay}>
      <textarea
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="댓글을 입력해주세요"
        rows={1}
      />
      <button
        className={`${styles.inputbtn} ${
          inputValue.trim() === "" ? styles.disabled : ""
        }`}
        onClick={handleButtonClick}
        disabled={inputValue.trim() === ""}
      >
        입력
      </button>
    </div>
  );
};

export const ReCommentInput = ({ onButtonClick }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== "") {
      // 버튼 클릭 이벤트 처리
      onButtonClick(inputValue);
      // 입력값 초기화
      setInputValue("");
    }
  };

  return (
    <div className={styles.inputlay}>
      <textarea
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="답글을 입력해주세요"
        //행수 설정
        rows={1}
      />
      <button
        className={`${styles.inputbtn} ${
          inputValue.trim() === "" ? styles.disabled : ""
        }`}
        onClick={handleButtonClick}
        disabled={inputValue.trim() === ""}
      >
        답글달기
      </button>
    </div>
  );
};

export default CommentInput;
