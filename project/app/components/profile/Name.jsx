import styles from "@/app/modules/profileCss/profile.module.scss";

export default function Name() {
  return (
    <div className={styles.info}>
      <p className={styles.name}>psward73님</p>
      <p className={styles.info_edit}>회원정보 수정</p>
    </div>
  );
}
