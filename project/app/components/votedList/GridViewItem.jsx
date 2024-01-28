'use client'
import React, { useState } from 'react'
import styles from '@/app/modules/votedListCss/gridViewItem.module.scss'
import Link from 'next/link'

import GridBox from './GridBox'
import { useRouter } from 'next/navigation'
import useSelectedBox from '@/app/zustand/selectionStore'

const GridViewItem = () => {

    const router = useRouter();
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);

    const handleBoxClick = (index) => {
        setSelectedBoxIndex(index);
    };
    
    const handleCompleteClick = () => {
        if (selectedBoxIndex !== null) {
            // 완료 버튼을 눌렀을 때 선택한 GridBox의 index로 이동
              router.push(`/writereview/${selectedBoxIndex}`);
        }
    };

    const boxes = [
        { top: "1일전", title: "배고프네요 뭐 먹을까요?", content: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ", goodCount: 34, messageCount: 24 },
        { top: "2일전", title: "제목2", content: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ", goodCount: 15, messageCount: 8 },
        { top: "3일전", title: "제목3", content: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ", goodCount: 15, messageCount: 8 },
        { top: "4일전", title: "제목4", content: "내용4", goodCount: 15, messageCount: 8 },
        { top: "5일전", title: "제목5", content: "내용5", goodCount: 15, messageCount: 8 },
        { top: "6일전", title: "제목6", content: "내용6", goodCount: 15, messageCount: 8 },
      ];

    return (
        <div className={styles.container}>
            <div className={styles.box_container}>
            {boxes.map((box, index) => (
                <div key={box.index} onClick={() => handleBoxClick(index)}>
                    
                    <GridBox
                        key={box.index}
                        top={box.top}
                        title={box.title}
                        content={box.content}
                        goodCount={box.goodCount}
                        messageCount={box.messageCount}
                        isSelected={selectedBoxIndex === index}
                        onClick={() => handleBoxClick(index)}
                />
                </div>
            ))}
            </div>
            <button className={styles.complete_button} onClick={handleCompleteClick}>완료</button>
        </div>
    );
};

export default GridViewItem;