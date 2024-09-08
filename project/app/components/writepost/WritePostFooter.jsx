import React, { useState } from 'react';
import styles from '@/app/modules/writepostCss/writepostfooter.module.scss';
import Image from 'next/image';

import add_button from '../../public/image/add_button.png';
import imageicon from '../../public/image/imageicon.png';
import VoteModal from '../vote/VoteModal';

const WritePostFooter = ({ isWrote }) => { // 객체 구조 분해를 통해 isWrote prop을 받음
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
                <button
                    className={styles.add_vote_button}
                    disabled={!isWrote}
                    onClick={openVoteModal}>
                    <Image
                    src={add_button}
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />투표추가
                </button>
            </div>
            
            {isVoteModalOpen && <VoteModal onClose={closeVoteModal} />}
        </div>
    );
}

export default WritePostFooter;
