import Link from "next/link";
import ProfileImage from "@/app/components/profile/ProfileImage";
import Name from "@/app/components/profile/Name";
import Rank from "@/app/components/profile/Rank";
import Adopt from "@/app/components/profile/Adopt";

import styles from "@/app/modules/profileCss/profile.module.scss";
import Image from "next/image";
import arrow2 from "../../public/image/arrow2.png";

export default function Profile() {
  return (
    <div className={styles.background}>
      <div className={styles.prev}>
        <Link href="/menu">
          <Image src={arrow2} alt="previous" width={24} height={24} />
        </Link>
        <h2>프로필</h2>
      </div>
      <div className={styles.container}>
        <ProfileImage />
        <Name />
        <Rank />
        <Adopt />
      </div>
    </div>
  );
}
