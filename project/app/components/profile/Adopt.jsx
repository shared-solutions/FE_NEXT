import styles from "../../modules/profileCss/adopt.module.scss";

export default function Adopt() {
  return (
    <>
      <div className={styles.rowContainer}>
        <h2>채택 내역</h2>
      </div>
      <div className={styles.grid}>
        <p className={styles.font1}>채택 답변</p>
        <p className={styles.font2}>25개</p>
      </div>
      <div className={styles.grid}>
        <p className={styles.font1}>채택률</p>
        <p className={styles.font2}>23.8%</p>
      </div>
    </>
  );
}
