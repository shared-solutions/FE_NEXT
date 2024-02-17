"use client";
import styles from "@/app/modules/viewdetailCss/detail.module.scss";
import userimg from "@/app/public/image/userimg.png";
import moreimg from "@/app/public/image/moreimg.png";
import select1 from "@/app/public/image/select1.png";
import timerimg from "@/app/public/image/timer.png";
import countview from "@/app/public/image/countview.png";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import rerenderimg from "@/app/public/image/rerender.png";
import likeunclickimg from "@/app/public/image/likeunclick.png";
import chatclickimg from "@/app/public/image/chatclick.png";
import Image from "next/image";
import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { CommentSort } from "../comment/CommentSort";
import backimg from "@/app/public/image/arrow3.png";
import Link from "next/link";
import good from "@/app/public/image/finger.png";
import { postLike } from "@/app/api/api/like";
import { deleteLike } from "@/app/api/api/like";
import GeneralVoteBox from "@/app/components/postlist/GeneralVoteBox";
import CardVoteBox from "@/app/components/postlist/CardVoteBox";
import GaugeVoteBox from "@/app/components/postlist/GaugeVoteBox";
import defaultUserImg from "@/app/public/image/userimg.png";
import voteDetailStore from "@/app/zustand/voteDetailStore";
import useSelectVoteStore from "@/app/zustand/selectVote";

export default function Detail({
  userImg,
  username,
  date,
  time,
  title,
  content,
  minititle,
  point,
  selectImgList,
  viewCount,
  likeCount,
  commentCount,
  deadline,
  pollTitle,
  postVoteType,
  pollOption,
  gauge,
  postId,
}) {
  const [setting, setSetting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const {
    allCandidatePercent,
    topCandidatePercent,
    topCandidate,
    topVoteResult,
    userVote,
    userVotePercent,
    isVoted,
    onGoing,
  } = voteDetailStore();
  const defaultPostProps = {
    userimg: userImg || defaultUserImg,
    nickname: username || "",
    title: title || "",
    content: content || "",
    pollOption: pollOption || [],
    like: likeCount || 0,
    comment: commentCount || 0,
  };
  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);

    if (isLiked) {
      deleteLike();
    } else {
      postLike();
    }
  };
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const datePart = `${year}-${month}-${day}`;

  const timeePart = dateObject.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  let lefttime;
  const timeDifference = new Date(deadline) - new Date();
  let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutesDifference = Math.floor(timeDifference / (1000 * 60));
  if (daysDifference >= 1) {
    lefttime = daysDifference + "일";
  } else if (hoursDifference >= 1) {
    lefttime = hoursDifference + "시간";
  } else {
    lefttime = minutesDifference + "분";
  }
  console.log(postVoteType);

  const { selectList } = useSelectVoteStore();
  const authToken = localStorage.getItem("token");
 
  // 투표하기 api selectedList 저장 필요
  const handleVote = async () => {
    try {
      const response = await fetch(
        `https://dev.gomin-chingu.site/posts/${postId}/generalVote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            atk: authToken,
          },
          body: JSON.stringify({
            selectList: selectList,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Voting success:", result);
      } else {
        console.error("Voting failed:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className={styles.container}>
      {/* 추후에 경로 수정 필요 */}
      <Link href="/vote">
        <Image src={backimg} alt="back" width={18} height={18} />
      </Link>
      <div className={styles.userlay}>
        <Image
          className={styles.userimg}
          src={userImg == null ? userimg : userImg}
          alt="유저 이미지"
          width={34}
          height={34}
          style={{ borderRadius: "50%" }}
        />
        <div className={styles.username}>{username}</div>
        <br />

        <div className={styles.morebtn}>
          <Image
            className={styles.rerender}
            src={rerenderimg}
            alt="렌더링"
            width={12}
            height={12}
          />
          <Image src={moreimg} alt="더보기" width={3} height={13} />
        </div>
      </div>
      <div className={styles.usertext}>
        <div className={styles.date}>{datePart}</div>
        <div className={styles.line}> | </div>
        <div className={styles.time}>{timeePart}</div>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>

      <div className={styles.vote}>
        <div className={styles.minititle}>
          <div className={styles.mini}>{pollTitle}</div>
          <div
            className={styles.point}
            disabled={timeDifference <= 0}
            onClick={() => timeDifference > 0 && handleVote()}
          >
            투표하기
          </div>
        </div>
        <div className={styles.timer}>
          <div className={styles.pointnum}>채택 포인트: {point}</div>
          <div>|</div>
          <Image
            className={styles.timeimg}
            src={timerimg}
            alt="타이머 이미지"
            width={13}
            height={13}
          />
          <div>
            {timeDifference <= 0 ? "마감되었습니다" : `마감 ${lefttime}전`}
          </div>
        </div>

        <div className={styles.imgSlide}>
          {postVoteType === "GENERAL" ? (
            <GeneralVoteBox
              {...defaultPostProps}
              postId={postId}
              topCandidate={topCandidate}
              topCandidatePercent={topCandidatePercent}
              userVote={userVote}
              userVotePercent={userVotePercent}
              onGoing={onGoing}
              topVoteResult={topVoteResult}
            />
          ) : postVoteType === "CARD" ? (
            <CardVoteBox
              {...defaultPostProps}
              postId={postId}
              topCandidate={topCandidate}
              topCandidatePercent={topCandidatePercent}
              userVote={userVote}
              userVotePercent={userVotePercent}
              onGoing={onGoing}
            />
          ) : postVoteType === "GAUGE" ? (
            <GaugeVoteBox
              {...defaultPostProps}
              pollTitle={pollTitle || ""}
              gauge={gauge || 0}
              postId={postId}
              topCandidate={topCandidate}
              topCandidatePercent={topCandidatePercent}
              userVote={userVote}
              userVotePercent={userVotePercent}
              onGoing={onGoing}
            />
          ) : null}
          {/*pollOption &&
            pollOption.map((optionImgUrl, optionString, index) => (
              <>
                <Image
                  key={index}
                  src={optionImgUrl && optionImgUrl}
                  alt={`선택지 ${index + 1}`}
                  width={98}
                  height={124}
                />
                <p>{optionString}</p>
              </>
            ))*/}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.countview}>
          <Image
            className={styles.img}
            src={countview}
            alt="조회수"
            width={14}
            height={10}
          />
          {viewCount}
        </div>
        <div className={styles.like}>
          <Image
            className={styles.img}
            src={likeimg}
            alt="좋아요수"
            width={14}
            height={10}
          />
          {likeCount}
        </div>
        <div className={styles.comment}>
          <Image
            className={styles.img}
            src={commentimg}
            alt="댓글수"
            width={14}
            height={10}
          />
          {commentCount}
        </div>
      </div>

      <div className={styles.underlay}>
        <div key={isLiked ? "like" : "unlike"}>
          <Image
            src={isLiked ? good : likeunclickimg}
            alt={isLiked ? "좋아요누름" : "좋아요 취소"}
            width={37}
            height={35}
            onClick={handleLikeClick}
          />
        </div>
        <Image
          onClick={() => {
            setSetting(!setting);
            console.log("클릭");
          }}
          src={chatclickimg}
          alt="채팅 클릭"
          width={35}
          height={35}
        />
        {setting && (
          <CommentSort
            postId={postId}
            onClose={() => {
              setSetting(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
