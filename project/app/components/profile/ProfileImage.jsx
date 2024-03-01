import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/modules/profileCss/profileImage.module.scss";
import defaultUserImg from "../../public/image/defaultUserImg.png";
import edit from "../../public/image/edit.png";

export default function Profile({image}) {
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
        width={105}
        height={105}
      />}
      <Image
        src={edit}
        alt="edit"
        className={styles.edit}
        width={32}
        height={32}
        onClick={() => router.push("/profile/edit")}
      />
    </div>
  );
}
