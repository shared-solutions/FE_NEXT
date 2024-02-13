 "use client";
import { useState } from "react";import Image from "next/image";
import phone from "@/app/public/image/phone.png";
import CloseImg from "./CloseImg";
import styles from "@/app/modules/editCss/editinfo.module.scss";

export default function EditPhone({userData}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className={styles.grid}>
              <Image
                src={phone}
                alt="phone"
                style={{ marginLeft: "0.15rem" }}
              />
              <p>{userData.phone}</p>
              {isEditing ? (
                <CloseImg onClick={() => setIsEditing(!isEditing)} /> 
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  수정
                </p>
              )}
              {isEditing && (
                <div className={styles.container}>
                <div className={styles.input_container}>
                  <input type="tel" placeholder="휴대폰 번호 입력" />
                  <button onChange={(e) => updateField("phone", e.target.value)}>인증</button>
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
