// 비밀번호 찾기(1)
'use client'
import styles from '@/app/modules/passwordCss/findPasswordEmailInput.module.scss'; 
import backImg from '@/app/public/image/backimg.png'
import gominImg from '@/app/public/image/gominImg.png'
import useFindPwStore from '@/app/zustand/findPwStore';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function FindPasswordEmailInput() {
    const [email, setEmail] = useState('');
    const {isSucceed,setIsSucceed,setCurrentStage, setEmailStore} = useFindPwStore();
    const [isEmailValid, setIsEmailValid] = useState(false);
    const handleEmailChange = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(emailInput));
    } 
    const handleNext = () => {
        setIsSucceed({ ...isSucceed, EmailInput: true });
        setEmailStore(email);
        setCurrentStage('Verify');
      };
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
            <Link href="/signin">
                <Image src={backImg} alt='뒤로가기' width={8} height={16} style={{ marginRight: '15px', marginTop: '5px' }} />
            </Link>
            </h1>

            <div className={styles.main}>
                <div className={styles.gominFriend}>
                    <Image
                     src={gominImg}
                     alt='고민친구 이미지'
                     width={30}
                     height={30}
                     style={{marginRight: '10px'}}
                    />
                    <div className={styles.gominText}>고민친구</div>
                </div>
                <div className={styles.emailInput} style={{textAlign: 'center'}}>
                    <strong>비밀번호를 찾고자 하는</strong>
                    <div style={{ marginBottom: '5px'}}></div>
                    <strong>이메일 주소를 입력해주세요.</strong>
                    <div style={{ marginBottom: '35px'}}></div>
                    <div className={styles.emailValid}>
                        {/* <input type="text" placeholder='필수 입력' onChange={handleEmailChange} value={email}/> */}
                        <input type="text" placeholder='필수 입력' onChange={handleEmailChange} value={email} />
                    </div>
                    <div className={styles.btn_container}>
                        {/* <button disabled={!isRequiredChecked} onClick={handleNext}><p>다음</p></button> */}
                        <button onClick={handleNext} disabled ={!isEmailValid}><p>다음</p></button>
                    </div>
                </div>
            </div>
        </div>
    );
}