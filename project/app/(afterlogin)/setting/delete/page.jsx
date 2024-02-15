import styles from "@/app/modules/settingCss/delete.module.scss";
import Header from "@/app/components/setting/Header";
import Image from "next/image";
import logo_crying from "@/app/public/image/logo_crying.png";

export default function Delete() {
  return (
    <div className={styles.container}>
      <Header text="계정 탈퇴하기" />
      <div className={styles.imgContainer}>
        <Image src={logo_crying} alt="logo" />
        <h2>탈퇴하기</h2>
        <p>
          잠깐! 고민친구를 탈퇴하기 전에 <br />
          아래 정보를 확인해주세요!
        </p>
        <div className={styles.textContainer}>
          <h3>처음부터 다시 가입해야 돼요.</h3>
          <p>
            탈퇴 후 회원정보는 24시간 보관 후, 자동으로 삭제돼요. 탈퇴하시면
            다시 회원가입부터 다시 해야 해요.
          </p>
        </div>
        <div className={styles.textContainer}>
          <h3>모든 포인트가 소멸돼요.</h3>
          <p>
            그 간의 활동으로 열심히 모은 포인트가 모두 사라져요. 결제하신 포인트
            또한 복구할 수 없어요.
          </p>
        </div>
      </div>
      <button className={styles.button_logout}>탈퇴하기</button>
    </div>
  );
}
