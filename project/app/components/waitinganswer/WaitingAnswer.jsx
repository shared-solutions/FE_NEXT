import styles from "@/app/modules/waitCss/wait.module.scss";
import WaitingBox from "./WaitingBox";
import waitimg from "@/app/public/image/waitimg.png";
import vectorimg from "@/app/public/image/Vector.png";
import Image from "next/image";
import { PageRendering } from "@/app/zustand/store";

const WaitingAnswer = () => {
  const changePage = PageRendering((state) => state.changePageWait);
  return (
    <>
      <div className={styles.title}>
        답변을 기다리는 고민들
        <Image
          className={styles.waitimg}
          src={waitimg}
          alt="눈 이미지"
          width={23}
          height={23}
        />
        <button className={styles.morebtn} onClick={changePage}>
          더보기 <Image src={vectorimg} alt="벡터" width={5} height={10} />
        </button>
      </div>
      <div className={styles.boxlay}>
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
      </div>
    </>
  );
};

export default WaitingAnswer;
