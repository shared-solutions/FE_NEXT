import styles from "@/app/modules/waitCss/waitbox.module.scss";
import userimg from "@/app/public/image/userimg.png";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import Image from "next/image";

const WaitingBox = () => {
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
          <div className={styles.name}>닉네임</div>
          <div className={styles.time}>17:59</div>
        </div>
      </div>
      <div className={styles.commentbox}>
        최근에 새로운 취미를 찾고 있는데, 어떤 활동을 시작해야 할지 모르겠어요..
        최근에 새로운 취미를 찾고 있는데, 어떤 활동을 시작해야 할지 모르겠어요..
        최근에 새로운 취미를 찾고 있는데, 어떤 활동을 시작해야 할지 모르겠어요..
        최근에 새로운 취미를 찾고 있는데, 어떤 활동을 시작해야 할지 모르겠어요..
        최근에 새로운 취미를 찾고 있는데, 어떤 활동을 시작해야 할지 모르겠어요..
      </div>
      <div className={styles.footer}>
        <div className={styles.like}>
          <Image src={likeimg} alt="좋아요" width={15} height={13} /> 34
        </div>
        <div className={styles.comment}>
          <Image src={commentimg} alt="댓글" width={15} height={13} /> 23
        </div>
      </div>
    </div>
  );
};

export default WaitingBox;
