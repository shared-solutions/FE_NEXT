"use client";
import styles from "@/app/modules/postListCss/voteList.module.scss";
import AllPageBox from "@/app/components/hot/AllPageBox";
import Link from "next/link";
import { useState, useEffect } from "react";
import PostCategory from "@/app/components/postlist/PostCategory";
import axios from "axios";
import GeneralPostBox from '@/app/components/postlist/GeneralPostBox'; // 일반 게시물 컴포넌트
import CardPostBox from '@/app/components/postlist/CardPostBox'; // 카드 게시물 컴포넌트
import GaugePostBox from '@/app/components/postlist/GaugePostBox'; // 게이지 게시물 컴포넌트

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
      params.append("size", "5");
      params.append("category", "모두");
  
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
          {/* postVoteType에 따라 다른 컴포넌트를 렌더링 */}
          {userData.postVoteType === "GENERAL" && 
          <GeneralPostBox 
            userimg={userData.userImg}
            nickname={userData.nickname}
            title={userData.title}
            content={userData.content}
            pollOption={userData.pollOption}
            like={userData.like}
            comment={userData.comment} 
          />
          }
          {userData.postVoteType === "CARD" && 
          <CardPostBox 
            userimg={userData.userImg}
            nickname={userData.nickname}
            title={userData.title}
            content={userData.content}
            pollOption={userData.pollOption}
            like={userData.like}
            comment={userData.comment}  
          />
          }
          {userData.postVoteType === "GAUGE" &&
          <GaugePostBox
            userimg={userData.userImg}
            nickname={userData.nickname}
            title={userData.title}
            content={userData.content}
            like={userData.like}
            comment={userData.comment}
            pollTitle={userData.pollTitle}
          />
          }
        </Link>
      ))}
    </div>
  );
};

export default PostList;
