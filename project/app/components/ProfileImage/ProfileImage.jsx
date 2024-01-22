import Image from "next/image";
import styles from "@/app/modules/profileImageCss/profileImage.module.scss";
import default_image from "../../public/image/default_image.png";
import edit from "../../public/image/edit.png";

export default function ProfileImage() {
  return (
    <div className={styles.imgContainer}>
      <Image
        src={default_image}
        alt="default image"
        className={styles.imageShadow}
        width={120}
        height={120}
      />
      <Image
        src={edit}
        alt="edit"
        className={styles.edit}
        width={60}
        height={60}
      />
    </div>
  );
}
