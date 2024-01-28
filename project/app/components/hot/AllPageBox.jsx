import styles from "@/app/modules/hotCss/allpagebox.module.scss";
import userimg from "@/app/public/image/userimg.png";
import selectimg1 from "@/app/public/image/select1.png";
import selectimg2 from "@/app/public/image/select2.png";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import Image from "next/image";

const AllPageBox = () => {
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
        <div className={styles.nickname}>nickname</div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>에어포스 어떤 색 살까요?</div>
        <div className={styles.content}>
          옷은 캐쥬얼한 스타일을 좋아하는 편입니다. 어떤 색이 더 잘어울릴까요?
        </div>
        <div>
          <Image src={selectimg1} alt="선택지 1" width={98} height={124} />
          <Image src={selectimg2} alt="선택지 2" width={98} height={124} />
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
    </div>
  );
};

export default AllPageBox;
