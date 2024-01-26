'user client'
import React, { useState } from 'react'
import styles from '@/app/modules/voteCss/normalvoteitem.module.scss'
import Image from 'next/image'

import oneimg from '../../public/image/oneimage.png'
import addbutton from '../../public/image/add_button.png'
import deleteimg from '../../public/image/delete.png'
import check from '../../public/image/check.png'

const VoteItem = ({ placeholder, onDelete }) => {
    return (
        <div className={styles.content_wrapper}>
            {/* 이미지 버튼 */}
            <div className={styles.img_container}>
                <Image
                    src={oneimg}
                    style={{
                        width: 13,
                        height: 13
                    }}
                    alt='img/'
                />
            </div>
            <div className={styles.box_container}>
            <input
                className={styles.write_item}
                type='text'
                placeholder={placeholder}
            />
                {/* 삭제 버튼 */}
                <Image
                    className={styles.delete_button}
                    src={deleteimg}
                    style={{
                        width: 18,
                        height: 18
                    }}
                    alt='delete/'
                    onClick={onDelete}
                />
            </div>
        </div>
    );
};

const NormalVoteItem = () => {
    // 초기값
    const [voteItems, setVoteItems] = useState([
        { id: 1, placeholder: '투표 항목 1' },
        { id: 2, placeholder: '투표 항목 2' },
        { id: 3, placeholder: '투표 항목 3' }
    ]); 

    const handleAddItem = () => {
        const newItemNumber = voteItems.length + 1;
        const newItemText = `투표 항목 ${newItemNumber}`;
        setVoteItems([...voteItems, { id: newItemNumber, placeholder: newItemText }]);
    };

    const handleDeleteItem = (id) => {
        const updatedItems = voteItems.filter(item => item.id !== id);
        setVoteItems(updatedItems);
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <span>항목</span>
                <div className={styles.check_container}>
                    <Image
                        src={check}
                        style={{
                            width: 18,
                            height: 18
                        }}
                        alt='check/'
                    />
                    <div>복수 선택</div>
                </div>
            </div>
            {voteItems.map((item) => (
                <VoteItem
                    key={item.id}
                    placeholder={item.placeholder}
                    onDelete={() => handleDeleteItem(item.id)}
                />
            ))}
            <div className={styles.add_item}>
                <button onClick={handleAddItem}>
                    <Image
                        src={addbutton}
                        style={{
                            width: 30,
                            height: 30
                        }}
                        alt='add/'
                    />
                </button>
                <div className={styles.add_context}>항목 추가하기</div>
            </div>
        </div>
    );
};

export default NormalVoteItem;