"use client";
import styles from "@/app/modules/reviewCss/button.module.scss";
import { motion } from "framer-motion";

const Header = ({ sortBy, onButtonClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sorting_button_container}>
        <motion.button
          className={`${styles.button} ${sortBy === 0 ? "" : styles.disabled}`}
          onClick={() => {
            onButtonClick(0);
          }}
          whileTap={{
            scale: 0.5,
            opacity: 0.6,
          }}
        >
          조회순
        </motion.button>
        <motion.button
          className={`${styles.button} ${sortBy === 1 ? "" : styles.disabled}`}
          onClick={() => {
            onButtonClick(1);
          }}
          whileTap={{
            scale: 0.5,
            opacity: 0.6,
          }}
        >
          최신순
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
