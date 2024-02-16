"use client";
import styles from "@/app/modules/hotCss/hot.module.scss";
import hotimg from "../../public/image/hotimg.png";
import vectorimg from "../../public/image/Vector.png";
import Image from "next/image";
import HotBox from "./HotBox";
import { PageRendering } from "@/app/zustand/store";
import { hotData } from "@/app/DATA/dummyData";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { GeneralBox, GaugeBox, CardBox } from "./HotBox";

const Hot = () => {
  const changePage = PageRendering((state) => state.changePage);
  const [userData, setUserData] = useState([]);

  const [page, setPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(false); // 데이터를 불러오는 중인지 여부

  const authToken = localStorage.getItem("token");

  const getData = async () => {
    try {
      setLoading(true); // 데이터를 불러오는 중임을 표시
      let url = "https://dev.gomin-chingu.site/posts/best";

      const params = {
        page: page,
        size: 3,
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
  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;

    if (scrollLeft + clientWidth >= scrollWidth - 50) {
      if (userData.length > 0 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const renderBox = (userDataItem, index) => {
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
      created_at,
    } = userDataItem;

    const generalProps = {
      title: title || "",
      content: content || "",
      candidateList: candidateList || [],
      like: like || 0,
      comment_cnt: comment_cnt || 0,
      date: created_at || 0,
    };
    const cardProps = {
      title: title || "",
      content: content || "",
      // candidateList: candidateList || [],
      like: like || 0,
      comment_cnt: comment_cnt || 0,
      date: created_at || 0,
    };

    const gaugeProps = {
      title: title || "",
      content: content || "",
      like: like || 0,
      comment_cnt: comment_cnt || 0,
      date: created_at || 0,
    };

    // 여기 무한스크롤 데이터 받아와서 저렇게 포스트타입별로 allpage에 있는 로직처럼
    // 구현해야함
    return (
      <>
        <div key={index}>
          <Link
            className={styles.link}
            key={index}
            href={`/viewdetail/${postId}`}
          >
            {postVoteType === "GENERAL" ? (
              <GeneralBox {...generalProps} />
            ) : postVoteType === "CARD" ? (
              <CardBox {...cardProps} />
            ) : postVoteType === "GAUGE" ? (
              <GaugeBox {...gaugeProps} gauge={gauge || 0} />
            ) : null}
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
      {/* logo */}
      <div className={styles.title}>
        지금 가장 핫한 고민투표
        <Image
          src={hotimg}
          alt="핫한 고민투표 이미지"
          className={styles.hotimg}
          width={23}
          height={23}
        />
        <button className={styles.morebtn} onClick={changePage}>
          더보기 <Image src={vectorimg} alt="벡터" width={5} height={10} />
        </button>
      </div>

      <div className={styles.boxlay} onScroll={handleScroll}>
        {/* {hotData.map((hot, index) => (
          <HotBox
            key={index}
            image={hot.image}
            title={hot.title}
            content={hot.content}
          />
        ))} */}
        {userData.map(renderBox)}
        {loading && <div>loading</div>}
      </div>
    </>
  );
};

export default Hot;
