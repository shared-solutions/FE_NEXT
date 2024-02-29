import Image from "next/image";
import styles from "@/app/modules/menuCss/menu.module.scss";
import close from "../../public/image/close.ico";

export default function Close({ onClose }) {

  return (
    <div className={styles.close}>
      <p>닫기</p>
      <Image
        onClick={onClose}
        src={close}
        alt="close"
        width={25}
        height={25}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
