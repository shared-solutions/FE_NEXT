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

  const gaugeValuePercent = GaugeValue + "%";
  const usergaugeValuePercent = usergaugeValue + "%";

  // linear-gradient로 배경색을 설정
  const gradientStyle = {
    background: `linear-gradient(to right, black ${usergaugeValuePercent}, #eeeeee ${usergaugeValuePercent})`, marginTop: '5px'
  };

  // total 이미지의 스타일 설정
  const totalImageStyle = {
    position: 'absolute',
    left: gaugeValuePercent, // gaugeValuePercent에 따라 이미지 위치 설정
    marginBottom: '8px',
    transform: 'translateX(-50%)', // 이미지 중앙 정렬을 위해 필요한 스타일
    // zIndex: 0,
  };

  // '평균값' 글씨의 스타일 설정
  const averageTextStyle = {
    position: 'absolute',
    left: gaugeValuePercent, // gaugeValuePercent에 따라 이미지 위치 설정
    top: '25px',
    transform: 'translateX(-50%)', // 글씨를 가운데 정렬하기 위한 스타일
  };

  // '게이지 이미지' 스타일 설정
  const gaugeImageStyle = {
    position: 'absolute',
    left: usergaugeValuePercent,
    bottom: '0',
    transform: 'translateX(-50%)', // 이미지 중앙 정렬을 위해 필요한 스타일
    // zIndex: 1,
  };
  
  // gaugePercentage에서 왼쪽으로 25px만큼 이동한 크기 계산
  const leftMargin = `calc(${usergaugeValuePercent} - 25px)`;
  const leftUserMargin = `calc(${gaugeValuePercent} - 25px)`;

  // gaugePercentage에 따라 gaugeImageContainer의 left 값 조정
  const userGaugeStyle = {
    left: leftUserMargin,
  };

  // total 이미지와 '평균값'을 보여줄지 여부 결정
  const showAverageInfo = !(isVoted === false && onGoing === true);

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
            {/* 조건부 렌더링 */}
            {showAverageInfo && (
              <>
                <Image src={total} alt="이미지" width={15} height={15} style={totalImageStyle} />
                <div style={{ ...averageTextStyle, display: showAverageInfo ? 'block' : 'none' }}>평균값</div>
              </>
            )}
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
