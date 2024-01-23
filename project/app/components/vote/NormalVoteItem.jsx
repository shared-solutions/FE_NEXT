'user client'
import React, { useState } from 'react'
import styles from '@/app/modules/voteCss/normalvoteitem.module.scss'
import Image from 'next/image'

import oneimg from '../../public/image/oneimage.png'
import addbutton from '../../public/image/add_button.png'
import deleteimg from '../../public/image/delete.png'

const NormalVoteItem = () => {
    const [voteItems, setVoteItems] = useState(['투표 항목 1']); // 초기값 설정

    const handleAddItem = () => {
        const newItemNumber = voteItems.length + 1;
        const newItemText = `투표 항목 ${newItemNumber}`;
        setVoteItems([...voteItems, newItemText]);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = [...voteItems];
        updatedItems.splice(index, 1);
        setVoteItems(updatedItems);
    };

    return (
        <div className={styles.container}>
            <p>항목</p>
            {voteItems.map((item, index) => (
                <div className={styles.box} key={index}>
                    <input 
                    className={styles.write_item} 
                    type='text' 
                    placeholder={item} 
                    />
                    <div className={styles.menu_container}>
                    {/* 이미지 버튼 */}
                        <Image 
                            src={oneimg}
                            style={{
                            width: 18,
                            height: 18
                            }}
                            alt='img/'
                        />
                        {/* 삭제 버튼 */}
                        <Image
                            src={deleteimg} 
                            style={{
                            width: 18,
                            height: 18
                            }}
                            alt='delete/'
                            onClick={() => handleDeleteItem(index)}
                        />
                    </div>
                </div>
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