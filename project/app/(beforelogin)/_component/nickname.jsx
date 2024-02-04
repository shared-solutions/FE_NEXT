'use client'
import styles from '@/app/modules/signup.module.scss';
import useSignUpStore from '@/app/zustand/policyStore'
import { useState } from 'react';
export default function Nickname(){
    const {
        isSucceed,
        setIsSucceed,
        setCurrentStage,
      } = useSignUpStore();
    const [nick, setNick] = useState('');
    const [isValid, setIsValid] = useState(false)
    const handleNickChange = (e) => {
          const nickInput = e.target.value;
          setNick(nickInput);
          const nickRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/
          setIsValid(nickRegex.test(nickInput));
    }

    let [isDupli, setIsDupli] = useState('')
    const CheckDupli = () => {
         if(isValid){
            setIsDupli(isDupli='true')
         }
         else{
            setIsDupli(isDupli='false')
        }
    }
    const isRequiredChecked = isDupli
    const handleNext = () => {
          if (!isSucceed.nickname) {
            setIsSucceed({ ...isSucceed, nickname: true });
            setCurrentStage('nickname'); // 다음 스테이지로 설정하거나 필요에 따라 처리
          }
    }

    const [selectedGender, setSelectedGender] = useState('선택안함');

    const handleGenderClick = (gender) => {
        setSelectedGender((prevGender) => (prevGender === gender ? null : gender));
    };

    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');

    return(
        <div className={styles.emailInput}>
            <strong>닉네임을 설정해주세요.</strong>
            <div className={styles.emailValid}>
                <input
                    type="text"
                    placeholder='필수 입력'
                    onChange={handleNickChange}
                    value={nick}/>
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
    )
}