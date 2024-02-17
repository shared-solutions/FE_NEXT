"use client";
import { useState } from "react";
import styles from "@/app/modules/voteDetailCss/cardVoteBox.module.scss";
import Image from "next/image";
import voteDetailStore from "@/app/zustand/voteDetailStore";

const CardVoteBox = ({ pollOption }) => {
  const {
    allCandidatePercent,
    topCandidatePercent,
    topCandidate,
    userVote,
    userVotePercent,
    isVoted,
    onGoing,
    topVoteResult,
  } = voteDetailStore();

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.imgSlide}>
          {pollOption &&
            pollOption.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  userVote && userVote[0]?.optionId === option.optionId
                    ? styles.userVoted
                    : ""
                } ${
                  topCandidate[0]?.optionId === option.optionId
                    ? styles.topCandidate
                    : ""
                }`}
              >
                <span>{option.optionString}</span>
                {option.optionImgUrl && (
                  <Image
                    src={option.optionImgUrl}
                    alt={`선택지 ${index + 1}`}
                    width={98}
                    height={124}
                  />
                )}
                 {userVote &&
                  userVote[0]?.optionId === option.optionId && (
                    <div className={styles.optionInfo}>
                      <span className={styles.userVotePercent}>
                        {userVotePercent}%
                      </span>
                    </div>
                  )}
                {topCandidate[0]?.optionId === option.optionId && (
                  <div className={styles.optionInfo}>
                    <span className={styles.topCandidatePercent}>
                      {topCandidatePercent}%
                    </span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardVoteBox;
