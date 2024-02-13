"use client";
import { useState } from "react";
import Image from "next/image";
import mail from "@/app/public/image/mail.png";
import CloseImg from "./CloseImg";
import styles from "@/app/modules/editCss/editinfo.module.scss";

export default function EditSecurityEmail() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className={styles.grid}>
      <Image src={mail} alt="mail" width={18} height={18} />
      <p>보안 인증 메일</p>
      {isEditing ? (
        <CloseImg onClick={() => setIsEditing(!isEditing)} /> 
      ) : (
        <p className={styles.yellow} onClick={() => setIsEditing(!isEditing)} >
          수정
        </p>
      )}
      {isEditing && (
        <div className={styles.container}>
          <div className={styles.input_container}>
            <input type="email" placeholder="현 이메일 주소" />
            <button>인증</button>
          </div>
          <div className={styles.input_container}>
            <input type="number" placeholder="인증번호 입력" />
            <button>인증 확인</button>
          </div>
          <div className={styles.input_container}>
            <input type="email" placeholder="새로운 이메일 주소" />
            <button>인증</button>
          </div>
          <div className={styles.input_container}>
            <input type="number" placeholder="인증번호 입력" />
            <button>인증 확인</button>
          </div>
        </div>
      )}
    </div>
  );
}
