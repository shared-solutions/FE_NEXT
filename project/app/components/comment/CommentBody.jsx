import styles from "@/app/modules/commentCss/commentBody.module.scss";
import likeimg from "@/app/public/image/like.png";
import recommentimg from "@/app/public/image/recomment.png";
import moreimg from "@/app/public/image/morebtncomment.png";
import user from "@/app/public/image/userimg.png";
import Image from "next/image";
const CommentBody = ({
  onReplyClick,
  name,
  time,
  likecount,
  content,
  userImg,
  isDeleted,
}) => {
  console.log(userImg !== null);
  return (
    <div className={styles.commentbody}>
      <div className={styles.userlay}>
        {userImg ? (
          <Image src={userImg} alt="" width={25} height={25} />
        ) : (
          <Image src={user} alt="" width={25} height={25} />
        )}

        {/* <Image
          src={userImg !== null ? userImg : user}
          alt="유저 이미지"
          width={25}
          height={25}
        /> */}

        <div className={styles.name}>{name}</div>
        <div className={styles.when}>{time}</div>
        <div className={styles.line}>|</div>
        <Image src={likeimg} alt="좋아요" width={10} height={9} />
        <div className={styles.likecount}>{likecount}</div>
        <div className={styles.shared}>
          <Image src={likeimg} alt="좋아요" width={11} height={9} />
          <Image
            onClick={() => onReplyClick()}
            src={recommentimg}
            alt="댓글"
            width={9}
            height={9}
          />
          <Image src={moreimg} alt="더보기" width={2} height={8} />
        </div>
      </div>

      {!isDeleted && (
        <>
          <div className={styles.commentdata}>{content}</div>
        </>
      )}

      {isDeleted && (
        <div className={styles.deletedComment}>삭제된 댓글입니다</div>
      )}
    </div>
  );
};

export default CommentBody;
