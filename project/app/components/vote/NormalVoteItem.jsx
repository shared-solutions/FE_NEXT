'use client'
import React, { useState } from 'react'
import styles from '@/app/modules/voteCss/normalvoteitem.module.scss'
import Image from 'next/image'
import addbutton from '../../public/image/add_button.png'
import deleteimg from '../../public/image/delete.png'
import check from '../../public/image/check.png'
import { FileImage } from 'lucide-react'
import useImageStore from '@/app/zustand/normalVoteStore'

const VoteItem = ({ id, placeholder, onDelete }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const voteItems = useImageStore(state => state.voteImageItems);
    const setVoteItems = useImageStore(state => state.setVoteImageItems);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            // 투표 항목과 해당 항목에 대한 이미지를 함께 업데이트
            const updatedVoteItems = voteItems.map(item => {
                if (item.id === id) {
                    return { ...item, image: reader.result };
                } else {
                    return item;
                }
            });
            setVoteItems(updatedVoteItems);
            setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={styles.content_wrapper}>
            <div className={styles.img_container}>
                <label htmlFor={`file-upload-${id}`}>
                    <FileImage />
                </label>
                <input
                    type='file'
                    id={`file-upload-${id}`}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
            <div className={styles.box_container}>
                <input
                    className={styles.write_item}
                    type='text'
                    placeholder={placeholder}
                />
                <Image
                    className={styles.delete_button}
                    src={deleteimg}
                    alt='Delete'
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
                <div className={styles.check_container} >
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