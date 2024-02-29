import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/modules/menuCss/profileImage.module.scss";
import defaultUserImg from "@/app/public/image/defaultUserImg.png";
import edit from "@/app/public/image/edit.png";

export default function ProfileImage({image}) {
  const router = useRouter();
  return (
    <div className={styles.imgContainer}>
       {image ? <Image
        src={image}
        alt="user image"
        className={styles.imageShadow}
        width={105}
        height={105}
      />:<Image
        src={defaultUserImg}
        alt="default image"
        className={styles.imageShadow}
        width={85}
        height={85}
      />}
      <Image
        src={edit}
        alt="edit"
        className={styles.edit}
        width={27}
        height={27}
        onClick={() => router.push("/profile/edit")}
      />
    </div>
  );
}