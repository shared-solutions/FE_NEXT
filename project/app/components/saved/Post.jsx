import Image from "next/image";
import like from "../../public/image/like.png";
import comment from "../../public/image/comment.png";
import styles from "../../modules/savedCss/post.module.scss";

export default function Form({ day, header, text, like_num, comment_num }) {
  return (
    <div className={styles.post}>
      <div className={styles.rightContainer}>
        <p>{day}일전</p>
      </div>
      <h1>{header}</h1>
      <p style={{ minHeight: "7vh" }}>{text}</p>
      <div className={styles.imgContainer}>
        <Image src={like} alt="like" width={16} height={16} />
        <p style={{ color: "#F9C81C" }}>{like_num}</p>
        <Image src={comment} alt="comment" width={16} height={16} />
        <p>{comment_num}</p>
      </div>
    </div>
  );
}
