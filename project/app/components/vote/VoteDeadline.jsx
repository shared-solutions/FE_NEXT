'use client'
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-mobile-datepicker'
import styles from '@/app/modules/voteCss/votedeadline.module.scss'
import Image from 'next/image'

import downimg from '../../public/image/down.png'

const VoteDeadline = () => {
    const [time, setTime] = useState(new Date());
    const [selectedDateTime, setSelectedDateTime] = useState(null); // 선택된 날짜와 시간 상태
    const [isOpen, setIsOpen] = useState(false);
    const [minDate, setMinDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());
    const [isToday, setIsToday] = useState(false);

	const handleClick = () => {
        setIsOpen(true);
    }

    // ---- 버튼을 다시 누르면 close됨 시작 ---
    // const handleClick = () => {
    //     setIsOpen(!isOpen); // 
    // }
    // ---- 버튼을 다시 누르면 close됨 끝 ---

    const handleCancel = () => {
        setIsOpen(false);
    }

    const handleSelect = (selectedTime) => {
        setTime(selectedTime);
        setSelectedDateTime(selectedTime); // 선택된 날짜와 시간 상태 업데이트
        setIsOpen(false);
    }

    useEffect(() => {
        // 현재 시간 설정
        const now = new Date();

        // 최소 1분 후로 설정
        const minTime = new Date();
        minTime.setMinutes(minTime.getMinutes() + 1);
        setMinDate(minTime);
        
        // 최대 30일 후로 설정
        const maxTime = new Date();
        maxTime.setDate(maxTime.getDate() + 30);
        setMaxDate(maxTime);

        // 현재 날짜가 오늘인지 확인
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        setIsToday(today.getTime() === time.getTime());
    }, [time]);

    const datePickerConfig = {
        date: {
            format: 'MM월 DD일',
            //format: isToday ? '오늘' : 'MM월 DD일',
            caption: '날짜',
            step: 1,
            visible: 'spinner',
        },
        hour: {
            format: 'hh시',
            caption: '시',
            step: 1,
        },
        minute: {
            format: 'mm분',
            caption: '분',
            step: 1,
        },
    };

    return (
        <div className={styles.container}>
            {/* 선택한 날짜와 시간 표시 */}
            <div className={selectedDateTime ? styles.selectedDateTime : styles.text}>
                {selectedDateTime && (
                    <>
                        {selectedDateTime.getMonth() + 1}월 {selectedDateTime.getDate()}일 {' '}
                        {selectedDateTime.getHours()} :{' '}
                        {selectedDateTime.getMinutes()}
                    </>
                )}
                {!selectedDateTime && '날짜, 시간 선택'}
            </div>
            <button className={styles.button} onClick={handleClick}>
                <Image
                    src={downimg}
                    style={{
                        width: 10,
                        height: 5
                    }}
                />
            </button>
            <div className="App">
                <DatePicker
                    value={time}
                    isOpen={isOpen}
                    theme="ios"
                    confirmText="확인"
                    cancelText="취소"
                    onSelect={handleSelect}
                    onCancel={handleCancel} 
                    dateConfig={datePickerConfig}
                    min={minDate}
                    max={maxDate}
                    showHeader={false}
                />
            </div>
        </div>
    )
}

export default VoteDeadline;

