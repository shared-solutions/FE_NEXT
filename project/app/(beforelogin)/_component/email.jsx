'use client'
import styles from '@/app/modules/signup.module.scss';
import useSignUpStore from '@/app/zustand/policyStore'
import { useState } from 'react';
export default function Email(){
    const {isSucceed,setIsSucceed,setCurrentStage,} = useSignUpStore();
    const [isValidKey, setIsValidKey] = useState(false)
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [validKey, setValidKey] = useState('')
    const handleEmailChange = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(emailInput));
    } 
    const handleValidKeyChange = (e) => {
        const emailInput = e.target.value;
        setValidKey(emailInput);
    } 
    const isRequiredChecked = validKey !==''
    const handleNext = async () => {
        if (!isSucceed.email) {
          setIsSucceed({ ...isSucceed, email: true });
          setCurrentStage('password'); // 다음 스테이지로 설정하거나 필요에 따라 처리
        }
      }
      /*const handleNext = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/verify-verification-code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, verificationCode: validKey }),
          });
          if (response.ok) {
            const data = await response.json();
    
            if (data.isValid) {
              // 인증 번호가 일치할 경우
              if (!isSucceed.email) {
                setIsSucceed({ ...isSucceed, email: true });
                setCurrentStage('password');
              }
            } else {
              // 인증 번호가 일치하지 않을 경우
              console.error('Invalid verification code');
            }
          } else {
            // 서버에서 오류 응답을 받은 경우
            console.error('Server error');
          }
        } catch (error) {
          console.error('Error during API request', error);
        }
      };
      */
    const ValidKeyHandler = () => {
        setIsValidKey(true)
    }
    /*const ValidKeyHandler = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/generate-verification-code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
    
          if (response.ok) {
            console.log('Verification code sent successfully');
            setIsValidKey(true);
          } else {
            // 서버에서 오류 응답을 받은 경우
            console.error('Failed to send verification code');
          }
        } catch (error) {
          console.error('Error during API request', error);
        }
      };
    */
    return(
        <div className={styles.emailInput}>
            <strong>이메일을 입력해주세요.</strong>
            <div className={styles.emailValid}>
                <input type="text" placeholder='필수 입력' onChange={handleEmailChange} value={email}/>
                <button className={styles.validKey} disabled={!isEmailValid} onClick={ValidKeyHandler}>인증번호 발송</button>
            </div>
            {isValidKey && 
                <div className={styles.hiddenDiv}>
                    <strong>이메일로 전송된 인증번호를 입력해주세요</strong>
                    <div className={styles.emailValid}>
                    <input type="text" placeholder='필수 입력' onChange={handleValidKeyChange} value={validKey}/>
                </div>
                </div>
            }
            <div className={styles.btn_container}>
                3단계 중 <p>1단계</p>
                <button disabled={!isRequiredChecked} onClick={handleNext}><p>다음</p></button>
            </div>
        </div>
    )
}