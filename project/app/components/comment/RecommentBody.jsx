import styles from "@/app/modules/commentCss/commentBody.module.scss";
import userimg from "@/app/public/image/userimg.png";
import likeimg from "@/app/public/image/like.png";
import recommentimg from "@/app/public/image/recomment.png";
import moreimg from "@/app/public/image/morebtncomment.png";
import Image from "next/image";
const RecommentBody = (name, time, likeCount, content, userImg, isDeleted) => {
  return (
    <>
      <div className={styles.recommentbody}>
        <div className={styles.userlay}>
          {/* <Image src={userImg} alt="유저 이미지" width={25} height={25} /> */}
          <div className={styles.name}>{name}</div>
          <div className={styles.when}>{time}</div>
          <div className={styles.line}>|</div>
          <Image src={likeimg} alt="좋아요" width={10} height={9} />
          <div className={styles.likecount}>{likeCount}</div>

          <div className={styles.recommentshared}>
            <Image src={likeimg} alt="좋아요" width={11} height={9} />
            <Image src={recommentimg} alt="댓글" width={9} height={9} />
            <Image src={moreimg} alt="더보기" width={2} height={8} />
          </div>
        </div>
        {!isDeleted && (
          <>
            <div className={styles.recommentdata}>{content}</div>
          </>
        )}

        {isDeleted && (
          <div className={styles.deletedComment}>삭제된 댓글입니다</div>
        )}
      </div>
    </>
  );
};

export default RecommentBody;
