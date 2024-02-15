"use client";
import axios from "axios";
import Image from "next/image";
import vector from "@/app/public/image/arrow3.png";
import styles from "@/app/modules/hotCss/allpage.module.scss";
import AllPageBox from "./AllPageBox";
import { PageRendering } from "@/app/zustand/store";
import { useState, useEffect } from "react";
import defaultUserImg from "@/app/public/image/userimg.png";
import Link from "next/link";
import GeneralP from "../postlist/GeneralP";
import CardP from "../postlist/CardP";
import GaugeP from "../postlist/GaugeP";
const AllPage = () => {
  const backPage = PageRendering((state) => state.backPage);
  const titlelogo = PageRendering((state) => state.title);
  const img = PageRendering((state) => state.img);
  const [userData, setUserData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("모두");

  const [page, setPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(false); // 데이터를 불러오는 중인지 여부

  const authToken = localStorage.getItem("token");

  const getData = async () => {
    try {
      setLoading(true); // 데이터를 불러오는 중임을 표시
      let url;

      if (titlelogo === "지금 가장 핫한 고민투표") {
        url = "https://dev.gomin-chingu.site/posts/best";
      } else {
        url = "https://dev.gomin-chingu.site/posts/recent";
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
      user,
      title,
      content,
      like,
      gauge,
      candidateList,
      comment_cnt,
      file,
    } = userDataItem;

    // 기본값 설정
    // const defaultPostProps = {
    //   userimg: user.image || defaultUserImg,
    //   nickname: user.nickname || "",
    //   title: title || "",
    //   content: content || "",
    //   pollOption: candidateList || [],
    //   like: like || 0,
    //   comment: comment_cnt || 0,
    // };

    const generalProps = {
      userimg: user.image || defaultUserImg,
      nickname: user.nickname || "",
      title: title || "",
      content: content || "",
      candidateList: candidateList || [],
      like: like || 0,
      comment_cnt: comment_cnt || 0,
      file: file || [],
    };

    const cardProps = {
      userimg: user.image || defaultUserImg,
      nickname: user.nickname || "",
      title: title || "",
      content: content || "",
      candidateList: candidateList || [],
      like: like || 0,
      comment_cnt: comment_cnt || 0,
      file: file || [],
    };

    const gaugeProps = {
      userimg: user.image || defaultUserImg,
      nickname: user.nickname || "",
      title: title || "",
      content: content || "",
      like: like || 0,
      comment_cnt: comment_cnt || 0,
      file: file || [],
    };

    return (
      <>
        <div key={index}>
          <Link
            className={styles.link}
            key={index}
            href={`/viewdetail/${postId}`}
          >
            {postVoteType === "GENERAL" ? (
              <GeneralP {...generalProps} />
            ) : postVoteType === "CARD" ? (
              <CardP {...cardProps} />
            ) : postVoteType === "GAUGE" ? (
              <GaugeP {...gaugeProps} gauge={gauge || 0} />
            ) : null}
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
      <Image
        src={vector}
        style={{ marginTop: "10px" }}
        onClick={backPage}
        alt="돌아가기"
        width={10}
        height={15}
      />
      <div className={styles.title}>{titlelogo}</div>
      <Image
        src={img}
        alt="이미지"
        className={styles.hotimg}
        width={23}
        height={23}
      />

      <div className={styles.cover}>
        {userData.map(renderPostBox)}
        {loading && <div>Loading...</div>} {/* 로딩 중인 경우 표시될 내용 */}
      </div>
    </>
  );
};

export default AllPage;
