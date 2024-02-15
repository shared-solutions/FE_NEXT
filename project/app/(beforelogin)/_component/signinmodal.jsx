"use client";
import styles from "@/app/modules/signin.module.scss";
import bglogo from "@/app/public/image/bglogo.png";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
export default function Modal() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
  };

  const handlePwChange = (e) => {
    const pwInput = e.target.value;
    setPw(pwInput);
  };

  const [showPw, setShowPw] = useState(false);

  const handleShow = () => {
    setShowPw(!showPw);
  };

  const isRequiredChecked = email !== "" && pw !== "";

  const loginUser = async () => {
    const requestBody = {
      email: email,
      password: pw,
    };
    try {

      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: pw }),
      });

      if (response.ok) {
        // Handle successful login here
        console.log('login successful');
        router.push('/home')
      } else {
        // Handle unsuccessful login here
        console.error('Login failed');
      }

    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <p>로그인 </p>
        <Image src={bglogo} alt="x" width={25} height={25} priority />
      </h1>
      <div className={styles.main}>
        <div className={styles.emailInput}>
          <div>
            <strong>이메일 주소를 입력해주세요.</strong>`
            <div className={styles.emailValid}>
              <input
                type="text"
                onChange={handleEmailChange}
                value={email}
                placeholder="필수 입력"
              />
            </div>
          </div>

          <div>
            <strong>비밀번호를 입력하세요.</strong>
            <div className={styles.emailValid}>
              {showPw ? (
                <input
                  type="text"
                  placeholder="필수 입력"
                  onChange={handlePwChange}
                  value={pw}
                />
              ) : (
                <input
                  type="password"
                  placeholder="필수 입력"
                  onChange={handlePwChange}
                  value={pw}
                />
              )}

              <button className={styles.validKey} onClick={handleShow}>
                <Eye color={showPw ? "blue" : "black"} />
              </button>
            </div>
          </div>

          <div className={styles.btn_container}>
            <button disabled={!isRequiredChecked} onClick={loginUser}>
              <p>로그인</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
