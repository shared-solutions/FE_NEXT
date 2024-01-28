import React, { useState } from "react";
import styles from "@/app/modules/inputCss/commentInput.module.scss";

const CommentInput = ({ onButtonClick }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    // 버튼 클릭 이벤트 처리
    onButtonClick(inputValue);
    // 입력값 초기화
    setInputValue("");
  };

  return (
    <div className={styles.inputlay}>
      <textarea
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="댓글을 입력해주세요"
        rows={1} // 원하는 초기 행 수를 설정하세요
      />
      <button className={styles.inputbtn} onClick={handleButtonClick}>
        입력
      </button>
    </div>
  );
};

export default CommentInput;
