import React from 'react';
import styles from "@/app/modules/postListCss/imageModal.module.scss";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent}>
        <img src={imageUrl} alt="확대 이미지" />
      </div>
    </div>
  );
};

export default ImageModal;
