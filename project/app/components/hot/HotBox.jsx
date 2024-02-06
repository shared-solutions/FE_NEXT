import styles from "@/app/modules/hotCss/hotbox.module.scss";
import hotimg from "@/app/public/image/hotback.png";

const HotBox = ({ image, title, content }) => {
  // 이미지 받아오는 작업 해야됌
  return (
    <div className={styles.mainbox}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default HotBox;
