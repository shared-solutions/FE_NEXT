'use client'
import React, { useState } from 'react' 
import styles from '@/app/modules/voteCss/votestyle.module.scss';
import VoteStyleButton from './VoteStyleButton';
import useVoteStore from '@/app/zustand/voteStore';

const VoteStyle = ({ onSelectedStyle }) => {
    const {selectedVoteType, setSelectedVoteType} = useVoteStore()
    const [selectedButton, setSelectedButton] = useState('일반');
    const convertType = () => {
        if(selectedButton==='일반'){
            setSelectedVoteType(1)
        }
        else if(selectedButton ==='게이지'){
            setSelectedVoteType(2)
        }
        else {setSelectedVoteType(3)}
    }
    const handleButtonClick = (text) => {
        setSelectedButton(text);
        onSelectedStyle(text);
        convertType() // 상위 컴포넌트로 선택된 스타일 전달
        // let convertedStyle = 1;
        // if (text === '게이지') {
        //     convertedStyle = 2;
        // } else if (text === '카드') {
        //     convertedStyle = 3;
        // }
        console.log("투표타입", selectedVoteType);
    };

    return(
        <div>
            <div className={styles.container}>
            <VoteStyleButton
                text='일반'
                selected={selectedButton === '일반'}
                onClick={() => handleButtonClick('일반')}
            />
            <VoteStyleButton
                text='게이지'
                selected={selectedButton === '게이지'}
                onClick={() => handleButtonClick('게이지')}
            />
            <VoteStyleButton
                text='카드'
                selected={selectedButton === '카드'}
                onClick={() => handleButtonClick('카드')}
            />
            </div>
        </div>
    )
}

export default VoteStyle;