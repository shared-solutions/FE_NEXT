'user client'
import React, { useState, useEffect } from 'react'
import styles from '@/app/modules/voteCss/cardvoteitem.module.scss'
import Image from 'next/image'

import oneimg from '../../public/image/oneimage_grey.png'
import deleteimg from '../../public/image/delete.png'
import addbutton from '../../public/image/add_button.png'
import check from '../../public/image/check.png'

const CardVoteItem = () => {
    const [voteItems, setVoteItems] = useState([{ id: 1, placeholder: '항목 1' }]);

    useEffect(() => {
        // 컴포넌트가 처음 마운트될 때 항목 1과 항목 2를 추가
        setVoteItems([
            { id: 1, placeholder: '항목 1' },
            { id: 2, placeholder: '항목 2' },
        ]);
    }, []);

    const handleAddItem = () => {
        const newItemNumber = voteItems.length + 1;
        const newItemText = `항목 ${newItemNumber}`;
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
            <div className={styles.box_container}>
                {voteItems.map((item) => (
                    <div className={styles.box}>
                        <div className={styles.top} key={item.id}>
                            <input 
                                className={styles.write_item} 
                                type='text' 
                                placeholder={item.placeholder}
                            />
                            {/* 삭제 버튼 */}
                            <Image
                                src={deleteimg} 
                                style={{
                                    width: 18,
                                    height: 18
                        }}
                                alt='delete/'
                                onClick={() => handleDeleteItem(item.id)}
                            />
                        </div>
                        <div className={styles.bottom}>
                            {/* 이미지 버튼 */}
                            <Image 
                                src={oneimg}
                                style={{
                                    width: 18,
                                    height: 18
                        }}
                                alt='img/'
                            />
                        </div>
                    </div>
                ))}
            </div>
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

export default CardVoteItem;