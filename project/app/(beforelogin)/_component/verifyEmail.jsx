// 비밀번호 찾기(2) - 이메일 인증 
'use client'
import styles from '@/app/modules/passwordCss/verifyEmail.module.scss'; 
import Image from 'next/image';
import emailImg from '@/app/public/image/emailImg.png'

export default function VerifyEmail() {
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
                                <div className={styles.userEmail}>(p**@gmail.com)</div>
                            </div>
                            {/* 이름, 이메일주소, 인증번호 입력*/}
                            <div className={styles.inputContainer}> 
                                <input className={styles.inputName} type="text" placeholder='이름'/>
                                <div className={styles.inputEmailContainer}>
                                    <input className={styles.inputEmail} type="text" placeholder='이메일 주소'/>
                                    <button className={styles.inputEmailButton}>인증</button>
                                </div>
                                <input className={styles.inputCode} type="text" placeholder='인증번호 숫자 6자리'/>
                            </div>
                        </div>

                    </div>

                    <div className={styles.btn_container}>
                        <button><p>다음</p></button>
                    </div>
                </div>
            </div>
        </div>
    );
}