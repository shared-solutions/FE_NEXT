import styles from "@/app/modules/postListCss/cardPostBox.module.scss";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import vote_check from "@/app/public/image/vote_check.png";
import Image from "next/image";
import votePostStore from "@/app/zustand/votePostStore";
import { calculateTimeDifference } from "../comment/CommentSort";
import { useState, useEffect } from 'react';

const CardPostBox = ({ 
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
  topVoteResult,
}) => {

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

        {/* === 옵션 박스 시작 === */}
        <div className={styles.imgSlide}>
        {pollOption &&
          pollOption.map((option, index) => {
            // topCandidate의 optionId 배열 생성
            const topCandidateIds = topCandidate ? topCandidate.map(candidate => candidate.optionId) : [];
            return (
              <div
                key={index}
                className={`${styles.option} ${
                  topCandidateIds.includes(option.optionId)
                    ? styles.topCandidate
                    : ""
                }`}
              > 
                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
                  {option.optionString} {userVote && userVote.map(vote => vote.optionId).includes(option.optionId) && (
                    <Image
                      src={vote_check}
                      alt="체크"
                      width={25}
                      height={25}
                      className={styles.checkImage}
                    />
                  )}
                </div>
                {option.optionImgUrl && (
                  <Image
                    src={option.optionImgUrl}
                    alt={`선택지 ${index + 1}`}
                    width={98}
                    height={124}
                  />
                )}
                {/* isVoted가 true이고 showAllCandidatePercent가 true일 때만 표시 */}
                {isVoted && showAllCandidatePercent && (
                    <div className={styles.percent}>{allCandidatePercent[index]}%</div>
                  )}
                  {isVoted && showTopVoteResult && (
                    <div className={styles.topVoteResult}>{topVoteResult && topVoteResult[index] ? `${topVoteResult[index]}명` : ''}
                    <div className={styles.topVoteResultString}>투표</div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <div className={styles.like}>
            <Image src={likeimg} alt="좋아요" width={15} height={13} /> {like}
          </div>
          <div className={styles.comment}>
            <Image src={commentimg} alt="댓글" width={15} height={13} /> {comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPostBox;
