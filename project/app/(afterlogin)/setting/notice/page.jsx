"use client";
import { useEffect, useState } from "react";
import styles from "@/app/modules/settingCss/notice.module.scss";
import Header from "@/app/components/setting/Header";
import Image from "next/image";
import logo_image from "@/app/public/image/logo_image.png";

export default function Notice() {
  const [noticeList, setNoticeList] = useState([]);
  const getNoticeList = async () => {
    try {
      const page = 0;
      const atkToken = localStorage.getItem("token");
      const url = new URL(
        "https://dev.gomin-chingu.site/user/my-page/setting/notice"
      );
      url.searchParams.append("page", page);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          atk: atkToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Notice data:", data);
        setNoticeList(data.result.noticeList);
      } else {
        console.error("Failed to get Notice data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    getNoticeList();
  }, []);

  return (
    <div className={styles.container}>
      <Header text="공지사항" />
      <div className={styles.contentContainer}>
        {noticeList.map((notice, index) => (
          <div className={styles.content} key={index}>
            <Image src={notice.adminImage} alt="image" width={16} height={16} />
            <div className={styles.content_text}>
              <div className={styles.text_container}>
                <p style={{ fontWeight: "bold" }}>{notice.title}</p>
                <p style={{ color: "#A5A5A5" }}>{notice.ago}일전</p>
              </div>
              <p style={{ color: "#595959" }}>{notice.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
