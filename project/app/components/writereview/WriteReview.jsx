"use client";
import styles from "@/app/modules/writepostCss/writepost.module.scss";
import WriteReviewHeader from "./WriteReviewHeader";
import WriteReviewFooter from "./WriteReviewFooter";
import useSelectedBox from "@/app/zustand/selectionStore";
import { useEffect, useState } from "react";

const WriteReview = () => {
  const { selectedBoxData } = useSelectedBox();

  useEffect(() => {
    // Zustand에서 가져온 데이터가 변경될 때마다 UI 업데이트
    if (selectedBoxData) {
      // 여기서 가져온 데이터를 UI에 적용하거나 로직을 수행할 수 있습니다.
      console.log("Selected Box Data:", selectedBoxData);
    }
  }, [selectedBoxData]);
  return (
    <div>
      <div className={styles.container}>
        <WriteReviewHeader />
        <div className={styles.content_container}>
          <input className={styles.title} type="text" placeholder="제목" />
          <div>
            <textarea
              className={styles.content}
              placeholder="함께 공유하고 싶은 내용을 남겨보세요."
            />
            <div>
              {/* 여기서 Zustand에서 가져온 데이터를 UI에 표시 */}
              {selectedBoxData && (
                <div>
                  <p>Selected Box Data:</p>
                  <p>{selectedBoxData.top}</p>
                  <p>{selectedBoxData.title}</p>
                  <p>{selectedBoxData.content}</p>
                  <p>{selectedBoxData.goodCount}</p>
                  <p>{selectedBoxData.messageCount}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <input className={styles.tag} type="text" placeholder="# 태그입력" />
        <WriteReviewFooter />
      </div>
    </div>
  );
};

export default WriteReview;
