// 비밀번호 찾기(3) - 비밀번호 재설정
'use client'
import styles from '@/app/modules/passwordCss/updatePassword.module.scss'; 
import Image from 'next/image';
import lockImg from '@/app/public/image/lockImg.png'

export default function UpdatePassword() {
    return(
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.emailTextContainer}>
                    <div className={styles.emailText}>비밀번호 재설정</div>
                    <Image
                     src={lockImg}
                     alt='이메일'
                     width={32}
                     height={32}
                     style={{marginLeft: '10px'}}
                    />
                </div>
                <div className={styles.totalContainer}>
                    <div className={styles.totalPasswordBox}>
                        <div className={styles.forFullWidth}>
                            <div className={styles.explainContainer}>
                                <div className={styles.explain}>새로 등록할 비밀번호를 입력하세요.</div>
                            </div>
                            {/* 비밀번호 입력, 비밀번호 확인 */}
                            <div className={styles.inputContainer}> 
                                <input className={styles.inputFirstPassword} type="text" placeholder='비밀번호 입력'/>
                                <input className={styles.inputSecondPassword} type="text" placeholder='비밀번호 확인'/>
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