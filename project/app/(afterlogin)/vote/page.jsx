"use client";
import styles from "@/app/modules/postListCss/voteList.module.scss";
import AllPageBox from "@/app/components/hot/AllPageBox";
import Link from "next/link";
import { useState, useEffect } from "react";
import PostCategory from "@/app/components/postlist/PostCategory";
import axios from "axios";
import GeneralPostBox from '@/app/components/postlist/GeneralPostBox';
import CardPostBox from '@/app/components/postlist/CardPostBox';
import GaugePostBox from '@/app/components/postlist/GaugePostBox';
import Image from "next/image";

import defaultUserImg from "@/app/public/image/userimg.png";

const PostList = () => {
  const [selectedCategory, setSelectedCategory] = useState("모두");
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(false); // 데이터를 불러오는 중인지 여부

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(0); // 카테고리가 변경될 때마다 페이지 리셋
  };

  const authToken = localStorage.getItem("token");

  const getData = async () => {
    try {
      setLoading(true); // 데이터를 불러오는 중임을 표시
      const url = `https://dev.gomin-chingu.site/posts/poll-post/${selectedCategory}`;
      const params = {
        page: page,
        size: 7,
        category: selectedCategory,
      };
  
      const response = await axios.get(url, {
        params: params,
        headers: {
          "Content-Type": "application/json",
          atk: authToken,
        },
      });
  
      if (response.status === 200) {
        const data = response.data;
        if (page === 0) {
          // 페이지가 0이면 새로운 데이터로 대체
          setUserData(data.result.pollPostList);
        } else {
          // 페이지가 0이 아니면 기존 데이터에 새로운 데이터를 추가
          setUserData(prevData => [...prevData, ...data.result.pollPostList]);
        }
        console.log("글 전체보기 데이터:", data);
      } else {
        console.error("Failed to get data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false); // 데이터 불러오기가 완료되면 로딩 플래그를 해제
    }
  };
  
  useEffect(() => {
    getData();
  }, [selectedCategory, page]);

  // 스크롤 이벤트를 감지하여 새로운 데이터를 불러옴
  useEffect(() => {
    const handleScroll = () => {
      if (!loading) { // 로딩 중이 아닐 때만 스크롤 이벤트 핸들러를 실행
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          // userData의 길이가 0이 아니고 loading이 false일 때만 데이터를 가져옴
          if (userData.length > 0 && !loading) {
            setPage(prevPage => prevPage + 1);
          }
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [userData, loading]);

  const renderPostBox = (userDataItem, index) => {
    const {
      postId,
      postVoteType,
      userImg,
      nickname,
      title,
      content,
      pollOption,
      like,
      comment,
      pollTitle,
      gauge
    } = userDataItem;

    // 기본값 설정
    const defaultPostProps = {
      userimg: userImg || defaultUserImg,
      nickname: nickname || "",
      title: title || "",
      content: content || "",
      pollOption: pollOption || [],
      like: like || 0,
      comment: comment || 0
    };

    return (
      <div key={index}>
        <Link
          className={styles.link}
          key={index}
          href={`/viewdetail/${postId}`}
        >
          {postVoteType === "GENERAL" ? (
            <GeneralPostBox {...defaultPostProps} />
          ) : postVoteType === "CARD" ? (
            <CardPostBox {...defaultPostProps} />
          ) : postVoteType === "GAUGE" ? (
            <GaugePostBox
              {...defaultPostProps}
              pollTitle={pollTitle || ""}
              gauge={gauge || 0}
            />
          ) : null}
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.cover}>
      <PostCategory
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {userData.map(renderPostBox)}
      {loading && <div>Loading...</div>} {/* 로딩 중인 경우 표시될 내용 */}
    </div>
  );
};

export default PostList;