import Image from "next/image";
import styles from "@/app/modules/menuCss/profileImage.module.scss";
import default_image from "../../public/image/default_image.png";
import edit from "../../public/image/edit.png";

export default function ProfileImage({ image }) {
  // 사용자 이미지 가져오기 null 이면 default
 
  return (
    <div className={styles.imgContainer}>
      {image ? (
        <Image
          src={image}
          alt="user image"
          className={styles.imageShadow}
          width={88}
          height={88}
        />
      ) : (
        <Image
          src={default_image}
          alt="default image"
          className={styles.imageShadow}
          width={88}
          height={88}
        />
      )}
      <Image
        src={edit}
        alt="edit"
        className={styles.edit}
        width={26}
        height={26}
      />
    </div>
  );
}
