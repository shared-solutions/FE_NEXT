'user clinet'
import React, { useState } from 'react';
import styles from '@/app/modules/voteCss/votemodal.module.scss';
import Image from 'next/image'


import VoteStyle from "./VoteStyle"
import Category from "./Category"
import VoteDeadline from "./VoteDeadline"
import SelectedPoint from "./SelectedPoint"

import downimg from '../../public/image/down.png'
import addbutton from '../../public/image/add_button.png'
import NormalVoteItem from './NormalVoteItem';
import GaugeVoteItem from './GaugeVoteItem';
import CardVoteItem from './CardVoteItem';
import { useEffect } from 'react';
import useWriteVoteStore from '@/app/zustand/voteStore';

const VoteModal = ({ onClose }) => {
    const [selectedStyle, setSelectedStyle] = useState('일반'); // 기본값은 '일반'
    const {voteTitle, setVoteTitle, selectedCategory, setSelectedCategory,setSelectedVoteType,} = useWriteVoteStore(); // Zustand에서 상태 및 업데이트 함수 가져오기
    const voteDeadline = useWriteVoteStore((state) => state.voteDeadline);
    const setVoteDeadline = useWriteVoteStore((state) => state.setVoteDeadline);

    const handleStyleSelect = (style) => {
        setSelectedStyle(style);
    };

    const handleTitleChange = (e) => {
        setVoteTitle(e.target.value); // 투표 제목 변경 시 Zustand 업데이트
    };

    const renderVoteItem = () => {
        switch (selectedStyle) {
            case '게이지':
                return <GaugeVoteItem />;
            case '카드':
                return <CardVoteItem />;
            default:
                return <NormalVoteItem />;
        }
    };
    useEffect (() => {
        if(selectedStyle ==='일반'){
            setSelectedVoteType(1)
        }
        else if(selectedStyle ==='게이지'){
            setSelectedVoteType(2)
        }
        else {setSelectedVoteType(3)}
    },[selectedStyle])
    const test = useWriteVoteStore.getState().selectedVoteType
    const handleClose = () => {
        setVoteTitle(voteTitle); // 투표 제목 input 창에 입력한 내용을 Zustand에 저장
        setVoteDeadline(voteDeadline); // Zustand 업데이트
        setSelectedVoteType(selectedStyle);
        console.log(test)
        onClose(); // 닫기 함수 호출
    };

    return (
        <div className={styles.modal_Overlay}>
            <div className={styles.modal_container}>
                <div className={styles.modal_content}>
                    {/* 상단 바 고정 */}
                    <button onClick={handleClose} className={styles.closeButton}>
                        <Image
                            src={downimg}
                            style={{
                                width: 23,
                                height: 10
                            }}
                            alt='down/'
                        />
                    </button>
                    {/* ---- 투표 내용 입력 시작 ---- */}
                    <div className={styles.modal_innerContent}>
                        <p>투표 제목</p>
                        <input 
                            className={styles.write_title} 
                            type='text' 
                            placeholder='내용을 입력하세요'
                            value={voteTitle} // Zustand에 저장된 투표 제목 사용
                            onChange={handleTitleChange} // 사용자가 입력한 내용으로 투표 제목 업데이트
                        />
                        <p>투표 스타일</p>
                        <VoteStyle onSelectedStyle={handleStyleSelect} /> {/* onSelectedStyle을 prop으로 전달 */}
                        {/* ---- 항목 시작 ---- */}
                        {renderVoteItem()} {/* 기본 값으로 일반 스타일의 항목 렌더링 */}
                        {/* ---- 항목 끝 ---- */}
                        <p>글 카테고리</p>
                        <Category />
                        <p>투표 마감 시간 설정</p>
                        <VoteDeadline voteDeadline={voteDeadline} setVoteDeadline={setVoteDeadline} />
                        {/* 채택 포인트 */}
                        <SelectedPoint />
                    </div>
                    <div className={styles.complete_button}>
                        <button voteTitle={voteTitle} selectedCategory={selectedCategory} onClick={handleClose} >완료</button>
                    </div>
                    {/* ---- 투표 내용 입력 끝 ---- */}
                </div>
            </div>
        </div>
    );
};

export default VoteModal;
