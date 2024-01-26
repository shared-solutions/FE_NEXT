'user client'
import React, { useState } from 'react'
import styles from '@/app/modules/votedListCss/lineViewItem.module.scss'

import LineBox from './LineBox'

const LineViewItem = () => {
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);

    const handleBoxClick = (index) => {
        setSelectedBoxIndex(index);
    };

    const boxes = [
        { top: "1일전", title: "배고프네요 뭐 먹을까요?", content: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ", goodCount: 34, messageCount: 24 },
        { top: "2일전", title: "제목2", content: "내용2", goodCount: 15, messageCount: 8 },
        { top: "3일전", title: "제목3", content: "내용3", goodCount: 15, messageCount: 8 },
        { top: "4일전", title: "제목4", content: "내용4", goodCount: 15, messageCount: 8 },
        { top: "5일전", title: "제목5", content: "내용5", goodCount: 15, messageCount: 8 },
        { top: "6일전", title: "제목6", content: "내용6", goodCount: 15, messageCount: 8 },
      ];

    return (
        <div className={styles.container}>
            <div className={styles.box_container}>
            {boxes.map((box, index) => (
                <LineBox
                    key={index}
                    top={box.top}
                    title={box.title}
                    content={box.content}
                    goodCount={box.goodCount}
                    messageCount={box.messageCount}
                    isSelected={selectedBoxIndex === index}
                    onClick={() => handleBoxClick(index)}
                />
            ))}
                {/* <LineBox 
                    top="1일전" 
                    title="배고프네요 뭐 먹을까요?" 
                    content="먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ" 
                    goodCount={34} 
                    messageCount={24}
                    isSelected={selectedBoxIndex === 0}
                    onClick={() => onSelectBox(0)}
                />
                <LineBox 
                    top="2일전" 
                    title="제목1" 
                    content="내용1" 
                    goodCount={15} 
                    messageCount={8}
                    isSelected={selectedBoxIndex === 1}
                    onClick={() => onSelectBox(1)}
                />
                <LineBox 
                    top="3일전" 
                    title="제목2" 
                    content="내용2" 
                    goodCount={15} 
                    messageCount={8}
                    isSelected={selectedBoxIndex === 2}
                    onClick={() => onSelectBox(2)}
                />
                <LineBox 
                    top="4일전" 
                    title="제목3" 
                    content="내용3" 
                    goodCount={15} 
                    messageCount={8}
                    isSelected={selectedBoxIndex === 3}
                    onClick={() => onSelectBox(3)}
                />
                <LineBox 
                    top="5일전" 
                    title="제목4" 
                    content="내용4" 
                    goodCount={15} 
                    messageCount={8}isSelected={selectedBoxIndex === 4}
                    onClick={() => onSelectBox(4)}
                />
                <LineBox 
                    top="6일전" 
                    title="제목5" 
                    content="내용5"
                    goodCount={15} 
                    messageCount={8}isSelected={selectedBoxIndex === 5}
                    onClick={() => onSelectBox(5)}
                /> */}
            </div>
        </div>
    );
};

export default LineViewItem;