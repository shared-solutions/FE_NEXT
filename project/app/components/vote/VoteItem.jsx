'user client'
import styles from '@/app/modules/voteCss/voteitem.module.scss'
import Image from 'next/image'

import oneimg from '../../public/image/oneimage.png'
import deleteimg from '../../public/image/delete.png'

const VoteItem = () => {
    return(
        <div className={styles.container}>
            <input className={styles.write_item} type='text' placeholder='투표 항목 1' />
            <div className={styles.menu_container}>
                {/* 이미지 버튼 */}
                <Image 
                    src={oneimg}
                    style={{
                        width: 18,
                        height: 18
                    }}
                />
                {/* 삭제 버튼 */}
                <Image
                    src={deleteimg} 
                    style={{
                        width: 18,
                        height: 18
                    }}
                />
            </div>
        </div>
    )
}

export default VoteItem;