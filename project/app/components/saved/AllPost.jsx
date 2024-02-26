"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getMyPost } from "@/app/api/user/profile/saved-post";
import styles from "../../modules/savedCss/allpost.module.scss";
import Post from "../../components/saved/Post";

export default function AllPost() {
  const [sortBy, setSortBy] = useState(0);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const result = await getMyPost(sortBy, page);
      if (result.length === 0) {
        setHasMoreData(false);
      } else {
        setUserData((prevData) => [...prevData, ...result]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [sortBy, page]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.scrollHeight;

    if (scrollY + windowHeight >= bodyHeight - 200 && hasMoreData) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const resetAndFetchData = (sortOption) => {
    setSortBy(sortOption);
    setPage(0); // 페이지 리셋
    setUserData([]); // 데이터 초기화
  };

  return (
    <>
      <div className={styles.container}>
        <motion.button
          className={`${styles.select_button} ${
            sortBy === 0 ? "" : styles.disabled
          }`}
          onClick={() => {
            resetAndFetchData(0);
          }}
          whileTap={{
            scale: 0.5,
            opacity: 0.6,
          }}
        >
          조회순
        </motion.button>
        <motion.button
          className={`${styles.select_button} ${
            sortBy === 1 ? "" : styles.disabled
          }`}
          onClick={() => {
            resetAndFetchData(1);
          }}
          whileTap={{
            scale: 0.5,
            opacity: 0.6,
          }}
        >
          최신순
        </motion.button>
      </div>
      <div className={styles.post_container}>
        {userData.map((post) => (
          <Link
            key={post.postId}
            href={`/viewdetail/${post.postId}`}
            style={{ textDecoration: "none", color: "black", margin: 0 }}
          >
            <Post
              key={post.postId}
              day={post.ago}
              header={post.title}
              text={post.content}
              like_num={post.postLike}
              comment_num={post.comment}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
