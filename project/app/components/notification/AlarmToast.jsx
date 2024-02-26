import React, { useEffect } from "react";
import styles from "@/app/modules/notificationCss/alarmtoast.module.scss";
import Image from "next/image";
import info from "@/app/public/image/info.png";
import Link from "next/link";

const AlarmToast = ({ content, show }) => {
  return (
    <>
      {show && (
        <Link
          href={`/viewdetail/${content.postId}`}
          style={{ textDecoration: "none", color: "black", margin: 0 }}
        >
          <div className={styles.toast}>
            <Image
              src={content.userPhoto ? content.userPhoto : info}
              alt="info"
              width={20}
              height={20}
              style={{ position: "fixed", top: "25%", borderRadius: "50%" }}
            />
            <div className={styles.toastContent}>
              <h4>{content.alarmContent}</h4>
              <p>
                {content.commentContent === null
                  ? "해당 투표가 마감되었습니다."
                  : content.commentContent}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default AlarmToast;
