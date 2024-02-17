'use client'
//import React, { useState } from 'react'
import styles from '@/app/modules/votedListCss/lineViewItem.module.scss'

import LineBox from './LineBox'
import useSelectedBox from '@/app/zustand/selectionStore'
import useVotedListBox from '@/app/zustand/votedListStore'

const LineViewItem = ({ onClose }) => {
    const { selectedBoxIndex, setSelectedBox, setSelectedBoxData } = useSelectedBox();
    const { votedBoxData } = useVotedListBox();
    const handleBoxClick = (index) => {
      setSelectedBox(index);
    };
  
    const handleCompleteClick = () => {
      const selectedBoxData = selectedBoxIndex !== null ? votedBoxData[selectedBoxIndex] : null;
      console.log(selectedBoxData);
      setSelectedBoxData(selectedBoxData); // Zustand에 데이터 저장

      // 완료 버튼 클릭 시, onClose 함수 호출
      onClose();
    };
/*
    const boxes = [
        { top: "1일전", title: "배고프네요 뭐 먹을까요?", content: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ", goodCount: 34, messageCount: 24 },
        { top: "2일전", title: "제목2", content: "내용2", goodCount: 15, messageCount: 8 },
        { top: "3일전", title: "제목3", content: "내용3", goodCount: 15, messageCount: 8 },
        { top: "4일전", title: "제목4", content: "내용4", goodCount: 15, messageCount: 8 },
        { top: "5일전", title: "제목5", content: "내용5", goodCount: 15, messageCount: 8 },
        { top: "6일전", title: "제목6", content: "내용6", goodCount: 15, messageCount: 8 },
      ];
*/
    return (
        <div className={styles.container}>
            <div className={styles.box_container}>
            {votedBoxData.map((box, index) => (
                <div key={box.index} onClick={() => handleBoxClick(index)}>
                    <LineBox
                        key={index}
                        top={box.top}
                        title={box.title}
                        content={box.content}
                        goodCount={box.like}
                        messageCount={box.comment}
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

export default LineViewItem;