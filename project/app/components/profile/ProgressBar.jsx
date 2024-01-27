import React from "react";
import styles from "../../modules/profileCss/progressBar.module.scss";

const ProgressBar = ({ bgcolor, completed }) => {
  return (
    <div className={styles.containerStyles}>
      <div
        style={{ backgroundColor: bgcolor, width: `${completed}%` }}
        className={styles.fillerStyles}
      >
        <span className={styles.labelStyles} />
      </div>
    </div>
  );
};

export default ProgressBar;
