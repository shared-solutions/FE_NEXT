"use client";
import axios from "axios";
import Image from "next/image";
import vector from "@/app/public/image/arrow3.png";
import styles from "@/app/modules/hotCss/allpage.module.scss";
import AllPageBox from "./AllPageBox";
import { PageRendering } from "@/app/zustand/store";
import { useState, useEffect } from "react";
import GeneralPostBox from "../postlist/GeneralPostBox";
import CardPostBox from "../postlist/CardPostBox";
import GaugePostBox from "../postlist/GaugePostBox";
import defaultUserImg from "@/app/public/image/userimg.png";
import Link from "next/link";
const AllPage = () => {
  const backPage = PageRendering((state) => state.backPage);
  const title = PageRendering((state) => state.title);
  const img = PageRendering((state) => state.img);
  const [userData, setUserData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("모두");

  const [page, setPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(false); // 데이터를 불러오는 중인지 여부

  const authToken = localStorage.getItem("token");

  const getData = async () => {
    try {
      setLoading(true); // 데이터를 불러오는 중임을 표시
      const url = `https://dev.gomin-chingu.site/posts/best`;
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
          setUserData(data.result.content);
        } else {
          // 페이지가 0이 아니면 기존 데이터에 새로운 데이터를 추가
          setUserData((prevData) => [...prevData, ...data.result.content]);
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

  // 스크롤 이벤트를 감지하여 새로운 데이터를 불러옴
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
      gauge,
    } = userDataItem;

    // 기본값 설정
    const defaultPostProps = {
      userimg: userImg || defaultUserImg,
      nickname: nickname || "",
      title: title || "",
      content: content || "",
      pollOption: pollOption || [],
      like: like || 0,
      comment: comment || 0,
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
      {userData.map(renderPostBox)}
      {loading && <div>Loading...</div>} {/* 로딩 중인 경우 표시될 내용 */}
    </div>
  );
};

export default AllPage;
