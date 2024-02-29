import styles from "@/app/modules/postListCss/gaugePostBox.module.scss";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import gaugeImg from '@/app/public/image/gauge_img.png';
import Image from "next/image";
import { calculateTimeDifference } from "../comment/CommentSort";
import total from "@/app/public/image/total.png";

const GaugePostBox = ({ 
  userimg, 
  nickname, 
  title, 
  content, 
  pollOption, 
  like, 
  comment,
  gauge,
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
  // const gaugeValue = gauge === null ? 0 : gauge;
  // const gaugePercentage = gaugeValue + '%';

  // 유저값
  let GaugeValue;
  let usergaugeValue;
  if (userGauge === null) {
    GaugeValue = totalGauge;
  } else {
    usergaugeValue = userGauge;
    GaugeValue = totalGauge;
  }

  const usergaugeValuePercent = GaugeValue + "%";
  const gaugeValuePercent = usergaugeValue + "%";

  // linear-gradient로 배경색을 설정
  const gradientStyle = {
    background: `linear-gradient(to right, black ${gaugeValuePercent}, #eeeeee ${gaugeValuePercent})`, marginTop: '5px'
  };

  // gaugePercentage에서 왼쪽으로 25px만큼 이동한 크기 계산
  const leftMargin = `calc(${usergaugeValuePercent} - 25px)`;
  const leftUserMargin = `calc(${gaugeValuePercent} - 25px)`;

  // gaugePercentage에 따라 gaugeImageContainer의 left 값 조정
  const userGaugeStyle = {
    left: leftUserMargin,
  };
  const gaugeImageStyle = {
    left: leftMargin,
  };

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
        <div className={styles.gaugeContainer}>
          <div className={styles.gaugeImageContainer} style={gaugeImageStyle}>
            <Image src={gaugeImg} alt="게이지 이미지" width={50} height={50} />
          </div>
          <div className={styles.pollTitleContainer} style={gradientStyle}>
            {/* <div className={styles.pollTitle}>{pollTitle}</div> */}
            {/* 퍼센티지 하드코딩 수정해야 함 */}
            <Image src={total} alt="이미지" width={15} height={15} style={{ marginBottom: '8px'}} />
            <div>평균</div>
          </div>
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

export default GaugePostBox;
