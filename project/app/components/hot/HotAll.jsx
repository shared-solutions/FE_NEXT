import Image from "next/image";
import hotimg from "@/app/public/image/hotimg.png";
import vector from "@/app/public/image/Vector.png";
import styles from "@/app/modules/hotCss/hotall.module.scss";
import HotAllBox from "./HotAllBox";
import { PageRendering } from "@/app/zustand/store";

const HotAll = () => {
  const backPage = PageRendering((state) => state.backPage);

  return (
    <>
      <Image
        src={vector}
        style={{ marginTop: "10px" }}
        onClick={backPage}
        alt="돌아가기"
        width={10}
        height={15}
      />
      <div className={styles.title}>
        지금 가장 핫한 고민투표
        <Image
          src={hotimg}
          alt="핫한 고민투표 이미지"
          className={styles.hotimg}
          width={15}
          height={15}
        />
      </div>

      <div>
        <HotAllBox />
      </div>
    </>
  );
};

export default HotAll;
