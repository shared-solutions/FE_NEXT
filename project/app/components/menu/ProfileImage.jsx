import Image from "next/image";
import styles from "@/app/modules/menuCss/profileImage.module.scss";
import default_image from "@/app/public/image/default_image.png";
import edit from "@/app/public/image/edit.png";
default_image.png;
export default function ProfileImage() {
  return (
    <div className={styles.imgContainer}>
      <Image
        src={default_image}
        alt="default image"
        className={styles.imageShadow}
        width={85}
        height={85}
      />
      <Image
        src={edit}
        alt="edit"
        className={styles.edit}
        width={27}
        height={27}
      />
    </div>
  );
}