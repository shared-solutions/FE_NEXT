import styles from "../../modules/profileCss/adopt.module.scss";

export default function Adopt({ data }) {
  return (
    <>
      <div className={styles.rowContainer}>
        <h5>채택 내역</h5>
      </div>
      <div className={styles.grid}>
        <p className={styles.font1}>채택 답변</p>
        <p className={styles.font2}>{data.adoptComments}개</p>
      </div>
      <div className={styles.grid}>
        <p className={styles.font1}>채택률</p>
        <p className={styles.font2}>{data.adoptCommentPercent}%</p>
      </div>
    </>
  );
}
