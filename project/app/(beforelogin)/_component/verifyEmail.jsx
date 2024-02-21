// 비밀번호 찾기(2) - 이메일 인증 
'use client'
import styles from '@/app/modules/passwordCss/verifyEmail.module.scss'; 
import Image from 'next/image';
import emailImg from '@/app/public/image/emailImg.png'
import useFindPwStore from '@/app/zustand/findPwStore';
import { useState } from 'react';

export default function VerifyEmail() {
    const [name, setName] = useState('');
    const {isSucceed,setIsSucceed,setCurrentStage, checkEmail} = useFindPwStore();
    const [authNum, setAuthNum] = useState('')
    const nameHandler = (e)=> { setName(e.target.value) }
    const authHandler = (e)=> { setAuthNum(e.target.value) }
    const emailCheck = async () => {
        try {
          const response = await fetch('/user/passwordMailSend', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:checkEmail, name }),
          });
          if (response.ok) {
            const data = await response.json();
    
            if (data) 
            {
              alert("메일에 전송되었습니다!")
            } 
            else 
            {
              console.error('Invalid verification code');
            }
          } else {
            alert('틀')
          }
        } catch (error) {
          console.error('Error during API request', error);
        }
      };
      const handleNext = async () => {
        try {
          const response = await fetch('/user/passwordMailauthCheck', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email:checkEmail, authNum }),
          });
          if (response.ok) {
            const data = await response.json();
    
            if (data) 
            {
              setIsSucceed({ ...isSucceed, Verify: true });
              setCurrentStage('password');
            } 
            else 
            {
              console.error('Invalid verification code');
            }
          } else {
            alert('틀')
          }
        } catch (error) {
          console.error('Error during API request', error);
        }
      };
    return(
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.emailTextContainer}>
                    <div className={styles.emailText}>이메일 인증</div>
                    <Image
                     src={emailImg}
                     alt='이메일'
                     width={32}
                     height={32}
                     style={{marginLeft: '10px'}}
                    />
                </div>
                <div className={styles.totalContainer}>
                    <div className={styles.totalEmailBox}>
                        <div className={styles.forFullWidth}>
                            <div className={styles.explainContainer}>
                                <div className={styles.explain}>회원정보에 등록한 이메일로 인증</div>
                            </div>
                            {/* 이름, 이메일주소, 인증번호 입력*/}
                            <div className={styles.inputContainer}> 
                                <input className={styles.inputName} type="text" placeholder='닉네임' onChange={nameHandler} value={name}/>
                                <div className={styles.inputEmailContainer}>
                                    <input className={styles.inputEmail} type="text" placeholder='이메일 주소' value={checkEmail} readOnly/>
                                    <button className={styles.inputEmailButton} onClick={emailCheck} disabled={!name}>인증</button>
                                </div>
                                <input className={styles.inputCode} type="text" placeholder='인증번호 숫자 6자리' value={authNum} onChange={authHandler}/>
                            </div>
                        </div>

                    </div>

                    <div className={styles.btn_container}>
                        <button onClick={handleNext}><p>다음</p></button>
                    </div>
                </div>
            </div>
        </div>
    );
}