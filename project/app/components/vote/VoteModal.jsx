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

const VoteModal = ({ onClose }) => {
    const [selectedStyle, setSelectedStyle] = useState('일반');

    const handleStyleSelect = (style) => {
        setSelectedStyle(style);
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

    return (
        <div className={styles.modal_Overlay}>
            <div className={styles.modal_container}>
                <div className={styles.modal_content}>
                    {/* 상단 바 고정 */}
                    <button onClick={onClose} className={styles.closeButton}>
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
                        <input className={styles.write_title} type='text' placeholder='내용을 입력하세요'/>
                        <p>투표 스타일</p>
                        <VoteStyle onSelectedStyle={handleStyleSelect} /> {/* onSelectedStyle을 prop으로 전달 */}
                        {/* ---- 항목 시작 ---- */}
                        {renderVoteItem()} {/* 기본 값으로 일반 스타일의 항목 렌더링 */}
                        {/* ---- 항목 끝 ---- */}
                        <p>글 카테고리</p>
                        <Category />
                        <p>투표 마감 시간 설정</p>
                        <VoteDeadline />
                        {/* 채택 포인트 */}
                        <SelectedPoint />
                    </div>
                    <div className={styles.complete_button}>
                        <button>완료</button>
                    </div>
                    
                    {/* ---- 투표 내용 입력 끝 ---- */}
                </div>
            </div>
        </div>
    );
};

export default VoteModal;
