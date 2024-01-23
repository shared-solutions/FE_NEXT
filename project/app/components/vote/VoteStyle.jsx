'user client'
import React, { useState } from 'react' 
import styles from '@/app/modules/voteCss/votestyle.module.scss';
import VoteStyleButton from './VoteStyleButton';

const VoteStyle = ({ onSelectedStyle }) => {
    const [selectedButton, setSelectedButton] = useState('일반');

    const handleButtonClick = (text) => {
        setSelectedButton(text);
        onSelectedStyle(text); // 상위 컴포넌트로 선택된 스타일 전달
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