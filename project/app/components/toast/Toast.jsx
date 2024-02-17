import React, { useState, useEffect } from "react";
import styles from "@/app/modules/toastCss/toast.module.scss";

const Toast = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${visible ? styles.visible : ""}`}>
      <div className={styles.toastContent}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;
