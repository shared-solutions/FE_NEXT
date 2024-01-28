import styles from "@/app/modules/viewdetailCss/detail.module.scss";
import userimg from "@/app/public/image/userimg.png";
import moreimg from "@/app/public/image/moreimg.png";
import select1 from "@/app/public/image/select1.png";
import timerimg from "@/app/public/image/timer.png";
import countview from "@/app/public/image/countview.png";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import rerenderimg from "@/app/public/image/rerender.png";
import likeunclickimg from "@/app/public/image/likeunclick.png";
import chatclickimg from "@/app/public/image/chatclick.png";
import Image from "next/image";

const Detail = () => {
  return (
    <div className={styles.container}>
      <div className={styles.userlay}>
        <Image
          className={styles.userimg}
          src={userimg}
          alt="유저 이미지"
          width={34}
          height={34}
        />
        <div className={styles.username}>김태영</div>
        <br />

        <div className={styles.morebtn}>
          <Image
            className={styles.rerender}
            src={rerenderimg}
            alt="렌더링"
            width={12}
            height={12}
          />
          <Image src={moreimg} alt="더보기" width={3} height={13} />
        </div>
      </div>
      <div className={styles.usertext}>
        <div className={styles.date}>5월 4일</div>
        <div className={styles.line}> | </div>
        <div className={styles.time}>12:33</div>
      </div>

      <div className={styles.title}>에어포스 어떤 색 살까요?</div>

      <div className={styles.content}>
        옷은 캐쥬얼한 스타일을 좋아하는 편입니다. 어떤 색이 더 잘어울릴까요?
        화이트? 블랙?
      </div>

      <div className={styles.vote}>
        <div className={styles.minititle}>
          <div className={styles.mini}>화이트? 블랙?</div>
          <div className={styles.point}>투표하기</div>
        </div>
        <div className={styles.timer}>
          <div className={styles.pointnum}>채택 포인트: 30</div>
          <div>|</div>
          <Image
            className={styles.timeimg}
            src={timerimg}
            alt="타이머 이미지"
            width={13}
            height={13}
          />
          <div>마감 5분전</div>
        </div>

        <div className={styles.select}>
          <Image src={select1} alt="선택지 1" width={130} height={160} />
          <Image src={select1} alt="선택지 1" width={130} height={160} />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.countview}>
          <Image src={countview} alt="조회수" width={14} height={10} />
          135
        </div>
        <div className={styles.like}>
          <Image src={likeimg} alt="좋아요수" width={14} height={10} />
          60
        </div>
        <div className={styles.comment}>
          <Image src={commentimg} alt="댓글수" width={14} height={10} />
          35
        </div>
      </div>

      <div className={styles.underlay}>
        <Image
          src={likeunclickimg}
          alt="좋아요 클릭 아직 안함"
          width={37}
          height={35}
        />
        <Image src={chatclickimg} alt="채팅 클릭" width={35} height={35} />
      </div>
    </div>
  );
};
export default Detail;
