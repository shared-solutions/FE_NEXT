import Link from "next/link";
import Image from "next/image";
import close from "@/app/public/image/close.ico";
import styles from "@/app/modules/settingCss/ask.module.scss";

export default function Header({ text }) {
  return (
    <div className={styles.prev}>
      <h3>{text}</h3>
      <Link href="/home">
        <Image src={close} alt="close" />
      </Link>
    </div>
  );
}
