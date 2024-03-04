import styles from "@/app/modules/voteDetailCss/cardVoteBox.module.scss";
import Image from "next/image";
import voteDetailStore from "@/app/zustand/voteDetailStore";
import useSelectVoteStore from "@/app/zustand/selectVote";
import vote_check from "@/app/public/image/vote_check.png";
import { useState, useEffect } from "react";

const CardVoteBox = ({ pollOption }) => {
  const {
    allCandidatePercent,
    topCandidatePercent,
    topCandidate,
    topVoteResult,
    userVote,
    userVotePercent,
    userVoteResult,
    isVoted,
    onGoing,
  } = voteDetailStore();

  const { selectList, updateSelectList } = useSelectVoteStore();

  const [showAllCandidatePercent, setShowAllCandidatePercent] = useState(false);
  const [showTopVoteResult, setShowTopVoteResult] = useState(false);

  useEffect(() => {
    if (isVoted) {
      setShowAllCandidatePercent(true);
      setShowTopVoteResult(true);
    }
  }, [isVoted]);

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.imgSlide}>
          {pollOption &&
            pollOption.map((option, index) => {
              // topCandidate의 optionId 배열 생성
              const topCandidateIds = topCandidate.map(
                (candidate) => candidate.optionId
              );

              // pollOption의 optionId가 topCandidateIds에 포함되어 있는지 확인
              const isTopCandidate = topCandidateIds.includes(option.optionId);

              return (
                <div
                  key={index}
                  className={`${styles.option} ${
                    selectList.includes(option.optionId)
                      ? isVoted && styles.selectedOption // 선택된 옵션에 대한 클래스 추가
                      : ""
                  } ${
                    // topCandidateIds.includes(option.optionId)
                    isTopCandidate ? styles.topCandidate : ""
                  }`}
                  onClick={
                    !isVoted ? () => updateSelectList(option.optionId) : null
                  }
                >
                  <div style={{ position: "absolute", top: "7px", left: "10px", fontWeight: "bold", }}>
                    {option.optionString}
                  </div>
                  {option.optionImgUrl && (
                    <Image
                      src={option.optionImgUrl}
                      alt={`선택지 ${index + 1}`}
                      style={{ position: "relative", top: "23px" }}
                      width={98}
                      height={124}
                    />
                  )}

                  {userVote?.[0]?.optionId === option.optionId && 
                    <div className={styles.userVote}>
                      <div className={styles.optionInfo}>
                        <Image src={vote_check} alt="vote_check" style={{ position: "absolute", right: "8%", top: "3.8%", }} />
                      </div>
                      <div className={styles.percent} style={{opacity: "0.95"}}>
                        {userVotePercent[0]}%
                      </div>
                      <div className={styles.topVoteResult} style={{opacity: "0.95"}}>
                        {userVoteResult[0]}명
                        <div className={styles.topVoteResultString}>투표</div>
                      </div>
                    </div>
                  }

                  {/* {topCandidate?.[0]?.optionId === option.optionId && (
                      <div className={styles.optionInfo}>
                          <span className={styles.topCandidatePercent}>
                              {topCandidatePercent}%
                          </span>
                      </div>
                  )} */}

                  {/* isVoted가 true이고 showAllCandidatePercent가 true일 때만 표시 */}
                  {(!onGoing || isVoted) && isTopCandidate && (
                    <div className={styles.percent}>
                      {allCandidatePercent[index]}%
                    </div>
                  )}
                  {(!onGoing || isVoted) && isTopCandidate && (
                    <div className={styles.topVoteResult}>
                      {topVoteResult[0]}명
                      <div className={styles.topVoteResultString}>투표</div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CardVoteBox;
