import styles from "@/app/modules/postListCss/generalPostBox.module.scss";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import Image from "next/image";

const GeneralPostBox = ({ userimg, nickname, title, content, pollOption, like, comment }) => {
  // 옵션의 개수에 따라서 box의 height를 동적으로 계산
  const boxHeight = 250 + (pollOption.length - 2) * 50;

  return (
    <div className={`${styles.box}`} style={{height: `${boxHeight}px`}}>
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
        <div className={styles.options}>
          {pollOption &&
            pollOption.map((option, index) => (
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
                  {/* 퍼센티지 하드코딩 수정해야 함 */}
                  <div className={styles.optionPercentage}>0%</div>
                </div>
              </div>
            ))}
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

export default GeneralPostBox;
