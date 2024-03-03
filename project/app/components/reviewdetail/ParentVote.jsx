// (ParentPost 수정 전 코드)
import Image from "next/image";
import like from "../../public/image/like.png";
import comment from "../../public/image/comment.png";
import styles from "../../modules/reviewdetailCss/parentpost.module.scss";
import gaugeImg from "@/app/public/image/gauge_img.png";

export default function ParentVote({
  postData,
  pollContent,
  pollOption,
  gauge,
}) {
  console.log("post", postData);
  console.log("1등", pollContent);
  console.log("투표", pollOption);
  console.log("게이지", gauge);
  let filteredPollOptions;
  if (
    pollContent &&
    pollContent.candidateId !== null &&
    pollOption &&
    Array.isArray(pollOption)
  ) {
    filteredPollOptions = pollOption.filter(
      (option) => option.optionId != pollContent.candidateId
    );
  }
  let gaugePercentage, gradientStyle, gaugeImageStyle;

  if (gauge !== null) {
    gaugePercentage = gauge + "%";
    // linear-gradient로 배경색을 설정
    gradientStyle = {
      background: `linear-gradient(to right, black ${gaugePercentage}, #eeeeee ${gaugePercentage})`,
    };
    // gaugePercentage에서 왼쪽으로 25px만큼 이동한 크기 계산
    const leftMargin = `calc(${gaugePercentage} - 25px)`;
    // gaugePercentage에 따라 gaugeImageContainer의 left 값 조정
    gaugeImageStyle = {
      left: leftMargin,
    };
  }

  return (
    <div className={styles.post}>
      <div className={styles.rightContainer}>{/*<p>{day}일전</p>*/}</div>
      <h1>{postData.title}</h1>
      <p className={styles.content}>{postData.content}</p>

      <div className={styles.voteContainer}>
        {/* VoteType: General */}
        {pollContent ? (
          <div className={styles.pollContentContainer}>
            <p>{pollContent.candidateName}</p>
          </div>
        ) : null}
        {filteredPollOptions ? (
          <div className={styles.options}>
            {filteredPollOptions.map((option) => (
              <div key={option.optionId} className={styles.pollOptionContainer}>
                <p>{option.optionString}</p>
              </div>
            ))}
          </div>
        ) : pollOption === null ? (
          ""
        ) : (
          <div className={styles.options}>
            {pollOption.map((option) => (
              <div key={option.optionId} className={styles.pollOptionContainer}>
                <p>{option.optionString}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* VoteType: Gauge */}
        {gauge !== null && (
          <div className={styles.gaugeContainer}>
            <div className={styles.gaugeImageContainer} style={gaugeImageStyle}>
              <Image
                src={gaugeImg}
                alt="게이지 이미지"
                width={50}
                height={50}
              />
              <div className={styles.pollTitlePercentage} >{gauge}%</div>
            </div>
            <div className={styles.pollTitleContainer} style={gradientStyle}>
            </div>
          </div>
        )}
      </div>

      <div className={styles.imgContainer}>
        <Image src={like} alt="like" width={14} height={14} />
        <p style={{ color: "#F9C81C" }}>{postData.like}</p>
        <Image src={comment} alt="comment" width={14} height={14} />
        <p>{postData.comment}</p>
      </div>
    </div>
  );
}
