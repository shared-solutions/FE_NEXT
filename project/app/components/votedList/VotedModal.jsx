'user clinet'
import React, { useState } from 'react';
import styles from '@/app/modules/votedListCss/votedmodal.module.scss';
import Image from 'next/image'

import downimg from '../../public/image/down.png'
import gridview from '../../public/image/grid_view.png'
import lineview from '../../public/image/line_view.png'

const VotedModal = ({ onClose }) => {
    return (
        <div className={styles.modal_Overlay}>
            <div className={styles.modal_container}>
                <div className={styles.modal_content}>
                    {/* 상단 바 고정 */}
                    <button onClick={onClose} className={styles.closeButton}>
                        <Image
                            src={downimg}
                            style={{
                                width: 23,
                                height: 10
                            }}
                            alt='down/'
                        />
                    </button>
                    {/* ---- 컨텐츠 시작 ---- */}
                    <div className={styles.modal_innerContent}>
                        <div className={styles.header}>
                            <p>내 투표</p>
                            <div className={styles.choice_container}>
                                <Image
                                    src={gridview}
                                    style={{
                                        width: 16,
                                        height: 16
                                    }}
                                />
                                <Image
                                    src={lineview}
                                    style={{
                                        width: 16,
                                        height: 16,
                                        marginLeft: 18,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* ---- 컨텐츠 끝 ---- */}
                </div>
            </div>
        </div>
    );
};

export default VotedModal;
