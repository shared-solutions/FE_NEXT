"use client";
import axios from "axios";
import ReviewDetail from "@/app/components/reviewdetail/ReviewDetail";
import styles from "@/app/modules/viewdetailCss/viewdetail.module.scss";
import { useState, useEffect } from "react";
import { voteDetailStore } from "@/app/zustand/voteDetailStore";

export default function Viewdetail({ params }) {
  const voteDetail = voteDetailStore(); // 투표글 데이터 저장
  const postId = params.id;

  const [detail, setDetail] = useState({});
  const [postData, setPostData] = useState({});
  const [pollContent, setPollContent] = useState({});
  const [parentData, setParentData] = useState({});
  const [pollOption, setPollOption] = useState([]);
  const [gauge, setGauge] = useState("");
  //const [parentDetail, setParentDetail] = useState({}); // 투표글 데이터 저장

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

  const getParentData = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const url = `https://dev.gomin-chingu.site/posts/${postData.postId}`; // API 엔드포인트 URL로 교체
      const response = await axios.get(url, {
        headers: {
          atk: authToken,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("투표 원글", data);
        setParentData(data.result);
        voteDetail.setAllCandidatePercent(data.result.allCandidatePercent);
        voteDetail.setTopCandidatePercent(data.result.topCandidatePercent);
        voteDetail.setTopCandidate(data.result.topCandidate);
        voteDetail.setTopVoteResult(data.result.topVoteResult);
        voteDetail.setUserVote(data.result.userVote);
        voteDetail.setUserVotePercent(data.result.userVotePercent);
        voteDetail.setUserVoteResult(data.result.userVoteResult);
        voteDetail.setPollOption(data.result.pollOption);
        voteDetail.setTotalGauge(data.result.totalGauge);
        voteDetail.setUserGauge(data.result.userGauge);
        voteDetail.setIsVoted(data.result.isVoted);
        voteDetail.setOnGoing(data.result.onGoing);
        //console.log("votedDetail", voteDetail);
      } else {
        console.error("Failed to get data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  console.log("원래투표id", detail.title);
  useEffect(() => {
    getData();
    getParentData();
  }, [postId, postData.postId]);

  return (
    <div className={styles.lay}>
      <ReviewDetail
        key={postId}
        detail={detail}
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
      />
    </div>
  );
}
