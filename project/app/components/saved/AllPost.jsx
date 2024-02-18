import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../../modules/savedCss/allpost.module.scss";
import Post from "../../components/saved/Post";

export default function AllPost() {
  const [sortBy, setSortBy] = useState(0);
  const [userData, setUserData] = useState([]);

  const handleLogin = async () => {
    try {
      const endpoint = "https://dev.gomin-chingu.site/user/login";
      const requestBody = {
        email: process.env.NEXT_PUBLIC_USER_EMAIL,
        password: process.env.NEXT_PUBLIC_USER_PASSWORD,
      };
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.result[0].token) {
        // 클라이언트 측에서만 localStorage에 접근
        if (typeof window !== "undefined") {
          localStorage.setItem("token", response.data.result[0].token);
        }
        console.log("로그인 성공");
      }
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
      console.log("로그인 실패");
    }
  };

  const atkToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const getMyPage = async () => {
    try {
      const page = 0;
      const sort = sortBy;

      const url = new URL(
        "https://dev.gomin-chingu.site/user/my-page/post/all"
      );
      url.searchParams.append("page", page);
      url.searchParams.append("sort", sort);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          atk: atkToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.result.postList);
        console.log("MyPage data:", data);
      } else {
        console.error("Failed to get MyPage data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    handleLogin();
    getMyPage();
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
