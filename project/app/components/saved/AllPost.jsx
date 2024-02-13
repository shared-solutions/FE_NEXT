"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getMyPost } from "@/app/api/user/profile/saved-post";
import styles from "../../modules/savedCss/allpost.module.scss";
import Post from "../../components/saved/Post";

export default function AllPost() {
  const [sortBy, setSortBy] = useState(0);
  const [userData, setUserData] = useState([]);

  useEffect(() => {  
    const fetchData = async () => {
      try {
        const result =  await getMyPost(sortBy);
        setUserData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [sortBy]);

  return (
    <>
      <div className={styles.container}>
        <motion.button
          className={`${styles.select_button} ${
            sortBy === 0 ? "" : styles.disabled
          }`}
          onClick={() => setSortBy(0)}
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
          onClick={() => setSortBy(1)}
          whileTap={{
            scale: 0.5,
            opacity: 0.6,
          }}
        >
          최신순
        </motion.button>
      </div>
      <div className={styles.post_container}>
        {userData.map((post) => {
          return (
            <Post
              key={post.title}
              day={post.ago}
              header={post.title}
              text={post.content}
              like_num={post.postLike}
              comment_num={post.comment}
            />
          );
        })}
      </div>
    </>
  );
}
