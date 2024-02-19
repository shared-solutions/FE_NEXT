"use client";
import { useState } from "react";
import styles from "@/app/modules/postListCss/postcategory.module.scss";

const PostCategory = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    "가장 핫한 🔥",
    "교육",
    "엔터테인먼트",
    "생활",
    "경제",
    "쇼핑",
    "기타",
  ];

  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.categoryWrapper}>
        <div className={styles.categoryInner}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${styles.category} ${
                selectedCategory === category ? styles.selected : ""
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCategory;
