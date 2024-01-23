'user client'
// import React from 'react'
import styles from '@/app/modules/voteCss/normalvoteitem.module.scss'
import Image from 'next/image'

import oneimg from '../../public/image/oneimage.png'
import addbutton from '../../public/image/add_button.png'
import deleteimg from '../../public/image/delete.png'

const NormalVoteItem = () => {
    return (
        <div className={styles.container}>
            <p>항목</p>
            <div className={styles.box}>
                <input className={styles.write_item} type='text' placeholder='투표 항목 1' />
                <div className={styles.menu_container}>
                {/* 이미지 버튼 */}
                    <Image 
                        src={oneimg}
                        style={{
                        width: 18,
                        height: 18
                        }}
                        alt='img/'
                    />
                    {/* 삭제 버튼 */}
                    <Image
                        src={deleteimg} 
                        style={{
                        width: 18,
                        height: 18
                        }}
                        alt='delete/'
                    />
                </div>
            </div>
            <div className={styles.add_item}>
                <button>
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