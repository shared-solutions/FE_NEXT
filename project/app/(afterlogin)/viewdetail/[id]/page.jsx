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
        voteDetail.setTopCandidatePercent(data.result.topCandidatePercent);
        voteDetail.setTopCandidate(data.result.topCandidate);
        voteDetail.setUserVote(data.result.userVote);
        voteDetail.setUserVotePercent(data.result.userVotePercent);
        voteDetail.setIsVoted(data.result.isVoted);
        voteDetail.setOnGoing(data.result.onGoing);
        voteDetail.setTopVoteResult(data.result.topVoteResult);
        console.log(voteDetail);
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
      {/*{detailData.map((detail, index) => (
        <Detail
          key={index}
          userimg={detail.userimg}
          username={detail.username}
          date={detail.date}
          time={detail.time}
          title={detail.title}
          content={detail.content}
          minititle={detail.minititle}
          point={detail.point}
          lefttime={detail.lefttime}
          selectImgList={detail.selectImgList}
          viewCount={detail.viewCount}
          likeCount={detail.likeCount}
          commentCount={detail.commentCount}
        />
      ))}*/}
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
        pollOption={detail.pollOption}
        gauge={detail.userGauge}
        postId={postId}
        topCandidate={detail.topCandidate}
        topCandidatePercent={detail.topCandidatePercent}
        userVote={detail.userVote}
        userVotePercent={detail.userVotePercent}
        onGoing={detail.onGoing}
      />
    </div>
  );
}
