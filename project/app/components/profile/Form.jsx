import Image from "next/image";
import user_image from "../../public/image/user_image.png";
import like from "../../public/image/like.png";
import comment from "../../public/image/comment.png";
import styles from "../../modules/profileCss/form.module.scss";

export default function Form({ name, time, text }) {
  return (
    <div className={`${styles.container} ${styles.shadow}`}>
      <div className={styles.rowContainer}>
        <Image src={user_image} alt="image" />
        <p>{name}</p>
        <p>{time}</p>
      </div>
      <p style={{ lineHeight: "150%" }}>{text}</p>
      <div className={styles.rightContainer}>
        <Image src={like} alt="like" width={16} height={16} />
        <p style={{ color: "#F9C81C" }}>3</p>
        <Image src={comment} alt="comment" width={16} height={16} />
        <p>2</p>
      </div>
    </div>
  );
}
