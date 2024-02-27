"use client";
import styles from "@/app/modules/postListCss/generalVoteBox.module.scss";
import Image from "next/image";
import vote_check from "@/app/public/image/vote_check.png"
import voteDetailStore from "@/app/zustand/voteDetailStore";
const GeneralPostBox = ({ pollOption, postId }) => {
  // 옵션의 개수에 따라서 box의 height를 동적으로 계산
  const boxHeight = 170 + (pollOption.length - 2) * 50;
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

  // 해당 옵션에 대한 전체 후보 퍼센트 가져오기
  const optionPercentage = allCandidatePercent && allCandidatePercent[index] ? allCandidatePercent[index] : 0;

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
                border: (topCandidate || [])[0]?.optionId === option.optionId ? "2px solid black" : "none",
                borderRadius: '9px'
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
                      {/* 사용자 투표 O -> 체크표시, 투표한 항목 퍼센티지 */}
                      <Image src={vote_check} alt="vote_check" /> 
                      <div className={styles.userVotePercent}>
                        {userVotePercent}%
                      </div>
                    </div>
                  )}

                  {/* 최상위 항목 퍼센티지 */}
                  {/* {(topCandidate || [])[0]?.optionId === option.optionId && (
                    <div className={styles.optionInfo}>
                      <span className={styles.topCandidatePercent}>
                        {topCandidatePercent}%
                      </span>
                    </div>
                  )} */}

                    {/* 마감 전 -> allCandidatePercent 볼 수 있도록 변경한다면 아래 코드로! */}
                    {/* <div className={styles.optionPercentage}>
                      {`${optionPercentage}%`}
                    </div> */}

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
