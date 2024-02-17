import styles from "@/app/modules/hotCss/hotbox.module.scss";
import hotimg from "@/app/public/image/hotback.png";
import gaugeImg from "@/app/public/image/gauge_img.png";
import Image from "next/image";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import { calculateTimeDifference } from "../comment/CommentSort";

export const GeneralBox = ({
  image,
  title,
  content,
  candidateList,
  like,
  comment_cnt,
  date,
}) => {
  // 이미지 받아오는 작업 해야됌

  return (
    <div className={styles.mainbox}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.date}>{calculateTimeDifference(date)}</div>

      <div className={styles.options}>
        {candidateList &&
          candidateList.map((option, index) => (
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
                <div className={styles.optionString}>{option.optionString}</div>

                <div className={styles.optionPercentage}>
                  {isNaN(option.ratio) ? 0 : option.ratio}
                </div>
              </div>
            </div>
          ))}
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
  );
};

export const GaugeBox = ({
  title,
  content,
  like,
  comment_cnt,
  gauge,
  date,
}) => {
  const gaugeValue = 0;
  const gaugeValuePercent = gaugeValue + "%";

  const gradientStyle = {
    background: `linear-gradient(to right, black ${gaugeValuePercent}, #eeeeee ${gaugeValuePercent})`,
  };

  const leftMargin = `calc(${gaugeValuePercent} - 25px)`;

  const gaugeImageStyle = {
    left: leftMargin,
  };

  return (
    <>
      <div className={styles.mainbox}>
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
    </>
  );
};

export const CardBox = ({
  title,
  content,
  image,
  like,
  comment_cnt,
  candidateList,
  date,
}) => {
  return (
    <>
      <div className={styles.mainbox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.date}>{calculateTimeDifference(date)}</div>

        <div className={styles.imgSlide}>
          {candidateList &&
            candidateList.map((option, index) => (
              <div key={index} className={styles.optionCard}>
                <span>{option.candidate_name}</span>
                {option.candidate_image && (
                  <Image
                    src={option.candidate_image}
                    alt={`선택지 ${index + 1}`}
                    width={98}
                    height={124}
                  />
                )}
              </div>
            ))}
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
    </>
  );
};
