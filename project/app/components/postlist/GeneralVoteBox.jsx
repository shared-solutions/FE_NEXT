"use client";
import styles from "@/app/modules/voteDetailCss/generalVoteBox.module.scss";
import Image from "next/image";
import vote_check from "@/app/public/image/vote_check.png";
import voteDetailStore from "@/app/zustand/voteDetailStore";
import useSelectVoteStore from "@/app/zustand/selectVote";
import check from "@/app/public/image/generalCheck.png";

const GeneralVoteBox = ({ pollOption }) => {
  // 옵션의 개수에 따라서 box의 height를 동적으로 계산
  //const boxHeight = 170 + (pollOption.length - 2) * 50;
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

  // 해당 옵션에 대한 전체 후보 퍼센트 가져오기
  //const optionPercentage = allCandidatePercent && allCandidatePercent[index] ? allCandidatePercent[index] : 0;

  const { selectList, updateSelectList } = useSelectVoteStore();

  console.log(pollOption);
  console.log("선택", selectList);
  const handleOptionClick = (option) => {
    // 이미 투표한 경우 또는 투표가 종료된 경우 처리
    if (isVoted || !onGoing) {
      return;
    }
    // 선택한 OptionStringBox의 정보를 selectList에 추가
    updateSelectList(option.optionId);
    console.log("선택", selectList);
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.options}>
          {pollOption &&
            pollOption.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  selectList.includes(option.optionId)
                    ? styles.selectedOption
                    : ""
                }`}
                onClick={
                  !isVoted ? () => updateSelectList(option.optionId) : null
                }
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
                  {/* 사용자가 투표 안 했을 때 */}
                  {!isVoted && (
                    <div className={styles.optionString}>
                      {option.optionString}
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

                  {(!onGoing || isVoted) && allCandidatePercent && (
                    // 추가: 투표 마감 후 & 사용자 투표 했을 때 결과 표시
                    <div
                      className={`${styles.allCandidate} ${
                        userVote?.[0]?.optionId === option.optionId
                          ? styles.userVote
                          : ""
                      }`}
                      style={{ width: `${allCandidatePercent[index]}%` }}
                    >
                      {/* 투표 후보 리스트 */}
                      <div
                        className={styles.optionString}
                        style={{
                          color:
                            allCandidatePercent[index] === 0
                              ? "black"
                              : "white",
                        }}
                      >
                        {option.optionString}
                      </div>
                      {/* 사용자가 투표한 항목 */}
                      {userVote &&
                        userVote
                          .map((vote) => vote.optionId)
                          .includes(option.optionId) && (
                          // userVote에 해당 옵션이 포함되어 있는지 확인하여 체크 이미지 표시
                          <Image
                            src={check}
                            alt="체크"
                            width={15}
                            height={15}
                            className={styles.checkImage}
                          />
                        )}
                      <div className={styles.optionPercentage} style={{color: allCandidatePercent[index] === 100 ? "white" : "black" }}>
                        {allCandidatePercent[index]}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralVoteBox;
