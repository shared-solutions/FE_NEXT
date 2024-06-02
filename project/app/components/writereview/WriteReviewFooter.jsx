"use client";
import React, { useState, useRef } from "react";
import styles from "@/app/modules/writepostCss/writepostfooter.module.scss";
import Image from "next/image";

import add_button from "@/app/public/image/add_button.png";
import imageicon from "@/app/public/image/imageicon.png";
import barimg from "@/app/public/image/bar.png";
import VotedModal from "../votedList/VotedModal";

const WriteReviewFooter = ({ onUpload }) => {
  const fileInputRef = useRef(null);
  const [isVotedModalOpen, setVotedModalOpen] = useState(false);

  const openVotedModal = () => {
    setVotedModalOpen(true);
  };

  const closeVotedModal = () => {
    setVotedModalOpen(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_add_vote}>
        <Image
          src={add_button}
          style={{ width: 25, height: 25 }}
          alt="이미지"
        />
        <button onClick={openVotedModal} className={styles.add_vote_button}>
          투표 불러오기
        </button>
      </div>
      <div className={styles.footer_menu}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onUpload}
          multiple
        />
        <Image
          src={imageicon}
          style={{ width: 25, height: 25, margin: 20 }}
          onClick={handleImageClick}
          alt="이미지"
        />
        <Image
          src={barimg}
          style={{ width: 2, height: 23, margin: 7 }}
          alt="이미지"
        />
        <button className={styles.save_button}>임시저장</button>
      </div>
      {isVotedModalOpen && <VotedModal onClose={closeVotedModal} />}
    </div>
  );
};

export default WriteReviewFooter;
