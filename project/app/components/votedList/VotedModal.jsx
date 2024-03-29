"user clinet";
import React, { useState } from "react";
import styles from "@/app/modules/votedListCss/votedmodal.module.scss";
import Image from "next/image";

import GridViewItem from "./GridViewItem";
import LineViewItem from "./LineViewItem";

import downimg from "@/app/public/image/down.png";
import gridview from "@/app/public/image/grid_view.png";
import gridViewGrey from "@/app/public/image/grid_view_grey.png";
import lineview from "@/app/public/image/line_view.png";
import lineViewGrey from "@/app/public/image/line_view_grey.png";

const VotedModal = ({ onClose }) => {
  const [selectedStyle, setSelectedStyle] = useState("grid"); // 기본값을 그리드로 설정

  const renderViewItem = () => {
    switch (selectedStyle) {
      case "line":
        return <LineViewItem onClose={onClose} />; // LineViewItem 컴포넌트를 렌더링
      default:
        return <GridViewItem onClose={onClose} />; // GridViewItem 컴포넌트를 렌더링
    }
  };

  return (
    <div className={styles.modal_Overlay}>
      <div className={styles.modal_container}>
        <div className={styles.modal_content}>
          {/* 상단 바 고정 */}
          <button onClick={onClose} className={styles.closeButton}>
            <Image
              src={downimg}
              style={{
                width: 23,
                height: 10,
              }}
              alt="down/"
            />
          </button>
          {/* ---- 컨텐츠 시작 ---- */}
          <div className={styles.modal_innerContent}>
            <div className={styles.header}>
              <p>내 투표</p>
              <div className={styles.choice_container}>
                <Image
                  src={selectedStyle === "grid" ? gridview : gridViewGrey}
                  style={{
                    width: 16,
                    height: 16,
                    cursor: "pointer",
                  }}
                  alt="이미지"
                  onClick={() => setSelectedStyle("grid")}
                />
                <Image
                  src={selectedStyle === "line" ? lineview : lineViewGrey}
                  style={{
                    width: 16,
                    height: 16,
                    marginLeft: 18,
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedStyle("line")}
                  alt="이미지"
                />
              </div>
            </div>
            <div className={styles.box_container}>
              {/* 기본 값으로 그리드 스타일의 항목 렌더링 */}
              {renderViewItem()}
            </div>
          </div>
          {/* ---- 컨텐츠 끝 ---- */}
        </div>
      </div>
    </div>
  );
};

export default VotedModal;
