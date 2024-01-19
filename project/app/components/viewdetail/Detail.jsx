import styles from "@/app/modules/viewdetailCss/detail.module.scss";
import userimg from "@/app/public/image/userimg.png";
import moreimg from "@/app/public/image/moreimg.png";
import select1 from "@/app/public/image/select1.png";
import Image from "next/image";

const Detail = () => {
  return (
    <div className={styles.container}>
      <div className={styles.userlay}>
        <Image src={userimg} alt="유저 이미지" width={34} height={34} />
        <div className={styles.usertext}>
          <div className={styles.username}>김태영</div>
          <div className={styles.time}>12:23</div>
        </div>
        <Image
          className={styles.morebtn}
          src={moreimg}
          alt="더보기"
          width={3}
          height={13}
        />
      </div>

      <div className={styles.title}>
        에어포스 어떤 색 살까요?
        <div className={styles.point}>30pt</div>
      </div>

      <div className={styles.content}>
        옷은 캐쥬얼한 스타일을 좋아하는 편입니다. 어떤 색이 더 잘어울릴까요?
        화이트? 블랙?
      </div>

      <div className={styles.select}>
        <Image src={select1} alt="선택지 1" width={130} height={160} />
        <Image src={select1} alt="선택지 1" width={130} height={160} />
      </div>

      <div className={styles.taglay}>
        <div className={styles.tag}>태그</div>
        <div className={styles.overtime}>마감 5분전</div>
      </div>
    </div>
  );
};
export default Detail;
