import Link from "next/link";
import styles from "@/app/modules/settingCss/setting.module.scss";
import Image from "next/image";
import arrow2 from "../../public/image/arrow2.png";

export default function Setting() {
  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <Link href="/menu">
          <Image src={arrow2} alt="previous" />
        </Link>
        <h3>설정</h3>
      </div>
      <div className={styles.list}>
        <h3>이용안내</h3>
        <p>앱 버전</p>
        <p>문의하기</p>
        <p>공지사항</p>
      </div>
      <div className={styles.list} style={{ marginTop: "11.5rem" }}>
        <h3>커뮤니티</h3>
        <p>FAQ</p>
        <p>이용약관</p>
        <p>개인정보 처리방침</p>
      </div>
      <div className={styles.list} style={{ marginTop: "23rem" }}>
        <h3>기타</h3>
        <p>로그아웃</p>
        <p>계정 탈퇴</p>
      </div>
    </div>
  );
}
