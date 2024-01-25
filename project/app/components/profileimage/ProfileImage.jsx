import Image from "next/image";
import styles from "@/app/modules/profileImageCss/profileImage.module.scss";
import default_image from "../../public/image/default_image.png";
import edit from "../../public/image/edit.png";

export default function Profile() {
  return (
    <div className={styles.imgContainer}>
      <Image
        src={default_image}
        alt="default image"
        className={styles.imageShadow}
        width={95}
        height={95}
      />
      <Image
        src={edit}
        alt="edit"
        className={styles.edit}
        width={45}
        height={45}
      />
    </div>
  );
}
