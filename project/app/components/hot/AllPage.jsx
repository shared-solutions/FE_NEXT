"use client";
import axios from "axios";
import Image from "next/image";
import vector from "@/app/public/image/Vector.png";
import styles from "@/app/modules/hotCss/allpage.module.scss";
import AllPageBox from "./AllPageBox";
import { PageRendering } from "@/app/zustand/store";
import { useState, useEffect } from "react";

const AllPage = () => {
  const backPage = PageRendering((state) => state.backPage);
  const title = PageRendering((state) => state.title);
  const img = PageRendering((state) => state.img);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(false); // 데이터를 불러오는 중인지 여부

  const authToken = localStorage.getItem("token");

  const getData = async () => {
    try {
      setLoading(true);
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
          setUserData(data.result.content);
        } else {
          setUserData((prevData) => [...prevData, ...data.result.content]);
        }
        console.log("글 전체보기 데이터:", data);
      } else {
        console.error("Failed to get data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (!loading) {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
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

  console.log(userData);

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
      <div className={styles.title}>
        {title}
        <Image
          src={img}
          alt="이미지"
          className={styles.hotimg}
          width={23}
          height={23}
        />
      </div>

      <div>
        {userData &&
          userData.length > 0 &&
          userData.map((data, index) => (
            <div key={index}>
              <AllPageBox
                userimg={data.user.image}
                nickname={data.user.nickname}
                title={data.title}
                content={data.content}
                // selectImgList={data.user.image}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default AllPage;
