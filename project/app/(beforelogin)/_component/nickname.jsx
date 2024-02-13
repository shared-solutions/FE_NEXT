'use client'
import styles from '@/app/modules/signup.module.scss';
import useSignUpStore from '@/app/zustand/policyStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Nickname() {
    const router = useRouter();
    const { isSucceed, setIsSucceed, userInfo } = useSignUpStore();
    const [nick, setNick] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [selectedGender, setSelectedGender] = useState('선택안함');
    const [genderNum, setGenderNum] = useState(0);
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    let [isDupli, setIsDupli] = useState('');
    
    useEffect(() => {
        if (selectedGender === '남') {
            setGenderNum(1);
        } else if (selectedGender === '여') {
            setGenderNum(2);
        } else {
            setGenderNum(3);
        }
    }, [selectedGender]);
    
    const handleNickChange = (e) => {
        const nickInput = e.target.value;
        setNick(nickInput);
        const nickRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
        setIsValid(nickRegex.test(nickInput));
    };
    const CheckDupli = () => {
         if(isValid){
            setIsDupli(isDupli='true')
         }
         else{
            setIsDupli(isDupli='false')
        }
    }
    // const CheckDupli = async () => {
    //     if (isValid) {
    //         try {
    //             const response = await axios.get(`/user/checkDupli?nickname=${nick}`);
    //             if (response.status === 200) {
    //                 setIsDupli(response.data.isDupli);
    //             } else {
    //                 console.error('Failed to check nickname duplication');
    //             }
    //         } catch (error) {
    //             console.error('Error during nickname duplication check', error);
    //         }
    //     }
    // };
    
    const isRequiredChecked = isDupli;
    
    const requestBody = {
        email: userInfo.email,
        password: userInfo.password,
        nickname: nick,
        phone: "010-9212-5534",
        gender: genderNum,
        agree_info: userInfo.agree_info,
        agree_marketing: userInfo.agree_marketing,
        birth: `${birthYear}-${birthMonth}-${birthDay}`,
        point: 0,
        image:"",
        kakao: "",
        like: 0,
        is_deleted: true,
        
    };
    
    const handleNext = async () => {
        try {
            const response = await axios.post('https://dev.gomin-chingu.site/user/join', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.status === 200) {
                setIsSucceed({ ...isSucceed, nickname: true });
                alert("회원가입 완료");
                router.replace('/i/signin');
            } else {
                console.error('Failed to join user');
            }
        } catch (error) {
            console.error('Error during API request', error);
        }
    };
    
    const handleGenderClick = (gender) => {
        setSelectedGender((prevGender) => (prevGender === gender ? null : gender));
    };

    return (
        <div className={styles.emailInput}>
            <strong>닉네임을 설정해주세요.</strong>
            <div className={styles.emailValid}>
                <input
                    type="text"
                    placeholder='필수 입력'
                    onChange={handleNickChange}
                    value={nick}
                />
                <button className={styles.validKey} disabled={!isValid} onClick={CheckDupli}>중복확인</button>
            </div>
            {isDupli === 'true' && (
                <span style={{ color: '#40B300' }}>사용가능한 닉네임입니다!</span>
            )}
            {isDupli === 'false' && (
                <span style={{ color: '#CE2323' }}>중복되는 닉네임입니다</span>
            )}
            {isDupli === '' && (
                <span style={{ color: '#CE2323' }}>닉네임을 입력해주세요!</span>
            )}

            <div className={styles.gender_container}>
                <strong>성별</strong>
                <div className={styles.gender}>
                    <p
                        className={`${styles.gender_option} ${selectedGender === '남' ? styles.selected : ''}`}
                        onClick={() => handleGenderClick('남')}
                    >
                        남
                    </p>
                    <p
                        className={`${styles.gender_option} ${selectedGender === '여' ? styles.selected : ''}`}
                        onClick={() => handleGenderClick('여')}
                    >
                        여
                    </p>
                    <p
                        className={`${styles.gender_option} ${
                            selectedGender === '선택안함' ? styles.selected : ''
                        }`}
                        onClick={() => handleGenderClick('선택안함')}
                    >
                        선택안함
                    </p>
                </div>
                <div className={styles.birth_container}>
                    <strong>생년월일</strong>
                    <div className={styles.birthday_inputs}>
                        <input
                            type="text"
                            placeholder="YYYY"
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                        />
                        /
                        <input
                            type="text"
                            placeholder="MM"
                            value={birthMonth}
                            onChange={(e) => setBirthMonth(e.target.value)}
                        />
                        /
                        <input
                            type="text"
                            placeholder="DD"
                            value={birthDay}
                            onChange={(e) => setBirthDay(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.btn_container}>
                마지막 <p>단계</p>
                <button
                    disabled={!isRequiredChecked}
                    onClick={handleNext}
                >
                    <p>다음</p>
                </button>
            </div>
        </div>
    );
}
