import React, { useRef } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styles from "@/app/modules/commentCss/bottom.module.scss";

export const Bottom = ({ title, component, onClose }) => {
  const sheetRef = useRef(null);

  let defaultSnap = 500;
  if (title === "댓글") {
    defaultSnap = 800;
  }

  return (
    <BottomSheet
      open
      ref={sheetRef}
      onDismiss={onClose}
      defaultSnap={defaultSnap}
      snapPoints={({ maxHeight }) => [
        maxHeight - 100,
        maxHeight * 0.5,
        maxHeight * 0.1,
      ]}
    >
      <div className={styles.title}>{title}</div>
      {component}
    </BottomSheet>
  );
};
