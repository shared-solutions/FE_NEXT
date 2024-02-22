"use client";
import { useState } from "react";
import Image from "next/image";
import password from "@/app/public/image/password.png";
import CloseImg from "./CloseImg";
import styles from "@/app/modules/editCss/editinfo.module.scss";
import { modifyPassword } from "@/app/api/user/modify/modify";

export default function EditPassword() {
  const [curPassword, SetCurPassword] = useState("");
  const [changePassword, SetChangePassword] = useState("");
  const [checkPassword, SetCheckPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleModification = async () => {
    try {
      await modifyPassword(curPassword, changePassword, checkPassword);
      setIsEditing(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.grid}>
      <Image src={password} alt="password" style={{ marginLeft: "0.08rem" }} />
      <p>비밀번호</p>
      {isEditing ? (
        <CloseImg onClick={() => setIsEditing(!isEditing)} />
      ) : (
        <p className={styles.yellow} onClick={() => setIsEditing(!isEditing)}>
          수정
        </p>
      )}
      {isEditing && (
        <div className={styles.container}>
          <div className={styles.input_container}>
            <input
              type="password"
              placeholder="현재 비밀번호 입력"
              onChange={(e) => SetCurPassword(e.target.value)}
            />
          </div>
          <div className={styles.input_container}>
            <input
              type="password"
              placeholder="변경할 비밀번호 입력"
              onChange={(e) => SetChangePassword(e.target.value)}
            />
          </div>
          <div className={styles.input_container}>
            <input
              type="password"
              placeholder="변경할 비밀번호 확인"
              onChange={(e) => SetCheckPassword(e.target.value)}
            />
            <button onClick={handleModification}>변경</button>
          </div>
        </div>
      )}
    </div>
  );
}
