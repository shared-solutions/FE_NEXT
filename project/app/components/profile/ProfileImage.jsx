import Image from "next/image";
import styles from "@/app/modules/profileCss/profileImage.module.scss";
import default_image from "../../public/image/default_image.png";
import edit from "../../public/image/edit.png";

export default function Profile() {
  return (
    <div className={styles.imgContainer}>
      <Image
        src={default_image}
        alt="default image"
        className={styles.imageShadow}
        width={105}
        height={105}
      />
      <Image
        src={edit}
        alt="edit"
        className={styles.edit}
        width={32}
        height={32}
      />
    </div>
  );
}
