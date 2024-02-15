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
  useEffect(() => {
    const handleScroll = () => {
      if (!loading) {
        // 로딩 중이 아닐 때만 스크롤 이벤트 핸들러를 실행
        if (
          window.innerWidth + window.scrollX ===
          document.documentElement.scrollWidth
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
    } = userDataItem;

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
          <Link key={index} href={`/viewdetail/${postId}`}>
            {postVoteType === "GENERAL" ? (
              <HotBox1 {...generalProps} />
            ) : postVoteType === "CARD" ? (
              <HotBox2 {...cardProps} />
            ) : postVoteType === "GAUGE" ? (
              <HotBox3 {...gaugeProps} gauge={gauge || 0} />
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

      <div className={styles.boxlay}>
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
