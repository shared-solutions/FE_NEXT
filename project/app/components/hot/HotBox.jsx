import styles from "@/app/modules/hotCss/hotbox.module.scss";
import hotimg from "@/app/public/image/hotback.png";
import gaugeImg from "@/app/public/image/gauge_img.png";
import Image from "next/image";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import { calculateTimeDifference } from "../comment/CommentSort";
import total from "@/app/public/image/total.png";
import { useState } from "react";
import { useEffect } from "react";
import check from "@/app/public/image/vote_check.png";

export const GeneralBox = ({
  image,
  title,
  content,
  candidateList,
  like,
  comment_cnt,
  date,
  allCandidatePercent,
  userVote,
}) => {

  console.log(userVote);

  return (
    <div className={styles.mainbox}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.date}>{calculateTimeDifference(date)}</div>

      <div className={styles.options}>
        {candidateList &&
          candidateList.map((option, index) => (
            <div key={index} className={styles.option}>
              {option.optionImgUrl && (
                <Image
                  src={option.optionImgUrl}
                  alt={`선택지 ${index + 1}`}
                  width={35}
                  height={35}
                />
              )}
              <div className={styles.optionStringBox}>
              <div className={styles.optionString}>
                  {option.optionString}
                  {userVote &&
                  userVote.some(
                    (userVoteItem) => userVoteItem.optionId === option.optionId
                  ) ? (
                    <Image src={check} alt="체크" width={15} height={15} />
                  ) : null}
                </div>

                <div className={styles.optionPercentage}>
                  {allCandidatePercent[index]}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.like}>
          <Image src={likeimg} alt="좋아요" width={15} height={13} /> {like}
        </div>
        <div className={styles.comment}>
          <Image src={commentimg} alt="댓글" width={15} height={13} />{" "}
          {comment_cnt}
        </div>
      </div>
    </div>
  );
};

export const GaugeBox = ({
  title,
  content,
  like,
  comment_cnt,
  date,
  totalGauge,
  userGauge,
}) => {
  // 유저값
  let GaugeValue;
  let usergaugeValue;
  if (userGauge === 0) {
    GaugeValue = totalGauge;
  } else {
    usergaugeValue = userGauge;
    GaugeValue = totalGauge;
  }
  // const usergaugeValue = 30;
  // // 평균값
  // const GaugeValue = 60;

  const usergaugeValuePercent = GaugeValue + "%";
  const gaugeValuePercent = usergaugeValue + "%";

  const gradientStyle = {
    background: `linear-gradient(to right, black ${gaugeValuePercent}, #eeeeee ${gaugeValuePercent})`,
  };

  const leftMargin = `calc(${usergaugeValuePercent} - 25px)`;
  const leftUserMargin = `calc(${gaugeValuePercent} - 25px)`;
  leftMargin;
  const userGaugeStyle = {
    left: leftUserMargin,
  };

  const gaugeImageStyle = {
    left: leftMargin,
  };

  return (
    <>
      <div className={styles.mainbox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.date}>{calculateTimeDifference(date)}</div>

        <div className={styles.gaugeContainer}>
          <div className={styles.gaugeImageContainer} style={userGaugeStyle}>
            <Image
              src={gaugeImg}
              alt="유저 게이지 이미지"
              width={50}
              height={50}
            />
          </div>
          <div className={styles.gaugeImageContainer} style={gaugeImageStyle}>
          {userGauge ? (
              <>
                <Image src={total} alt="이미지" width={15} height={15} style={{ marginBottom: '8px'}}/>
                <div>평균</div>
              </>
            ) : null}
          </div>
          <div className={styles.pollTitleContainer} style={gradientStyle}>
            {/* <div className={styles.pollTitle}>{pollTitle}</div> */}
            {/* 퍼센티지 하드코딩 수정해야 함 */}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.like}>
            <Image src={likeimg} alt="좋아요" width={15} height={13} /> {like}
          </div>
          <div className={styles.comment}>
            <Image src={commentimg} alt="댓글" width={15} height={13} />{" "}
            {comment_cnt}
          </div>
        </div>
      </div>
    </>
  );
};

export const CardBox = ({
  title,
  content,
  image,
  like,
  comment_cnt,
  candidateList,
  date,
  userVote,
}) => {
  console.log(userVote);
  return (
    <>
      <div className={styles.mainbox}>
        <div className={styles.cardtitle}>{title}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.date}>{calculateTimeDifference(date)}</div>

        <div className={styles.imgSlide}>
          {candidateList &&
            candidateList.map((option, index) => (
              <div key={index} className={styles.optionCard}>
                <span>
                  {option.optionString}
                  {userVote &&
                  userVote.some(
                    (userVoteItem) => userVoteItem.optionId === option.optionId
                  ) ? (
                    <Image src={check} alt="체크" width={15} height={15} />
                  ) : null}
                </span>
                {option.optionImgUrl && (
                  <Image
                    src={option.optionImgUrl}
                    alt={`선택지 ${index + 1}`}
                    width={80}
                    height={100}
                  />
                )}
              </div>
            ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.like}>
            <Image src={likeimg} alt="좋아요" width={15} height={13} /> {like}
          </div>
          <div className={styles.comment}>
            <Image src={commentimg} alt="댓글" width={15} height={13} />{" "}
            {comment_cnt}
          </div>
        </div>
      </div>
    </>
  );
};
