"use client";
import Hot from "@/app/components/hot/Hot";
import HotAll from "@/app/components/hot/HotAll";
import WaitingAnswer from "@/app/components/waitinganswer/WaitingAnswer";
import styles from "@/app/modules/homeCss/home.module.scss";
import { PageRendering } from "@/app/zustand/store";

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
        </>
      ) : statePage === "viewPage" ? (
        <div>
          <HotAll />
        </div>
      ) : null}
    </div>
  );
}
