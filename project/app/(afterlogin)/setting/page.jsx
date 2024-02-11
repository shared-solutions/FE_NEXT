import Link from "next/link";
import styles from "@/app/modules/settingCss/setting.module.scss";
import Image from "next/image";
import arrow2 from "../../public/image/arrow2.png";

export default function Setting() {
  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <Link href="/home">
          <Image src={arrow2} alt="previous" />
        </Link>
        <h3>설정</h3>
      </div>
      <div className={styles.list}>
        <h3>이용안내</h3>
        <div className={styles.version}>
          <p>앱 버전</p>
          <p style={{ color: "#808080", fontSize: "13px" }}>1.0.0 최신 버전</p>
        </div>
        <Link href="setting/ask">
          <p>문의하기</p>
        </Link>
        <Link href="setting/notice">
          <p>공지사항</p>
        </Link>
      </div>
      <div className={styles.list} style={{ marginTop: "11.5rem" }}>
        <h3>커뮤니티</h3>
        <Link href="setting/help">
          <p>FAQ</p>
        </Link>
        <p>이용약관</p>
        <p>개인정보 처리방침</p>
      </div>
      <div className={styles.list} style={{ marginTop: "23rem" }}>
        <h3>기타</h3>
        <Link href="setting/logout">
          <p>로그아웃</p>
        </Link>
        <Link href="setting/delete">
          <p>계정 탈퇴</p>
        </Link>
      </div>
    </div>
  );
}
