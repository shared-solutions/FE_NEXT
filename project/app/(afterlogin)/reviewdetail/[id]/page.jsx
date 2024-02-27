"use client";
import axios from "axios";
import ReviewDetail from "@/app/components/reviewdetail/ReviewDetail";
import styles from "@/app/modules/viewdetailCss/viewdetail.module.scss";
import { useState, useEffect } from "react";
//import { voteDetailStore } from "@/app/zustand/voteDetailStore";

export default function Viewdetail({ params }) {
  //const voteDetail = voteDetailStore();
  const postId = params.id;

  const [detail, setDetail] = useState({});
  const [postData, setPostData] = useState({});
  const [pollContent, setPollContent] = useState({});
  const [pollOption, setPollOption] = useState([]);
  const [gauge, setGauge] = useState("");

  const getData = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const url = `https://dev.gomin-chingu.site/posts/${postId}`; // API 엔드포인트 URL로 교체
      const response = await axios.get(url, {
        headers: {
          atk: authToken,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("Detail data:", data);
        console.log("Post data", data.result.parentPost);
        setDetail(data.result);
        setPostData(data.result.parentPost);
        setPollContent(data.result.parentPost.pollContent ?? null);
        setPollOption(data.result.parentPost.pollOption ?? null);
        setGauge(data.result.parentPost.gauge ?? null);
      } else {
        console.error("Failed to get data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getData();
  }, [postId]);

  return (
    <div className={styles.lay}>
      <ReviewDetail
        key={postId}
        username={detail.nickname}
        userImg={detail.userImg}
        date={detail.createdAt}
        title={detail.title}
        content={detail.content}
        viewCount={detail.view}
        likeCount={detail.like}
        isLike={detail.isLike}
        commentCount={detail.comment}
        postData={postData}
        postId={postId}
        pollContent={pollContent}
        pollOption={pollOption}
        gauge={gauge}
      />
    </div>
  );
}
