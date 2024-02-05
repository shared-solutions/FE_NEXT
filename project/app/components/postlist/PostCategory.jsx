// postcategory.js
import styles from "@/app/modules/postListCss/postcategory.module.scss";

const PostCategory = () => {
  // 가상의 카테고리 데이터 배열
  const categories = ["가장 핫한", "교육", "엔터테인먼트", "생활", "경제"];

  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.categoryWrapper}>
        {categories.map((category, index) => (
          <div key={index} className={styles.category}>
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCategory;
