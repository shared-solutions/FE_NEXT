'use client'
import styles from '@/app/modules/voteCss/votedeadline.module.scss'
import Image from 'next/image'

import downimg from '../../public/image/down.png'

const VoteDeadline = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>날짜, 시간 선택</div>
            <button className={styles.button}>
                <Image
                    src={downimg}
                    style={{
                        width: 10,
                        height: 5
                    }}
                />
            </button>
        </div>
    )
}

export default VoteDeadline;