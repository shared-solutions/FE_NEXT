"use client";
import { useState } from "react";
import styles from "@/app/modules/postListCss/postcategory.module.scss";

const PostCategory = () => {
  const categories = [
    "가장 핫한 🔥",
    "교육",
    "엔터테인먼트",
    "생활",
    "경제",
    "쇼핑",
    "기타",
  ];
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
  };

  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.categoryWrapper}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${styles.category} ${
              selectedCategory === index ? styles.selected : ""
            }`}
            onClick={() => handleCategoryClick(index)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCategory;
