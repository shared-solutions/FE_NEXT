'use client'
import React from 'react'
import styles from '@/app/modules/voteCss/votestyle.module.scss';

const VoteStyleButton = ({ text, selected, onClick }) => {
    return (
        <button
            className={`${styles.styleButton} ${selected ? styles.selected : ''}`}
            onClick={() => onClick(text)}
        >
            {text}
        </button>
    );
};

export default VoteStyleButton;