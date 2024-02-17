import styles from "@/app/modules/waitCss/point.module.scss";
import sunglass from "@/app/public/image/sunglass.png";
import Image from "next/image";
import Link from "next/link";
const HomePoint = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        포인트 부자되는 법
        <Image
          className={styles.sun}
          src={sunglass}
          alt="사람얼굴"
          width={21}
          height={21}
        />
      </div>
      <ul className={styles.list}>
        <li>
          투표에 한번 참여하면 <b>1포인트 획득!</b>
        </li>
        <li>
          댓글을 남긴다면? <b>10포인트 획득!</b>
        </li>
        <li>
          가입만해도? <b>300포인트 바로 지급!</b>
        </li>
        <li>
          활동만 열심해 해도 <b>포인트 부자!</b>
        </li>
      </ul>
      <div className={styles.footer}>
        <Link className={styles.link} href={`/vote`}>
          <button className={styles.btn}>투표 참여하기</button>
        </Link>
        {/* <button className={styles.btn}>포인트 결제하기</button> */}
      </div>
    </div>
  );
};

export default HomePoint;
