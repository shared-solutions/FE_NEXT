import Image from "next/image";
import arrow from "../../public/image/arrow.png";
import styles from "@/app/modules/menuCss/menu.module.scss";

export default function Icon({ text, onClick }) {
  return (
    <div className={styles.grid} onClick={onClick}>
      <p>{text}</p>
      <Image src={arrow} alt={text} width={13} height={13} />
    </div>
  );
}
