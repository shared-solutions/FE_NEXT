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
import backimg from "@/app/public/image/Vector.png";
import Link from "next/link";
import good from "@/app/public/image/finger.png";
import { postLike } from "@/app/api/api/like";
import { deleteLike } from "@/app/api/api/like";

export default function Detail({
  userimg,
  username,
  date,
  time,
  title,
  content,
  minititle,
  point,
  lefttime,
  selectImgList,
  viewCount,
  likeCount,
  commentCount,
}) {
  const [setting, setSetting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);

    if (isLiked) {
      deleteLike();
    } else {
      postLike();
    }
  };

  return (
    <div className={styles.container}>
      {/* 추후에 경로 수정 필요 */}
      <Link href="/vote">
        <Image src={backimg} alt="back" width={5} height={10} />
      </Link>
      <div className={styles.userlay}>
        <Image
          className={styles.userimg}
          src={userimg}
          alt="유저 이미지"
          width={34}
          height={34}
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
        <div className={styles.date}>{date}</div>
        <div className={styles.line}> | </div>
        <div className={styles.time}>{time}</div>
      </div>

      <div className={styles.title}>{title}</div>

      <div className={styles.content}>{content}</div>

      <div className={styles.vote}>
        <div className={styles.minititle}>
          <div className={styles.mini}>{minititle}</div>
          <div className={styles.point}>투표하기</div>
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
          <div>마감 {lefttime}분전</div>
        </div>

        <div className={styles.imgSlide}>
          {selectImgList &&
            selectImgList.map((selectImg, index) => (
              <Image
                key={index}
                src={selectImg}
                alt={`선택지 ${index + 1}`}
                width={98}
                height={124}
              />
            ))}
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
            onClose={() => {
              setSetting(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
