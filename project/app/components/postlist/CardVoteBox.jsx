"use client";
import { useState } from "react";
import styles from "@/app/modules/voteDetailCss/cardVoteBox.module.scss";
import Image from "next/image";
import voteDetailStore from "@/app/zustand/voteDetailStore";
import useSelectVoteStore from "@/app/zustand/selectVote";
import vote_check from "@/app/public/image/vote_check.png";

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

  const handleOptionClick = (optionId) => {
    // Zustand 상태 업데이트
    updateSelectList(optionId);
  };

  const { updateSelectList } = useSelectVoteStore();
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.imgSlide}>
          {pollOption &&
            pollOption.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  topCandidate?.[0]?.optionId === option.optionId
                    ? styles.topCandidate
                    : ""
                }`}
                onClick={() => updateSelectList(option.optionId)}
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
                 {
                  userVote?.[0]?.optionId === option.optionId && (
                    <div className={styles.optionInfo}>
                      <span className={styles.userVotePercent}>
                        {userVotePercent}%
                      </span>
                      <Image src={vote_check} alt="vote_check" style={{position: "absolute", right: "12%", top:"7.8%"}} /> 
                    </div>
                  )}
                {topCandidate?.[0]?.optionId === option.optionId && (
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
