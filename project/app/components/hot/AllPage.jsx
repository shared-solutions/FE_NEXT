"use client";
import Image from "next/image";
import vector from "@/app/public/image/Vector.png";
import styles from "@/app/modules/hotCss/allpage.module.scss";
import AllPageBox from "./AllPageBox";
import { PageRendering } from "@/app/zustand/store";
import Link from "next/link";
import { voteData } from "@/app/DATA/dummyData";

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

      <div className={styles.linkContainer}>
        {voteData.map((vote, index) => (
          <Link className={styles.link} href={`/viewdetail/${vote.reviewId}`}>
            <AllPageBox
              key={index}
              userimg={vote.userimg}
              nickname={vote.nickname}
              title={vote.title}
              content={vote.content}
              selectImgList={vote.selectImgList}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default AllPage;
