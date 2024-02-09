import Link from "next/link";
import Image from "next/image";

export default function Setting() {
  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <Link href="/menu">
          <Image src={arrow2} alt="previous" />
        </Link>
        <h3>저장된 게시물</h3>
      </div>
    </div>
  );
}
