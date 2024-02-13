"use client";
import { useState } from "react";
import Image from "next/image";
import mail from "@/app/public/image/mail.png";
import CloseImg from "./CloseImg";
import styles from "@/app/modules/editCss/editinfo.module.scss";
import { mailSend } from "@/app/api/user/login/login";

export default function EditEmail({ userData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [authNum, setAuthNum] = useState("");

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
  };

  const handleMailSend = async () => {
    try {
      console.log(email);
      const result = await mailSend(email);
      console.log("Mail send result:", result);
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

  return (
    <div className={styles.grid}>
      <Image src={mail} alt="mail" />
      <p>{userData.email}</p>
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
              type="email"
              placeholder="현 이메일 주소 입력"
              onChange={handleEmailChange}
            />
            <button onClick={mailSend(email)}>인증</button>
          </div>
          <div className={styles.input_container}>
            <input
              type="number"
              placeholder="인증번호 입력"
              onChange={(e) => setAuthNum(e.target.value)}
            />
            <button>인증 확인</button>
          </div>
          <div className={styles.input_container}>
            <input
              type="email"
              placeholder="변경하고자 하는 메일을 입력해주세요"
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </div>
        </div>
      )}
    </div>
  );
}
