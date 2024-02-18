"use client";
import { useState } from "react";
import styles from "@/app/modules/editCss/editinfo.module.scss";
import Image from "next/image";
import CloseImg from "./CloseImg";
import profile from "@/app/public/image/profile.png";
import mail from "@/app/public/image/mail.png";
import phone from "@/app/public/image/phone.png";
import { mailSend, checkAuthNum } from "@/app/api/user/login/login";
import {
  modifyNickName,
  modifyEmail,
  modifyPhone,
} from "@/app/api/user/modify/modify";

export default function EditNickName({ userData, type }) {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [authNum, setAuthNum] = useState("");
  const [nickName, setNickName] = useState("");
  const [changeEmail, setChangeEmail] = useState("");
  const [changePhone, setChangePhone] = useState("");
  const [isSendCode, setIsSendCode] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const isNickname = () => {
    return type === "닉네임";
  };

  const handleSendEmail = () => {
    if (!email || email !== userData.email) {
      alert("올바른 이메일을 입력해 주세요.");
    } else {
      mailSend(email);
      setIsSendCode(true);
    }
  };
  const handleModification = async () => {
    if (type === "닉네임") {
      await modifyNickName(email, authNum, nickName);
      if (!isValid) {
        alert("이메일 인증 먼저 진행해 주세요.");
        setIsSendCode(false);
      }
    } else if (type === "이메일") {
      await modifyEmail(email, authNum, changeEmail);
      if (!isValid) {
        alert("이메일 인증 먼저 진행해 주세요.");
        setIsSendCode(false);
      }
    } else {
      await modifyPhone(email, authNum, changePhone);
      if (!isValid) {
        alert("이메일 인증 먼저 진행해 주세요.");
        setIsSendCode(false);
      }
    }
    setIsEditing(false);
  };

  return (
    <div className={styles.grid}>
      {isNickname() ? (
        <Image src={profile} alt="profile" />
      ) : type === "이메일" ? (
        <Image src={mail} alt="mail" />
      ) : (
        <Image src={phone} alt="phone" />
      )}
      {isNickname() ? (
        <p>{userData.nickName}</p>
      ) : type === "이메일" ? (
        <p>{userData.email}</p>
      ) : (
        <p>{userData.phone}</p>
      )}
      {isEditing ? (
        <CloseImg onClick={() => setIsEditing(!isEditing)} />
      ) : (
        <p className={styles.yellow} onClick={() => setIsEditing(!isEditing)}>
          수정
        </p>
      )}
      {isEditing && (
        <>
          <div className={styles.container}>
            <div className={styles.input_container}>
              <input
                type="email"
                placeholder="현 이메일 주소 입력"
                onChange={(e) => setEmail(e.target.value)}
                pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"
              />
              <button onClick={handleSendEmail}>인증</button>
            </div>
            {isSendCode ? (
              <p style={{ color: "green", marginLeft: "0.5rem", width:" 100%" }}>
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
                  checkAuthNum(email, authNum);
                  setIsValid(true);
                }}
              >
                인증 확인
              </button>
            </div>
            <div className={styles.input_container}>
              {isNickname() ? (
                <input
                  type="text"
                  placeholder="변경하고자 하는 이름을 입력해주세요"
                  onChange={(e) => setNickName(e.target.value)}
                />
              ) : type === "이메일" ? (
                <input
                  type="email"
                  placeholder="변경하고자 하는 이메일을 입력해주세요"
                  onChange={(e) => setChangeEmail(e.target.value)}
                  pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"
                />
              ) : (
                <input
                  type="tel"
                  placeholder="변경하고자 하는 휴대폰 번호를 입력해주세요"
                  onChange={(e) => setChangePhone(e.target.value)}
                />
              )}
              <button onClick={handleModification}>변경</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
