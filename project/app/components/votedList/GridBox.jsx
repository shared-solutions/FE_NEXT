'use client'
import styles from '@/app/modules/votedListCss/gridViewItem.module.scss';
import Image from 'next/image';

import goodImg from '../../public/image/good.png'
import messageImg from '../../public/image/message.png'

function Box({ top, title, content, goodCount, messageCount, isSelected, onClick }) {
    const boxStyles = {
        backgroundColor: isSelected ? '#E0E0E0' : 'white'
    };

    return (
        <div className={styles.box} style={boxStyles} onClick={onClick}>
            <div className={styles.top}>{top}</div>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
            <div className={styles.bottom}>
                <Image
                    src={goodImg}
                    style={{
                        width: 15,
                        height: 13
                    }}
                    alt='good/' />
                <span className={styles.good}>{goodCount}</span>
                <Image
                    src={messageImg}
                    style={{
                        width: 13,
                        height: 13
                    }}
                    alt='message/' />
                <span className={styles.message}>{messageCount}</span>
            </div>
        </div>
    );
}

export default Box;