"use client";
import axios from "axios";
import Detail from "@/app/components/viewdetail/Detail";
import styles from "@/app/modules/viewdetailCss/viewdetail.module.scss";
import { detailData } from "@/app/DATA/dummyData";
import { useState, useEffect } from "react";
import { voteDetailStore } from "@/app/zustand/voteDetailStore";

export default function Viewdetail({ params }) {
  const voteDetail = voteDetailStore();
  const postId = params.id;

  const [detail, setDetail] = useState({});
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
        setDetail(data.result);
        voteDetail.setAllCandidatePercent(data.result.allCandidatePercent);
        voteDetail.setAllCandidateResult(data.result.allCandidateResult);
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

  useEffect(() => {
    getData();
  }, [postId]);

  return (
    <div>
      
      <Detail
        key={postId}
        username={detail.nickname}
        userImg={detail.userImg}
        date={detail.createdAt}
        deadline={detail.deadline}
        title={detail.title}
        content={detail.content}
        pollTitle={detail.pollTitle}
        point={detail.point}
        postVoteType={detail.postVoteType}
        viewCount={detail.view}
        likeCount={detail.like}
        commentCount={detail.comment}
        postId={postId}
        isLike={detail.isLike}
        myPost={detail.myPost}
      />
    </div>
  );
}
