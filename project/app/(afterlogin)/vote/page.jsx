"use client";
import { voteData, voteData2, voteData3 } from "@/app/DATA/dummyData";
import styles from "@/app/modules/postListCss/voteList.module.scss";
import AllPageBox from "@/app/components/hot/AllPageBox";
import Link from "next/link";
import { useState, useEffect } from "react";
import PostCategory from "@/app/components/postlist/PostCategory";

const PostList = () => {
  const [data, setData] = useState(voteData);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategoryChange = (index) => {
    setSelectedCategory(index);
  };

  useEffect(() => {
    switch (selectedCategory) {
      case 0:
        setData(voteData);
        break;
      case 1:
        setData(voteData2);
        break;
      case 2:
        setData(voteData3);
        break;
      default:
        setData(voteData);
    }
  }, [selectedCategory]);

  return (
    <div className={styles.cover}>
      <PostCategory
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {data.map((vote, index) => (
        <Link
          className={styles.link}
          key={index}
          href={`/viewdetail/${vote.reviewId}`}
        >
          <AllPageBox
            userimg={vote.userimg}
            nickname={vote.nickname}
            title={vote.title}
            content={vote.content}
            selectImgList={vote.selectImgList}
          />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
