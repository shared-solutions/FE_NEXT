'use client'
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
import ko from 'date-fns/locale/ko';
import styles from '@/app/modules/voteCss/votedeadline.module.scss'
import Image from 'next/image'
import useWriteVoteStore from '@/app/zustand/voteStore';
import downimg from '../../public/image/down.png'

const VoteDeadline = () => {
    const { voteDeadline, setVoteDeadline,} = useWriteVoteStore();
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const nextDay = new Date();
    nextDay.setDate(currentDate.getDate() + 1);

    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), currentMinute), currentHour),
      );
    const [selectedDate, setSelectedDate] = useState(""); 

    const formatDate = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${month}월 ${day}일 ${hours}:${minutes}`;
    };
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
        // 선택한 날짜를 한국 표준시로 조정
        const koreanStandardDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));

        // 한국 표준시로 조정된 날짜를 원하는 형식으로 포맷팅
        const formattedDate = koreanStandardDate.toISOString();

        // 포맷팅된 날짜를 voteDeadline 상태에 업데이트
        setVoteDeadline(formattedDate);
        console.log(selectedDate);
        console.log(voteDeadline);
    };

    return (
        <div className={styles.container}>
            {/* 선택한 날짜와 시간 표시 */}
            <div className={startDate ? styles.startDatee : styles.text}>
                {selectedDate ? formatDate(selectedDate) : '날짜, 시간 선택'}
            </div>
            <button className={styles.button}>
                <Image
                    src={downimg}
                    alt='down'
                    style={{
                        width: 10,
                        height: 5
                    }}
                />
            </button>
            <div className="App">
            <DatePicker
			  selected={selectedDate}
			  onChange={(selectedDate) => handleDateChange(selectedDate)}
              showTimeSelect
              dateFormat="yyyy-MM-dd aa h시 mm분"
              minDate={nextDay}
              locale={ko}
              popperPlacement="bottom-end"
			/>
            </div>
        </div>
    )
}

export default VoteDeadline;