"use client";
import Header from "@/app/components/reviews/Header";
import ReviewBox from "@/app/components/reviews/ReviewBox";
import WriteButton from "@/app/components/reviews/WriteButton";
import axios from "axios";
import styles from "@/app/modules/reviewCss/review.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import deuserimg from "@/app/public/image/defaultUserImg.png";
import Link from "next/link";

export default function Review() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(false); // 데이터를 불러오는 중인지 여부
  const [sortBy, setSortBy] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  const getData = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("token");
      setLoading(true); // 데이터를 불러오는 중임을 표시
      let url;

      if (sortBy === 1) {
        url = "https://dev.gomin-chingu.site/posts/review-post?arrange=1";
      } else {
        url = "https://dev.gomin-chingu.site/posts/review-post?arrange=0";
      }

      const params = {
        page: page,
        size: 7,
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
        if (data.result.reviewPostList.length === 0) {
          setHasMoreData(false);
        } else {
          // 가져올 데이터가 더 있으면 기존 데이터에 새로운 데이터를 추가
          setUserData((prevData) => [
            ...prevData,
            ...data.result.reviewPostList,
          ]);
          setPage((prevPage) => prevPage + 1);
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
  }, [sortBy, page]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.scrollHeight;

    if (scrollY + windowHeight >= bodyHeight - 200 && hasMoreData) {
      getData();
    }
  }, [getData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleButtonClick = (sortOption) => {
    setSortBy(sortOption);
    setPage(0); // 페이지 리셋
    setUserData([]); // 데이터 초기화
  };

  const renderPostBox = (userDataItem, index) => {
    const {
      nickname,
      title,
      content,
      uploadDate,
      like,
      comment,
      userImg,
      postId,
    } = userDataItem;

    const reviewProps = {
      nickname: nickname || "",
      date: uploadDate || "",
      title: title || "",
      content: content || "",
      like: like || "0",
      comment: comment || "0",
      userImg: userImg || deuserimg,
    };

    return (
      <div key={index}>
        <Link
          className={styles.link}
          key={index}
          href={`/reviewdetail/${postId}`}
        >
          <ReviewBox {...reviewProps} />
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Header onButtonClick={handleButtonClick} sortBy={sortBy} />
      <div className={styles.scrollable_container}>
        {userData.map(renderPostBox)}
        {loading && <div>Loading...</div>} {/* 로딩 중인 경우 표시될 내용 */}
      </div>
      <WriteButton />
    </div>
  );
}
