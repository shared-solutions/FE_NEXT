import Link from "next/link";

import Image from "next/image";
import profile from "../../public/image/profile.png";
import save from "../../public/image/save.png";
import styles from "@/app/modules/menuCss/category.module.scss";

export default function Menu() {
  return (
    <div className={`${styles.rowContainer} ${styles.withBorderTop}`}>
      <Link href="/profile">
        <div className={styles.colContainer} style={{ cursor: "pointer" }}>
          <Image src={profile} alt="profile" width={23} height={23} />
          <p className={styles.text}>나의 프로필</p>
        </div>
      </Link>
      <Link href="/saved">
        <div className={styles.colContainer}>
          <Image src={save} alt="save" width={18} height={22} />
          <p className={styles.text}>저장한 게시물</p>
        </div>
      </Link>
    </div>
  );
}
