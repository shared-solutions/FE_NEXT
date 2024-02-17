'use client'
import styles from '@/app/modules/signup.module.scss';
import useSignUpStore from '@/app/zustand/policyStore';
import { Eye } from 'lucide-react';
import { useState } from 'react';

export default function Password() {
  const { isSucceed, setIsSucceed, setCurrentStage,userInfo, setUserInfo } = useSignUpStore();

  const [pw, setPw] = useState('');
  const [pwValid, setPwValid] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showPwValid, setShowPwValid] = useState(false);

  const handlePwChange = (e, setter) => {
    const pwInput = e.target.value;
    setter((prev) => (prev !== pwInput ? pwInput : prev));
  };

  const isRequiredChecked = (prevPw, prevPwValid) => prevPw === prevPwValid;

  const handleNext = () => {
    if (!isSucceed.password) {
      setIsSucceed((prev) => ({ ...prev, password: true }));
      setUserInfo('password', pw);
      setCurrentStage('nickname');
      console.log("객체확인:", useSignUpStore.getState().userInfo);
    }
  };
  const handleShow = (setter) => {
    setter((prev) => !prev);
  };
  
  return (
    <div className={styles.emailInput}>
      <strong>비밀번호를 설정해주세요.</strong>
      <div className={styles.emailValid}>
        <input
          type={showPw ? "text" : "password"}
          placeholder="필수 입력"
          onChange={(e) => handlePwChange(e, setPw)}
          value={pw}
        />
        <button className={styles.validKey} onClick={() => handleShow(setShowPw)}>
          <Eye color={showPw ? 'blue' : 'black'} />
        </button>
      </div>
      <div className={styles.hiddenDiv}>
        <strong>비밀번호 확인</strong>
        <div className={styles.emailValid}>
          <input
            type={showPwValid ? "text" : "password"}
            placeholder="필수 입력"
            onChange={(e) => handlePwChange(e, setPwValid)}
            value={pwValid}
          />
          <button className={styles.validKey} onClick={() => handleShow(setShowPwValid)}>
            <Eye color={showPwValid ? 'blue' : 'black'} />
          </button>
        </div>
      </div>

      <div className={styles.btn_container}>
        3단계 중 <p>2단계</p>
        <button disabled={!isRequiredChecked(pw, pwValid)} onClick={handleNext}>
          <p>다음</p>
        </button>
      </div>
    </div>
  );
}
