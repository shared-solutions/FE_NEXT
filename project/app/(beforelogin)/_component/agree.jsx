'use client'
import styles from '@/app/modules/signup.module.scss'
import useSignUpStore from '@/app/zustand/policyStore'
import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Agree(){
    const {
        isSucceed,
        setIsSucceed,
        setCurrentStage,
        userInfo, 
        setUserInfo 
      } = useSignUpStore();
      const [isCheckedAll, setIsCheckedAll] = useState(false);
      const [isChecked, setIsChecked] = useState({
        service: false,
        personalInfo: false,
        over14: false,
        optionalInfo: false,
        marketing: false,
      });
    
      const isRequiredChecked = isChecked.service && isChecked.personalInfo && isChecked.over14;
      
      const handleIconAllClick = () => {
        const newValue = !isCheckedAll;
        setIsCheckedAll(newValue);
        setIsChecked({
          service: newValue,
          personalInfo: newValue,
          over14: newValue,
          optionalInfo: newValue,
          marketing: newValue,
        });
      };
    
      const handleIconClick = (field) => {
        setIsChecked((prev) => ({ ...prev, [field]: !prev[field] }));
      };
    
      
    
      useEffect(() => {
        setIsCheckedAll(isChecked.service && isChecked.personalInfo && isChecked.over14 && isChecked.optionalInfo && isChecked.marketing);
      }, [isChecked]);
      const handleNext = () => {
        if (!isSucceed.agree) {
          setUserInfo('agree_info', isChecked.optionalInfo);
          setUserInfo('agree_marketing', isChecked.marketing);
            
            setIsSucceed('agree', true);
            setCurrentStage('email'); // 다음 스테이지로 설정하거나 필요에 따라 처리
    
            // Zustand에 저장된 값을 확인합니다.
            console.log("객체확인:", useSignUpStore.getState().userInfo);
        }
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>회원가입</h1>
            <div className={styles.main}> 
                
                <div className={styles.policy}>
                    <p className={styles.main_p}>고민친구 이용약관 확인 후 동의해주세요</p>
                    <div className={styles.agree_all}>
                        <p>모두동의</p>
                        <CheckCircle2 
                         size={40}
                         onClick={handleIconAllClick}
                         fill={isCheckedAll ? '#0590fc' : 'none'}
                         color={isCheckedAll ? 'white' : '#BDBDBD'}/>
                    </div>
                    <hr />
                    <label>
                        <strong>[필수]</strong><span>고민친구 서비스 이용약관 동의</span>
                        <CheckCircle2 
                         onClick={() => handleIconClick('service')} 
                         fill={isChecked.service ? '#0590fc' : 'none'}
                         color={isChecked.service ? 'white' : '#BDBDBD'}/>
                    </label>
                    <label>
                        <strong>[필수]</strong><span>개인정보 수집 및 이용에 대한 동의</span>
                        <CheckCircle2 onClick={() => handleIconClick('personalInfo')}
                         fill={isChecked.personalInfo ? '#0590fc' : 'none'}
                         color={isChecked.personalInfo ? 'white' : '#BDBDBD'}/>
                    </label>
                    <label>
                       <strong>[필수]</strong> <span>만 14세 이상입니다.</span>
                       <CheckCircle2 onClick={() => handleIconClick('over14')}
                        fill={isChecked.over14 ? '#0590fc' : 'none'}
                         color={isChecked.over14 ? 'white' : '#BDBDBD'}/>
                    </label>
                    <label>
                        [선택]<span>선택정보 수집 및 이용동의</span>
                        <CheckCircle2 onClick={() => handleIconClick('optionalInfo')}
                         fill={isChecked.optionalInfo ? '#0590fc' : 'none'}
                         color={isChecked.optionalInfo ? 'white' : '#BDBDBD'}/>
                    </label>
                    <label>
                        [선택]<span>마케팅 정보 수신에 대한 동의</span>
                        <CheckCircle2 onClick={() => handleIconClick('marketing')}
                         fill={isChecked.marketing ? '#0590fc' : 'none'}
                         color={isChecked.marketing ? 'white' : '#BDBDBD'}/>
                    </label>
                    <hr />
                </div>
                    
            </div>
           
            <div className={styles.btn_container}>
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