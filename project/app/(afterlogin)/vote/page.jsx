"use client";
import styles from "@/app/modules/postListCss/voteList.module.scss";
import AllPageBox from "@/app/components/hot/AllPageBox";
import Link from "next/link";
import { useState, useEffect } from "react";
import PostCategory from "@/app/components/postlist/PostCategory";
import axios from "axios";

const PostList = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [userData, setUserData] = useState([]);

  const handleCategoryChange = (index) => {
    setSelectedCategory(index);
  };

  // 데이터 가져오기
  const authToken = localStorage.getItem("token");
  const category = "생활"; // 카테고리 임의로 정함 <- 수정해야함

  const getData = async () => {
    try {
      const url = `https://dev.gomin-chingu.site/posts/poll-post/${category}`;
      const params = new URLSearchParams();
      params.append("page", "0");
      params.append("size", "3");
      params.append("category", "쇼핑");
  
      const response = await axios.get(url, {
        params: params,
        headers: {
          "Content-Type": "application/json",
          atk: authToken,
        },
      });
  
      if (response.status === 200) {
        const data = response.data;
        setUserData(data.result.pollPostList);
        console.log("글 전체보기 데이터:", data);
      } else {
        console.error("Failed to get data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  
  useEffect(() => {
    //handleLogin();
    getData();
  }, []);

  return (
    <div className={styles.cover}>
      <PostCategory
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {userData.map((userData, index) => (
        <Link
          className={styles.link}
          key={index}
          href={`/viewdetail/${userData.postId}`} // 글 상세보기로 이동
        >
          <AllPageBox
            // 프로필 이미지
            userimg={userData.userImg}
            nickname={userData.nickname}
            title={userData.title}
            content={userData.content}
            pollOption={userData.pollOption}
            like={userData.like}
            comment={userData.comment}
          />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
