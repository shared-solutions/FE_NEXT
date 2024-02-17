import styles from "@/app/modules/waitCss/waitbox.module.scss";

import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import Image from "next/image";
import { comment } from "postcss";
import { calculateTimeDifference } from "../comment/CommentSort";
const WaitingBox = (
  userimg,
  title,
  nickname,
  time,
  content,
  like,
  comment_cnt
) => {
  return (
    <div className={styles.box}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          className={styles.userimg}
          src={userimg}
          alt="유저 이미지"
          width={24}
          height={24}
        />
        <div className={styles.userlay}>
          <div className={styles.name}>{nickname}</div>
          <div className={styles.time}>{calculateTimeDifference(time)}</div>
        </div>
      </div>
      <div className={styles.commentbox}>{title}</div>
      <div className={styles.commentbox}>{content}</div>
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

export default WaitingBox;
