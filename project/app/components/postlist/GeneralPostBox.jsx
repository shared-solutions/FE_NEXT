import styles from "@/app/modules/postListCss/generalPostBox.module.scss";
import likeimg from "@/app/public/image/like.png";
import check from "@/app/public/image/generalCheck.png";
import commentimg from "@/app/public/image/comment.png";
import Image from "next/image";
import votePostStore from "@/app/zustand/votePostStore";
import { calculateTimeDifference } from "../comment/CommentSort";

const GeneralPostBox = ({
  userimg,
  nickname,
  title,
  content,
  pollOption,
  like,
  comment,
  date,
  // ===== 0216 추가 시작 ====
  onGoing, // 마감 여부
  isVoted, // 사용자 투표 여부
  topCandidate, // 1등인 후보 리스트
  topCandidatePercent, // 1등 후보 퍼센트 리스트
  userVote, // 사용자가 투표한 후보 리스트,
  userVotePercent, // 사용자가 투표한 후보 퍼센트 리스트
  allCandidatePercent, // 모든 후보의 퍼센트 리스트
  userGauge, // 사용자가 투표한 항목의 퍼센트
  totalGauge, // 평균 게이지
  // ===== 0216 추가 끝 ====
}) => {
  // 옵션의 개수에 따라서 box의 height를 동적으로 계산
  const boxHeight = 270 + (pollOption.length - 2) * 50;

  return (
    <div className={styles.box} style={{ height: `${boxHeight}px` }}>
      <div className={styles.userinfo}>
        <Image
          src={userimg}
          className={styles.userimg}
          alt="유저 이미지"
          width={24}
          height={24}
        />
        <div className={styles.nickname}>{nickname}</div>
        <div className={styles.date}>{calculateTimeDifference(date)}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.options}>
          {pollOption &&
            pollOption.map((option, index) => {
              /*
              // 해당 옵션이 topCandidate에 있는지 확인
              const isTopCandidate =
                topCandidate &&
                topCandidate.find(
                  (candidate) => candidate.optionId === option.optionId
                );

              // 해당 옵션의 인덱스를 가져와서 해당하는 topCandidatePercent 값을 가져옴 -> 필요없?
              const topCandidateIndex = isTopCandidate
                ? topCandidate.findIndex(
                    (candidate) => candidate.optionId === option.optionId
                  )
                : -1;

              // 해당 옵션에 대한 전체 후보 퍼센트 가져오기
              const optionPercentage =
                allCandidatePercent && allCandidatePercent[index]
                  ? allCandidatePercent[index]
                  : 0;

              // 사용자가 투표한 후보의 퍼센트 찾기
              const userVoteIndex =
                userVote &&
                userVote.findIndex((vote) => vote.optionId === option.optionId);

              const userVotePercentage =
                userVoteIndex !== -1 ? userVotePercent[userVoteIndex] : 0;

              // topCandidate의 optionId 배열 생성
              const topCandidateIds = topCandidate
                ? topCandidate.map((candidate) => candidate.optionId)
                : [];
              */
              return (
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
                    {/* 투표 진행 중인데 사용자가 투표 안 했을 때만 보임*/}
                    {onGoing && !isVoted && (
                      <div className={styles.optionString}>
                        {option.optionString}
                      </div>
                    )}
                    {(!onGoing || isVoted) && allCandidatePercent && (
                      // 추가: 투표 마감 후 & 사용자 투표 했을 때 결과 표시
                      <div
                        className={`${styles.allCandidate} ${
                          userVote?.[0]?.optionId === option.optionId
                            ? styles.userVote
                            : ""
                        }`}
                        style={{
                          width:
                            allCandidatePercent[index] === 0
                              ? "100%"
                              : `${allCandidatePercent[index]}%`,
                          backgroundColor:
                            allCandidatePercent[index] === 0 ? "" : "black",
                        }}
                      >
                        {/* 투표 후보 리스트 */}
                        <div
                          className={styles.optionString}
                          style={{
                            color:
                              allCandidatePercent[index] === 0
                                ? "black"
                                : "white",
                            width:
                              allCandidatePercent[index] === 0 ? "100%" : "",
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
                        <div
                          className={styles.optionPercentage}
                          style={{
                            color:
                              allCandidatePercent[index] === 100
                                ? "white"
                                : "black",
                          }}
                        >
                          {allCandidatePercent[index]}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        <div className={styles.footer}>
          <div className={styles.like}>
            <Image src={likeimg} alt="좋아요" width={15} height={13} /> {like}
          </div>
          <div className={styles.comment}>
            <Image src={commentimg} alt="댓글" width={15} height={13} />{" "}
            {comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralPostBox;
