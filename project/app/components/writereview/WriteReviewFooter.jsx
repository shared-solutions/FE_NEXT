'use client'
import React, { useState } from 'react'
import styles from '@/app/modules/writepostCss/writepostfooter.module.scss'
import Image from 'next/image'

import add_button from '../../public/image/add_button.png'
import imageicon from '../../public/image/imageicon.png'
import barimg from '../../public/image/bar.png'
import VotedModal from '../votedList/VotedModal'

const WriteReviewFooter = () => {
    const [isVotedModalOpen, setVotedModalOpen] = useState(false);

    const openVotedModal = () => {
        setVotedModalOpen(true);
    };

    const closeVotedModal = () => {
        setVotedModalOpen(false);
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
                        onClick={openVotedModal} 
                        className={styles.add_vote_button}>
                        투표 불러오기
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
                    <Image
                        src={barimg}
                        style={{
                            width: 2,
                            height: 23,
                            margin: 7
                        }}
                    />
                    <button className={styles.save_button}>임시저장</button>
                </div>
                {/* 모달이 열려있을 때 VoteModal 컴포넌트를 렌더링 */}
            {isVotedModalOpen && <VotedModal onClose={closeVotedModal} />}
        </div>
        
    )
}

export default WriteReviewFooter;