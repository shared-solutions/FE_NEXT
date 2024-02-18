"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/modules/notificationCss/notification.module.scss";
import arrow2 from "../../public/image/arrow2.png";
import more_button from "@/app/public/image/more_button.png";

import Content from "@/app/components/notification/Content";
import { handleLogin } from "@/app/api/user/login/login";
import { getAlarmList } from "@/app/api/user/alarm/alarm";

export default function Home() {
  const [alarmList, setAlarmList] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [readAllAlarm, setReadAllAlarm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleLogin();
        console.log("Fetching MyPage data...");
        const result = await getAlarmList();
        setAlarmList(result);
        console.log("MyPage data fetched successfully!");
      } catch (error) {
        console.error("Error fetching MyPage data:", error);
      }
    };
    fetchData();
  }, []);

  const clickHandler = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <div className={styles.container}>
      {alarmList.length > 0 ? (
        <>
          <div className={styles.prev}>
            <Link href="/home">
              <Image src={arrow2} alt="previous" />
            </Link>
            <h3>알림</h3>
          </div>
          <Image
            src={more_button}
            alt="button"
            className={styles.moreImg}
            onClick={clickHandler}
          />
        </>
      ) : (
        <h3 style={{ marginTop: "25%", marginLeft: "10%" }}>Loading...</h3>
      )}
      {isButtonClicked ? (
        <div className={styles.more_container}>
          <p
            onClick={() => {
              setReadAllAlarm(true);
              clickHandler();
            }}
          >
            모두 읽음 처리
          </p>
          <p onClick={() => clickHandler()}>알림 끄기</p>
        </div>
      ) : (
        ""
      )}
      <div className={styles.contentContainer}>
        {alarmList &&
          alarmList.map((data, index) => (
            <Content key={index} alarm={readAllAlarm} data={data} />
          ))}
      </div>
    </div>
  );
}
