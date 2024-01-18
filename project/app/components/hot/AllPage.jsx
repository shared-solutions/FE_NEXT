import Image from "next/image";
import vector from "@/app/public/image/Vector.png";
import styles from "@/app/modules/hotCss/allpage.module.scss";
import AllPageBox from "./AllPageBox";
import { PageRendering } from "@/app/zustand/store";

const AllPage = () => {
  const backPage = PageRendering((state) => state.backPage);
  const title = PageRendering((state) => state.title);
  const img = PageRendering((state) => state.img);
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
        {title}
        <Image
          src={img}
          alt="이미지"
          className={styles.hotimg}
          width={23}
          height={23}
        />
      </div>

      <div>
        <AllPageBox />
        <AllPageBox />
        <AllPageBox />
        <AllPageBox />
      </div>
    </>
  );
};

export default AllPage;
