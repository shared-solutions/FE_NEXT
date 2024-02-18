"use client";
import { useState } from "react";
import Image from "next/image";
import mail from "@/app/public/image/mail.png";
import CloseImg from "./CloseImg";
import styles from "@/app/modules/editCss/editinfo.module.scss";
import { mailSend, checkAuthNum } from "@/app/api/user/login/login";
import { modifySecurity } from "@/app/api/user/modify/modify";

export default function EditSecurityEmail({ userEmail }) {
  const [isEditing, setIsEditing] = useState(false);
  const [curEmail, setCurEmail] = useState(userEmail);
  const [authNum, setAuthNum] = useState("");
  const [securityAuthNum, setSecurityAuthNum] = useState("");
  const [securityEmail, setSecurityEmail] = useState("");
  const [isSendCode, setIsSendCode] = useState(false);
  const [isSendSecurityCode, setIsSendSecurityCode] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [securityIsValid, setSecurityIsValid] = useState(false);

  const handleSendEmail = (email) => {
    mailSend(email);
  };
  const handleSecurity = async () => {
    await modifySecurity(curEmail, securityEmail)
    setIsEditing(false);
  }

  return (
    <div className={styles.grid}>
      <Image src={mail} alt="mail" width={18} height={18} />
      <p>보안 인증 메일</p>
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
              placeholder="현 이메일 주소"
              value={userEmail}
              onChange={(e) => setCurEmail(e.target.value)}
              pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"
            />
            <button onClick={handleSendEmail(curEmail)}>인증</button>
          </div>
          {isSendCode ? (
            <p style={{ color: "green", marginLeft: "0.5rem", width: " 100%" }}>
              인증번호를 전송했습니다.
            </p>
          ) : (
            ""
          )}
          <div className={styles.input_container}>
            <input
              type="number"
              placeholder="인증번호 입력"
              onChange={(e) => setAuthNum(e.target.value)}
            />
            <button
              onClick={() => {
                checkAuthNum(curEmail, authNum);
                //setIsValid(true);
              }}
            >
              인증 확인
            </button>
          </div>
          
          <div className={styles.input_container}>
            <input
              type="email"
              placeholder="새로운 이메일 주소"
              onChange={(e) => setSecurityEmail(e.target.value)}
              pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"
            />
            <button onClick={handleSendEmail(securityEmail)}>인증</button>
          </div>
          {/*{isSendSecurityCode ? (
            <p style={{ color: "green", marginLeft: "0.5rem", width: " 100%" }}>
              인증번호를 전송했습니다.
            </p>
          ) : (
            ""
          )}*/}
          <div className={styles.input_container}>
            <input
              type="number"
              placeholder="인증번호 입력"
              onChange={(e) => setSecurityAuthNum(e.target.value)}
            />
            <button
              onClick={() => {
                handleSecurity(securityEmail, securityAuthNum);
              }}
            >
              인증 확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
