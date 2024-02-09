import Image from "next/image";
import styles from "@/app/modules/profileCss/profileImage.module.scss";
import default_image from "../../public/image/default_image.png";

export default function Profile() {
  return (
    <div className={styles.imgContainer}>
      <div className={styles.rank}>Lv.4 초수</div>
      <Image
        src={default_image}
        alt="default image"
        className={styles.imageShadow}
        width={68}
        height={68}
        style={{ marginTop: "1.4rem" }}
      />
    </div>
  );
}
