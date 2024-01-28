'use client'
import React, { useState } from 'react'
import styles from '@/app/modules/writepostCss/writepostfooter.module.scss'
import Image from 'next/image'

import add_button from '../../public/image/add_button.png'
import imageicon from '../../public/image/imageicon.png'
import VoteModal from '../vote/VoteModal'

const WritePostFooter = () => {
    const [isVoteModalOpen, setVoteModalOpen] = useState(false);

    const openVoteModal = () => {
        setVoteModalOpen(true);
    };

    const closeVoteModal = () => {
        setVoteModalOpen(false);
    };

    return (
        <div className={styles.footer_container}>
            <div className={styles.footer_add_vote}>
                    <Image
                        src={add_button}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                    <button
                        onClick={openVoteModal} 
                        className={styles.add_vote_button}>
                        투표 추가
                    </button>
                </div>
        <div className={styles.footer_menu}>
                    <Image
                        src={imageicon}
                        style={{
                            width: 25,
                            height: 25,
                            margin: 20
                        }}
                    />
                    <div>|</div>
                    <button className={styles.save_button}>임시저장</button>
                </div>
                {/* 모달이 열려있을 때 VoteModal 컴포넌트를 렌더링 */}
            {isVoteModalOpen && <VoteModal onClose={closeVoteModal} />}
        </div>
        
    )
}

export default WritePostFooter;