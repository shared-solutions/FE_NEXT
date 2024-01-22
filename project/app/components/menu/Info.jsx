import styles from "@/app/modules/menuCss/info.module.scss";
import styles2 from "@/app/modules/menuCss/menu.module.scss";

export default function Info() {
  return (
    <>
      <div className={styles.info}>
        <p className={styles.name}>psward73님</p>
        <div className={styles.rank}>Lv.1 박사</div>
      </div>
      <div className={styles.rowContainer}>
        <div className={styles.colContainer}>
          <p className={styles.boldText}>보유 포인트</p>
          <p className={styles.text}>2,554pt</p>
        </div>
        <div className={styles.colContainer}>
          <p className={styles.boldText}>추천 수</p>
          <p className={styles.text}>847개</p>
        </div>
      </div>
    </>
  );
}
