"use client";
import styles from "@/app/modules/hotCss/hot.module.scss";
import hotimg from "../../public/image/hotimg.png";
import vectorimg from "../../public/image/Vector.png";
import Image from "next/image";
import HotBox from "./HotBox";

const Hot = () => {
  return (
    <>
      {/* logo */}
      <div className={styles.title}>
        지금 가장 핫한 고민투표
        <Image
          src={hotimg}
          alt="핫한 고민투표 이미지"
          className={styles.hotimg}
          width={15}
          height={15}
        />
        <button className={styles.morebtn}>
          더보기 <Image src={vectorimg} alt="벡터" width={5} height={10} />
        </button>
      </div>

      <div className={styles.boxlay}>
        <HotBox />
        <HotBox />
        <HotBox />
        <HotBox />
        <HotBox />
      </div>
    </>
  );
};

export default Hot;
