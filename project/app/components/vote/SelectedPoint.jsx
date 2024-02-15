'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '@/app/modules/voteCss/selectedpoint.module.scss'
import Image from 'next/image'

import minusbutton from '../../public/image/delete.png'
import plusbutton from '../../public/image/add_button.png'
import errorImg from '../../public/image/error.png'

const SelectedPoint = () => {
    const [currentPoint, setCurrentPoint] = useState(0);
    const [afterUsagePoint, setAfterUsagePoint] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [insufficientPoints, setInsufficientPoints] = useState(false);

    const authToken = localStorage.getItem("token");

    const handleChange = (e) => {
        const value = e.target.value;
        // 입력 값이 숫자인지 확인
        if (!isNaN(value)) {
            // 현재 보유 포인트에서 입력된 숫자를 빼서 사용 후 포인트 계산 / 입력 값 비어있는 경우 0으로 처리
            const usagePoint = value === '' ? 0 : parseInt(value, 10);
            const newAfterUsagePoint = currentPoint - usagePoint;
            setAfterUsagePoint(newAfterUsagePoint);
            setInputValue(value);

            // 사용 후 포인트가 0 미만이면 메시지 표시
            setInsufficientPoints(newAfterUsagePoint < 0);
        }
    };

    const handlePlusButtonClick = () => {
        // 현재 입력된 값에서 5 증가
        const newValue = parseInt(inputValue, 10) + 5;
        setInputValue(String(newValue));
        const newAfterUsagePoint = currentPoint - newValue;
        setAfterUsagePoint(newAfterUsagePoint);

        // 사용 후 포인트가 0 미만이면 메시지 표시
        setInsufficientPoints(newAfterUsagePoint < 0);
    };

    const handleMinusButtonClick = () => {
        // 현재 입력된 값에서 5 감소
        const newValue = parseInt(inputValue, 10) - 5;
        setInputValue(String(newValue));
        const newAfterUsagePoint = currentPoint - newValue;
        setAfterUsagePoint(newAfterUsagePoint);

        // 사용 후 포인트가 0 미만이면 메시지 표시
        setInsufficientPoints(newAfterUsagePoint < 0);
    };

    useEffect(() => {
        const fetchPoint = async () => {
          try {
            const response = await axios.get('http://dev.gomin-chingu.site/user/point', {
              headers: {
                'Content-Type': 'application/json',
                atk: authToken,
              }
            });
    
            if (response.data.isSuccess) {
                const point = response.data.result.point;
                setCurrentPoint(point);
                setAfterUsagePoint(point); // 현재 보유 포인트로 사용 후 포인트 초기값 설정
                setInsufficientPoints(false);
            } else {
              console.error('Failed to fetch point:', response.data.message);
            }
          } catch (error) {
            console.error('Error fetching point:', error);
          }
        };
    
        fetchPoint();
      }, []);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <span>채택 포인트</span>
                <div className={styles.point_container}>
                    <div className={styles.current_point}>
                        <div style={{ color: '#9B9B9B', marginRight: '2px' }}>현재 보유 포인트 :</div>
                        <div>{currentPoint}p</div>
                    </div>
                    <div className={styles.after_usage_point}>
                        <div style={{ color: '#9B9B9B', marginRight: '2px' }}>사용 후 포인트 :</div>
                        <div>{afterUsagePoint}p</div>
                    </div>
                </div>
            </div>
            <div className={styles.button_container}>
            <button onClick={handleMinusButtonClick}>
                <Image
                    src={minusbutton}
                    style={{
                        width: 25,
                        height: 25
                    }}
                    alt='minus/'
                />
            </button>
            <input 
                className={styles.text_input} 
                type='text' 
                placeholder='직접입력'
                value={inputValue}
                onChange={handleChange}
            />
            <button onClick={handlePlusButtonClick}>
                <Image
                    src={plusbutton}
                    style={{
                        width: 25,
                        height: 25
                    }}
                    alt='plus/'
                />
            </button>
        </div>
        {insufficientPoints && 
            <div className={styles.error_container}>
                <Image
                    src={errorImg}
                    style={{
                        width: 17,
                        height: 17
                    }}
                    alt='에러'
                />
                <div className={styles.error_message}>
                잔여 포인트가 부족합니다
                </div>
            </div>
        }
    </div>
    )
}

export default SelectedPoint;