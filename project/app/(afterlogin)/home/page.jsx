"use client";
import Hot from "@/app/components/hot/Hot";
import AllPage from "@/app/components/hot/AllPage";
import WaitingAnswer from "@/app/components/waitinganswer/WaitingAnswer";
import styles from "@/app/modules/homeCss/home.module.scss";
import { PageRendering } from "@/app/zustand/store";
import HomeWriteButtonLay from "@/app/components/waitinganswer/HomeWriteButtonLay";
import HomePoint from "@/app/components/waitinganswer/HomePoint";

export default function Home() {
  const statePage = PageRendering((state) => state.activePage);

  return (
    <div className={styles.container}>
      {statePage === "originalPage" ? (
        <>
          <div>
            <Hot />
          </div>
          <div>
            <WaitingAnswer />
          </div>
          <div>
            <HomeWriteButtonLay />
          </div>
          <div>
            <HomePoint />
          </div>
        </>
      ) : statePage === "viewPage" ? (
        <div>
          <AllPage />
        </div>
      ) : null}
    </div>
  );
}
