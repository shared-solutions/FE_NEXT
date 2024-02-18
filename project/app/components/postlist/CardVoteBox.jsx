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
                        {userVote?.[0]?.optionId === topCandidate?.[0]?.optionId ? "" : userVotePercent + "%"}
                      </span>
                      <Image src={vote_check} alt="vote_check" style={{position: "absolute", right: "12%", top:"7.8%"}} /> 
                    </div>
                  )}
                {topCandidate?.[0]?.optionId === option.optionId && (
                  <div className={styles.optionInfo}>
                    <span className={styles.topCandidatePercent}>
                      {onGoing ? topCandidatePercent + "%" : ""}
                    </span>
                  </div>
                )}
                <div className={styles.optionResult}>
                    {/*topCandidate.optionString === option.optionString ? {topVoteResult} + "명 선택" : ""*/}
                  </div>
                  {!onGoing && (
                    // 추가: 투표 마감 후 + 사용자 투표 O일 때 결과 표시
                    <div className={styles.optionPercentage}>{allCandidatePercent[index]}%</div>
                  )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardVoteBox;
