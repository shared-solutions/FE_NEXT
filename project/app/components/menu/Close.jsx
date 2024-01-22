import Link from "next/link";
import Image from "next/image";
import styles from "@/app/modules/menuCss/menu.module.scss";
import close from "../../public/image/close.ico";

export default function Close() {
  return (
    <div className={styles.close}>
      <p>닫기</p>
      <Link href="/home">
        <Image
          src={close}
          alt="close"
          width={40}
          height={40}
          padding={8}
          style={{ cursor: "pointer" }}
        />
      </Link>
    </div>
  );
}
