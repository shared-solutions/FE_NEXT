"use client";
import styles from "@/app/modules/postListCss/generalPostBox.module.scss";
import Image from "next/image";
import vote_check from "@/app/public/image/vote_check.png"
import voteDetailStore from "@/app/zustand/voteDetailStore";
const GeneralPostBox = ({ pollOption, postId }) => {
  // 옵션의 개수에 따라서 box의 height를 동적으로 계산
  const boxHeight = 270 + (pollOption.length - 2) * 50;
  const {
    allCandidatePercent,
    topCandidatePercent,
    topCandidate,
    userVote,
    userVotePercent,
    isVoted,
    onGoing,
    topVoteResult
  } = voteDetailStore();
  return (
    <div className={`${styles.box}`} style={{ height: `${boxHeight}px` }}>
      <div className={styles.container}>
        <div className={styles.options}>
          {pollOption && 
            pollOption.map((option, index) => (
              <div key={index} className={`${styles.option} ${
                (topCandidate || [])[0]?.optionId === option.optionId
                  ? styles.topCandidate
                  : ""
              }`}
              style={{
                // 조건이 true일 때 테두리 스타일을 추가
                border: (topCandidate || [])[0]?.optionId === option.optionId ? "2px solid black" : "none"
              }}
            >
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
                  </div>
                  {userVote &&
                  userVote[0]?.optionId === option.optionId && (
                    <div className={styles.optionInfo}>
                      <Image src={vote_check} alt="vote_check" style={{position: "absolute", right: "12%", top:"5%"}} /> 
                      <span className={styles.userVotePercent}>
                        {userVotePercent}%
                      </span>
                    </div>
                  )}
                {(topCandidate || [])[0]?.optionId === option.optionId && (
                  <div className={styles.optionInfo}>
                    <span className={styles.topCandidatePercent}>
                      {topCandidatePercent}%
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralPostBox;
