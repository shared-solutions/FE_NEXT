// 비밀번호 찾기(3) - 비밀번호 재설정
'use client'
import styles from '@/app/modules/passwordCss/updatePassword.module.scss'; 
import Image from 'next/image';
import lockImg from '@/app/public/image/lockImg.png'
import { useRouter } from 'next/navigation';
import useFindPwStore from '@/app/zustand/findPwStore';
import { useState } from 'react';
import axios from 'axios';
export default function UpdatePassword() {
    const router = useRouter()
    const {isSucceed,setIsSucceed, checkEmail} = useFindPwStore();
    const [type, setType] = useState({
        newPassword: '',
        newPasswordCheck: '',
      });
    const handleInputChange = (e) => {
        setType({ ...type, [e.target.name]: e.target.value });
      };
      const PwSubmit = async () => {
        try {
            const response = await axios.patch('/user/updatePassword', {
                newPassword: type.newPassword,
                newPasswordCheck: type.newPasswordCheck 
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    email: checkEmail,
                }
            });
    
            if (response.status === 200 || response.status === 204) {
                setIsSucceed({ ...isSucceed, password: true });
                alert("변경이 완료되었습니다!")
                router.replace('/i/signin')
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
                                <input name='newPassword' className={styles.inputFirstPassword} type="text" placeholder='비밀번호 입력' value={type.newPassword} onChange={handleInputChange}/>
                                <input name='newPasswordCheck' className={styles.inputSecondPassword} type="text" placeholder='비밀번호 확인' value={type.newPasswordCheck} onChange={handleInputChange}/>
                                <p>대문자 포함 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내 원칙</p>
                            </div>
                        </div>

                    </div>

                    <div className={styles.btn_container}>
                        <button onClick={PwSubmit}><p>변경하기</p></button>
                    </div>
                </div>
            </div>
        </div>
    );
}