"use client";
import { useState, useEffect } from "react";
import styles from "@/app/modules/menuCss/menu.module.scss";
import ProfileImage from "@/app/components/menu/ProfileImage";
import Info from "@/app/components/menu/Info";
import Category from "@/app/components/menu/Category";
import Features from "@/app/components/menu/Features";
import Close from "@/app/components/menu/Close";
import { motion, AnimatePresence } from "framer-motion";

export default function MyPage({ isOpen, onClose }) {
  const [userData, setUserData] = useState([]);

  const getMyPage = async () => {
    try {
      const atkToken = localStorage.getItem("token");
      const url = "https://dev.gomin-chingu.site/user/my-page"; // API 엔드포인트 URL로 교체
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          atk: atkToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.result);
        console.log("MyPage data:", data);
      } else {
        console.error("Failed to get MyPage data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getMyPage();
  }, []);

  const handleClickOutside = (e) => {
    // 모달 바깥 부분을 클릭했을 때만 닫기
    if (isOpen && e.target.classList.contains(styles.background)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modal} onClick={handleClickOutside}>
          <motion.div
            className={styles.background}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%", transition: { duration: 0.5 } }}
            exit={{
              opacity: 0,
              x: "100%",
              transition: { duration: 0.5 },
            }}
          >
            <Close onClose={onClose} />
            <div
              className={styles.container}
              onClick={() => {
                onClose();
              }}
            >
              <ProfileImage image={userData.userPhoto} />
              <Info userData={userData} />
              <Category />
              <Features />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
