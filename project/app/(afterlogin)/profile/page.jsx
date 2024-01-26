import Image from "next/image";
import styles from "@/app/modules/profileCss/profile.module.scss";

import ProfileHeader from "@/app/components/profile/ProfileHeader";
import ProfileImage from "@/app/components/profile/ProfileImage";
import Name from "@/app/components/profile/Name";
import Rank from "@/app/components/profile/Rank";
import Adopt from "@/app/components/profile/Adopt";
import cloud from "../../public/image/cloud.png";
import background from "../../public/image/background.png";

export default function Profile() {
  return (
    <div className={styles.background}>
      <Image src={cloud} alt="cloud" width={400} />
      <ProfileHeader />
      <div className={styles.round}>
        <Image src={background} alt="background" />
      </div>

      <div className={styles.container}>
        <ProfileImage />
        <Name />
        <Rank />
        <Adopt />
        <div className={styles.rowContainer}>
          <h5>나의 Q&A</h5>
        </div>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
        <h1>안녕</h1>
      </div>
    </div>
  );
}
