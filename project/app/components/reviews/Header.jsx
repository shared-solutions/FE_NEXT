"use client";
import React, { useState } from "react";
import styles from "@/app/modules/reviewCss/button.module.scss";

const Header = ({ onButtonClick }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    onButtonClick(buttonName);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sorting_button_container}>
        <div
          onClick={() => handleButtonClick("조회순")}
          className={`${styles.button} ${
            selectedButton === "조회순" ? styles.selected : ""
          }`}
        >
          조회순
        </div>
        <div
          onClick={() => handleButtonClick("최신순")}
          className={`${styles.button} ${
            selectedButton === "최신순" ? styles.selected : ""
          }`}
        >
          최신순
        </div>
      </div>
    </div>
  );
};

export default Header;
