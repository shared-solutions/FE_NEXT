import Image from "next/image";
import styles from "../../app/modules/vote.module.scss";
import like from "../public/image/like.png";
import comment from "../public/image/comment.png";

export default function Vote({ day, header, text }) {
  return (
    <div className={`${styles.votecontainer} ${styles.shadow}`}>
      <p>{day} 일 전</p>
      <h3>{header}</h3>
      <p style={{ "line-height": "150%" }}>{text}</p>
      <div className={styles.rightContainer}>
        <Image src={like} alt="like" />
        <p style={{ color: "#F9C81C" }}>3</p>
        <Image src={comment} alt="comment" />
        <p>2</p>
      </div>
    </div>
  );
}
