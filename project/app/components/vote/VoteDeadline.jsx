'use client'
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import styles from '@/app/modules/voteCss/votedeadline.module.scss'
import Image from 'next/image'
import useVoteStore from '@/app/zustand/voteStore';

import downimg from '../../public/image/down.png'

const VoteDeadline = () => {
    const [startDate, setStartDate] = useState(new Date());
   

    

    return (
        <div className={styles.container}>
            {/* 선택한 날짜와 시간 표시 */}
            <div className={startDate ? styles.startDatee : styles.text}>
                {startDate && (
                    <>
                        {startDate.getMonth() + 1}월 {startDate.getDate()}일 {' '}
                        {String(startDate.getHours()).padStart(2, '0')} :{' '}
                        {String(startDate.getMinutes()).padStart(2, '0')}
                    </>
                )}
                {!startDate && '날짜, 시간 선택'}
            </div>
            <button className={styles.button}>
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
			  selected={startDate}
			  onChange={(date) => setStartDate(date)}
			  dateFormat="yyyy-MM-dd"
			/>
            </div>
        </div>
    )
}

export default VoteDeadline;

