"use client";
import { useState, useEffect } from "react";
import styles from "@/app/modules/settingCss/help.module.scss";
import Header from "@/app/components/setting/Header";

export default function Privacy() {
  const [term, setTerm] = useState([]);
  const getTerm = async () => {
    try {
      const url = new URL(
        "https://dev.gomin-chingu.site/user/my-page/setting/privacy"
      );
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Notice data:", data);
        setTerm(data.result.content);
      } else {
        console.error("Failed to get Notice data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    getTerm();
  }, []);
  return (
    <div className={styles.container}>
      <Header text="이용 약관" />
      <div className={styles.text_container}>
        <p>{term}</p>
      </div>
    </div>
  );
}
