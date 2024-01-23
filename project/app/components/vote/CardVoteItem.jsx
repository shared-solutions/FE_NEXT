'user client'
import styles from '@/app/modules/voteCss/cardvoteitem.module.scss'
import Image from 'next/image'

import oneimg from '../../public/image/oneimage_grey.png'
import deleteimg from '../../public/image/delete.png'
import addbutton from '../../public/image/add_button.png'

const CardVoteItem = () => {
    return (
        <div className={styles.container}>
            <p>항목</p>
            <div className={styles.box}>
                <div className={styles.top}>
                    <input className={styles.write_item} type='text' placeholder='항목 1' />
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
                <div className={styles.bottom}>
                    {/* 이미지 버튼 */}
                    <Image 
                        src={oneimg}
                        style={{
                            width: 18,
                            height: 18
                    }}
                        alt='img/'
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

export default CardVoteItem;