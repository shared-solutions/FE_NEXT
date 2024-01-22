import Link from "next/link";

import Image from "next/image";
import profile from "../../public/image/profile.png";
import qna from "../../public/image/qna.png";
import save from "../../public/image/save.png";
import styles from "@/app/modules/menuCss/category.module.scss";

export default function Menu() {
  return (
    <div className={`${styles.rowContainer} ${styles.withBorderTop}`}>
      <div className={styles.colContainer}>
        <Image src={qna} alt="qna" width={30} height={30} />
        <p className={styles.text}>나의 Q&A</p>
      </div>
      <Link href="/profile">
        <div className={styles.colContainer} style={{ cursor: "pointer" }}>
          <Image src={profile} alt="profile" width={33} height={33} />
          <p className={styles.text}>프로필</p>
        </div>
      </Link>
      <div className={styles.colContainer}>
        <Image src={save} alt="save" width={24} height={31} />
        <p className={styles.text}>저장한 게시물</p>
      </div>
    </div>
  );
}
