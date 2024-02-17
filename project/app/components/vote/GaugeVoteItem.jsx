'use client'
import styles from '@/app/modules/voteCss/gaugevoteitem.module.scss'
import Image from 'next/image'

import gaugeImage from '../../public/image/gauge_img.png'
import intervalBar from '../../public/image/interval_bar.png'

const GaugeVoteItem = () => {
    return (
        <div className={styles.container}>
            <p>항목</p>
            <div className={styles.box}>
                <div className={styles.gauge_wrap}>
                    <div className={styles.bar}>
                        <Image
                            src={gaugeImage}
                            alt="Gauge Image/"
                            className={styles.gauge_image}
                        />
                    </div>
                    <div className={styles.scale}>
                        <span>0</span>
                        <Image 
                            src={intervalBar}
                            className={styles.interval_bar}
                        />
                        <Image 
                            src={intervalBar}
                            className={styles.interval_bar}
                        />
                        <Image 
                            src={intervalBar}
                            className={styles.interval_bar}
                        />
                        <span>100</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GaugeVoteItem;