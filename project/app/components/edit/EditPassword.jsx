"use client";
import { useState } from "react";
import Image from "next/image";
import password from "@/app/public/image/password.png";
import CloseImg from "./CloseImg";
import styles from "@/app/modules/editCss/editinfo.module.scss";

export default function EditPassword({userData}) {
  const [isEditing, setIsEditing] = useState(false);
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
            <input type="password" placeholder="현재 비밀번호 입력" />
            <button>인증</button>
          </div>
          <div className={styles.input_container}>
            <input
              type="password"
              placeholder="변경할 비밀번호 입력"
              onChange={(e) => updateField("password", e.target.value)}
            />
          </div>
          <div className={styles.input_container}>
            <input type="password" placeholder="변경할 비밀번호 확인" />
          </div>
        </div>
      )}
    </div>
  );
}
