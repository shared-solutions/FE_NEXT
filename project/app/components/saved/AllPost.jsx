"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../modules/savedCss/allpost.module.scss";
import Post from "../../components/saved/Post";
const savedPost = {
  results: [
    {
      id: "1",
      day: "6",
      header: "가위바위보 할 때 어떤 게 승률이 젤 높나요?",
      text: "내일 중요한 가위바위보 경기가 있습니다. 추천해주세요.",
      like: "24",
      comment: "11",
    },
    {
      id: "2",
      day: "8",
      header: "배고프네요 뭐 먹을까요?",
      text: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ",
      like: "24",
      comment: "18",
    },
    {
      id: "1",
      day: "3",
      header: "햄버거가 먹고 싶은데.....",
      text: "빅맥이랑 상하이버거 중에 뭘 먹을까요?",
      like: "13",
      comment: "35",
    },
    {
      id: "4",
      day: "7",
      header: "노래 추천해주세요 여러분들~",
      text: "그냥 댓글로 아무나 좀 남겨주세요~",
      like: "13",
      comment: "16",
    },
  ],
};
export default function AllPost() {
  const [sortBy, setSortBy] = useState("like");

  const sortedResults = savedPost.results.slice().sort((a, b) => {
    if (sortBy === "like") {
      return parseInt(b.like) - parseInt(a.like);
    } else if (sortBy === "day") {
      return parseInt(a.day) - parseInt(b.day);
    }
    return 0;
  });

  return (
    <>
      <div className={styles.container}>
        <motion.button
          className={`${styles.select_button} ${
            sortBy === "like" ? "" : styles.disabled
          }`}
          onClick={() => setSortBy("like")}
          whileTap={{
            scale: 0.5,
            opacity: 0.6,
          }}
        >
          조회순
        </motion.button>
        <motion.button
          className={`${styles.select_button} ${
            sortBy === "day" ? "" : styles.disabled
          }`}
          onClick={() => setSortBy("day")}
          whileTap={{
            scale: 0.5,
            opacity: 0.6,
          }}
        >
          최신순
        </motion.button>
      </div>
      <div className={styles.post_container}>
        {sortedResults.map((post) => {
          return (
            <Post
              key={post.id}
              day={post.day}
              header={post.header}
              text={post.text}
              like_num={post.like}
              comment_num={post.comment}
            />
          );
        })}
      </div>
    </>
  );
}
