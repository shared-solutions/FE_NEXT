import styles from "@/app/modules/postListCss/gaugePostBox.module.scss";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import gaugeImg from "@/app/public/image/gauge_img.png";
import Image from "next/image";
import { calculateTimeDifference } from "../comment/CommentSort";
const GaugeP = ({
  userimg,
  nickname,
  title,
  content,
  like,
  comment_cnt,
  gauge,
  file,
  date,
}) => {
  const gaugeValue = gauge === null ? 0 : gauge;
  const gaugePercentage = gaugeValue + "%";

  // linear-gradient로 배경색을 설정
  const gradientStyle = {
    background: `linear-gradient(to right, black ${gaugePercentage}, #eeeeee ${gaugePercentage})`,
  };

  // gaugePercentage에서 왼쪽으로 25px만큼 이동한 크기 계산
  const leftMargin = `calc(${gaugePercentage} - 25px)`;

  // gaugePercentage에 따라 gaugeImageContainer의 left 값 조정
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
      </div>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.date}>{calculateTimeDifference(date)}</div>
        <div className={styles.gaugeContainer}>
          <div className={styles.gaugeImageContainer} style={gaugeImageStyle}>
            <Image src={gaugeImg} alt="게이지 이미지" width={50} height={50} />
          </div>
          <div className={styles.pollTitleContainer} style={gradientStyle}>
            {/* <div className={styles.pollTitle}>{pollTitle}</div> */}
            {/* 퍼센티지 하드코딩 수정해야 함 */}
            <div className={styles.pollTitlePercentage}>{gaugeValue}%</div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.like}>
            <Image src={likeimg} alt="좋아요" width={15} height={13} /> {like}
          </div>
          <div className={styles.comment}>
            <Image src={commentimg} alt="댓글" width={15} height={13} />{" "}
            {comment_cnt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeP;
