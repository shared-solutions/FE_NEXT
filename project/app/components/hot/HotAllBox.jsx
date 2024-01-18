import styles from "@/app/modules/hotCss/hotallbox.module.scss";
import userimg from "@/app/public/image/userimg.png";
import Image from "next/image";

const HotAllBox = () => {
  return (
    <div className={styles.box}>
      <div>
        <Image
          src={userimg}
          className={styles.userimg}
          alt="유저 이미지"
          width={37}
          height={37}
        />
      </div>
    </div>
  );
};

export default HotAllBox;
