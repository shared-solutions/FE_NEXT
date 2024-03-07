"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/modules/notificationCss/notification.module.scss";
import arrow2 from "../../public/image/arrow2.png";
import more_button from "@/app/public/image/more_button.png";
import Content from "@/app/components/notification/Content";

import { getAlarmList } from "@/app/api/user/alarm/alarm";

export default function Home() {
  const [alarmList, setAlarmList] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [alarmIdList, setAlarmIdList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      console.log("Fetching AlarmList...");
      const result = await getAlarmList(page);
      if (result.length === 0) {
        setHasMoreData(false);
      } else {
        setAlarmList((prevList) => [...prevList, ...result]);

        const unreadAlarms = result.filter((alarm) => !alarm.read);
        const extractedAlarmIds = unreadAlarms.map((alarm) => alarm.alarmId);
        unreadAlarms && setAlarmIdList((prevAlarm) => [...prevAlarm, ...extractedAlarmIds]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching AlarmList data:", error);
    }
  }, [page, alarmIdList]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.scrollHeight;

    if (scrollY + windowHeight >= bodyHeight - 200) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const readAlarmList = async (alarmId) => {
    try {
      const atkToken = localStorage.getItem("token");

      const url = new URL(
        `https://dev.gomin-chingu.site/user/alarm/${alarmId}`
      );

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          atk: atkToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("알림 읽기 성공", data);
      } else {
        console.error("알림 읽기 실패", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const readAllAlarmList = () => {
    if (alarmIdList.length > 0) {
      alarmIdList.forEach(async (alarmId) => {
        await readAlarmList(alarmId);
      });
      readAlarmList().then(() => {
        alert("모두 읽음 처리에 성공했습니다.");
        window.location.reload();
      });
    } else {
      alert("읽을 알림이 없습니다.");
    }
  };

  const clickHandler = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  console.log("최종", alarmIdList);
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
        <h3 style={{ marginTop: "25%", marginLeft: "10%" }}>알림이 없습니다.</h3>
      )}
      {isButtonClicked ? (
        <div className={styles.more_container}>
          <p
            onClick={() => {
              readAllAlarmList();
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
        {alarmList.length === 0 ? <p></p> :
          alarmList
            .slice()
            .reverse()
            .map((data, index) => (
              <Link
                key={data.alarmId}
                href={`/viewdetail/${data.postId}`}
                onClick={() => {
                  readAlarmList(data.alarmId);
                }}
              >
                <Content key={data.alarmId} data={data} />
              </Link>
            ))}
      </div>
    </div>
  );
}
