"use client";
import styles from "@/app/modules/voteDetailCss/generalVoteBox.module.scss";
import Image from "next/image";
import vote_check from "@/app/public/image/vote_check.png";
import voteDetailStore from "@/app/zustand/voteDetailStore";
import useSelectVoteStore from "@/app/zustand/selectVote";

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
                } ${
                  topCandidate?.[0]?.optionId === option.optionId
                    ? styles.topCandidate
                    : ""
                }`}
                onClick={!isVoted ? () => updateSelectList(option.optionId) : null}
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
                  {userVote && userVote[0]?.optionId === option.optionId && (
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
                    <div className={styles.optionPercentage}>
                      {allCandidatePercent[index]}%
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
