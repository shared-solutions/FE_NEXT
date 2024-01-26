import Link from "next/link";
import Image from "next/image";

import styles from "@/app/modules/profileCss/profileHeader.module.scss";
import arrow2 from "../../public/image/arrow2.png";
// import header from "../../public/image/header.png";

export default function profileHeader() {
  return (
    <div className={styles.prev}>
      <Link href="/menu">
        <Image src={arrow2} alt="previous" />
      </Link>
      <h3>프로필</h3>
    </div>
  );
}
