import styles from "@/app/modules/menuCss/info.module.scss";

export default function Info({ userData }) {
  return (
    <>
      <div className={styles.info}>
        <p className={styles.name}>{userData.userName}님</p>
        <div className={styles.rank}>
          Lv.{userData.userLevelInt} {userData.userLevelName}
        </div>
      </div>
      <div className={styles.rowContainer}>
        <div className={styles.colContainer}>
          <p className={styles.boldText}>보유 포인트</p>
          <p className={styles.text}>{userData.userPoint}pt</p>
        </div>
        <div className={styles.colContainer}>
          <p className={styles.boldText}>추천 수</p>
          <p className={styles.text}>{userData.userRecommend}개</p>
        </div>
      </div>
    </>
  );
}
