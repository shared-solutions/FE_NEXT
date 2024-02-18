"use client";
import Header from "@/app/components/reviews/Header";
import ReviewBox from "@/app/components/reviews/ReviewBox";
import WriteButton from "@/app/components/reviews/WriteButton";
import axios from "axios";
import styles from "@/app/modules/reviewCss/review.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import deuserimg from "@/app/public/image/defaultUserImg.png";
import Link from "next/link";

export default function Review() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(false); // 데이터를 불러오는 중인지 여부
  const [state, setState] = useState("");

  const getData = async () => {
    try {
      const authToken = localStorage.getItem("token");
      setLoading(true); // 데이터를 불러오는 중임을 표시
      let url;

      if (state === "최신순") {
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
        if (page === 0) {
          // 페이지가 0이면 새로운 데이터로 대체
          setUserData(data.result.reviewPostList);
        } else {
          // 페이지가 0이 아니면 기존 데이터에 새로운 데이터를 추가
          setUserData((prevData) => [
            ...prevData,
            ...data.result.reviewPostList,
          ]);
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
  }, [page]);
  useEffect(() => {
    const handleScroll = () => {
      if (!loading) {
        // 로딩 중이 아닐 때만 스크롤 이벤트 핸들러를 실행
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          // userData의 길이가 0이 아니고 loading이 false일 때만 데이터를 가져옴
          if (userData.length > 0 && !loading) {
            setPage((prevPage) => prevPage + 1);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [userData, loading]);

  const handleButtonClick = (clickedValue) => {
    console.log(`Clicked: ${clickedValue}`);
    setState(clickedValue);
  };

  const renderPostBox = (userDataItem, index) => {
    const {
      nickname,
      title,
      content,
      uploadDate,
      like,
      comment,
      reviewPic,
      userImg,
      postId,
    } = userDataItem;

    const reviewProps = {
      nickname: nickname || "",
      date: uploadDate || "",
      title: title || "",
      content: content || "",
      like: like || "",
      comment: comment || "",
      userImg: userImg || deuserimg,
    };

    return (
      <div key={index}>
        <Link
          className={styles.link}
          key={index}
          href={`/viewdetail/${postId}`}
        >
          <ReviewBox {...reviewProps} />
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Header onButtonClick={handleButtonClick} />
      <div className={styles.scrollable_container}>
        {userData.map(renderPostBox)}
        {loading && <div>Loading...</div>} {/* 로딩 중인 경우 표시될 내용 */}
      </div>
      <WriteButton />
    </div>
  );
}
