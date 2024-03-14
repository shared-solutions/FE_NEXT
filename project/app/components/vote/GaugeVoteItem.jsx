import React, { useState, useRef, useMemo } from 'react';
import styles from '@/app/modules/voteCss/gaugevoteitem.module.scss';
import Image from 'next/image';

import gaugeImage from '../../public/image/gauge_img.png';
import intervalBar from '../../public/image/interval_bar.png';
const GaugeVoteItem = () => {
    const [dragging, setDragging] = useState(false);
    const [positionX, setPositionX] = useState(0.05);
    const barRef = useRef(null);


    const handleTouchStart = (event) => {
        setDragging(true);
        handleTouchMove(event);
    };

    const handleTouchEnd = () => {
        setDragging(false);
    };


    const handleTouchMove = (event) => {
        if (dragging) {
            const newPositionX = event.touches[0].clientX;
            const barWidth = barRef.current.offsetWidth;
            const newPositionWithinBar = Math.max(0.05, Math.min(newPositionX / barWidth, 1));
            setPositionX(newPositionWithinBar);
        }
    };

    console.log(positionX)
    const getBarColor = useMemo(() => {
        return positionX <= 1 ? '#575757' : '#A1A1A1';
    }, [positionX]);

    return (
        <div className={styles.container}>
            <p>항목</p>
            <div className={styles.box}>
                <div className={styles.gauge_wrap}>
                    <div 
                    ref={barRef} 
                    className={styles.bar} 
                    style={{ width: '100%', height: '8px', background: `linear-gradient(to right, ${getBarColor} ${positionX * 100}%, #A1A1A1 ${positionX * 100}%, #A1A1A1 100%)`, borderRadius: '10px', position: 'relative' }} 
    
                    onTouchStart={handleTouchStart} 
                    onTouchMove={handleTouchMove} 
                    onTouchEnd={handleTouchEnd}>
                        <Image src={gaugeImage} alt="Gauge Image/" className={styles.gauge_image} style={{ left: `${positionX * 100}%` }} />
                    </div>
                    <div className={styles.scale}>
                        <span>0</span>
                        <Image src={intervalBar} className={styles.interval_bar} alt='|' />
                        <Image src={intervalBar} className={styles.interval_bar} alt='|' />
                        <Image src={intervalBar} className={styles.interval_bar} alt='|' />
                        <span>100</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GaugeVoteItem;
