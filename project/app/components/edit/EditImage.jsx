"use client";
import { useState } from "react";
import CloseImg from "./CloseImg";
import styles from "@/app/modules/editCss/editinfo.module.scss";
import { modifyProfileImage } from "@/app/api/user/modify/modify";

export default function EditImage({ userData }) {
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <div className={styles.name}>
        <h3>{userData.nickName}님</h3>
        {isEditing ? (
          <CloseImg onClick={() => setIsEditing(!isEditing)} />
        ) : (
          <p className={styles.yellow} onClick={() => setIsEditing(!isEditing)}>
            이미지 수정
          </p>
        )}
      </div>
      {isEditing && (
        <div className={styles.input_nickname}>
          <input
            type="file"
            placeholder="변경할 이미지 등록"
            onChange={handleFileChange}
          />
          <button onClick={() => modifyProfileImage(file)}>등록</button>
        </div>
      )}
    </>
  );
}
