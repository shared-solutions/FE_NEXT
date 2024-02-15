import styles from "@/app/modules/postListCss/cardPostBox.module.scss";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import Image from "next/image";

const CardPostBox = ({ userimg, nickname, title, content, pollOption, like, comment }) => {
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
        <div className={styles.imgSlide}>
          {pollOption &&
              pollOption.map((option, index) => (
                <div key={index} className={styles.option}>
                  <span>{option.optionString}</span>  
                  {option.optionImgUrl && (
                    <Image
                      src={option.optionImgUrl}
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
            <Image src={commentimg} alt="댓글" width={15} height={13} /> {comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPostBox;
