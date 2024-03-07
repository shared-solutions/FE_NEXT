"use client";
import styles from "@/app/modules/reviewCss/reviewbox.module.scss";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import { calculateTimeDifference } from "../comment/CommentSort";
import Image from "next/image";
import ParentPost from "@/app/components/reviews/ParentPost";

const ReviewBox = ({
  nickname,
  date,
  title,
  content,
  like,
  comment,
  userImg,
  parentPost,
}) => {
  return (
    <div className={styles.review_box}>
      <div className={styles.post_top}>
        <div className={styles.userinfo}>
          <Image
            src={userImg}
            className={styles.userimg}
            alt="유저 이미지"
            width={24}
            height={24}
          />
          <div className={styles.nickname}>{nickname}</div>
        </div>
        <div className={styles.date}>{calculateTimeDifference(date)}</div>
      </div>

      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
      <ParentPost
        key={parentPost.postId}
        day={calculateTimeDifference(parentPost.createdAt)}
        header={parentPost.title}
        text={parentPost.content}
        like_num={parentPost.like}
        comment_num={parentPost.comment}
      />
      <div className={styles.footer}>
        <div className={styles.like}>
          <Image src={likeimg} alt="좋아요" width={15} height={13} /> {like}
        </div>
        <div className={styles.comment}>
          <Image src={commentimg} alt="댓글" width={15} height={13} /> {comment}
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
