'use client'
import { useEffect } from 'react'
import styles from '@/app/modules/writepostCss/writepostheader.module.scss'
import Image from 'next/image'
import Link from "next/link"
import useVoteStore from '@/app/zustand/voteStore';

import close from '../../public/image/close.ico'

const WritePostHeader = ({ onSubmit, voteTitle }) => {
    const resetVoteTitle = useVoteStore(state => state.resetVoteTitle); // 투표 제목 초기화 액션 가져오기

    const handleComplete = () => {
        onSubmit(voteTitle); // 완료 버튼 클릭 시 onSubmit 함수 호출하여 voteTitle 전달
        resetVoteTitle(); // 투표 제목 초기화
    };

    return (
        <div className={styles.header_container}>
            <Link href="/vote">
                <Image
                    src={close}
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
            </Link>
            <h4>고민 작성하기</h4>
            <button className={styles.complete_button} onClick={handleComplete}>완료</button>
        </div>
    )
}

export default WritePostHeader;