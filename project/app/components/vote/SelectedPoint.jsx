'use client'
import styles from '@/app/modules/voteCss/selectedpoint.module.scss'
import Image from 'next/image'

import minusbutton from '../../public/image/delete.png'
import plusbutton from '../../public/image/add_button.png'

const SelectedPoint = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <span>채택 포인트</span>
                <div className={styles.point_container}>
                    <div className={styles.current_point}>
                        <div style={{ color: '#9B9B9B', marginRight: '2px' }}>현재 보유 포인트 :</div>
                        <div>1,350p</div>
                    </div>
                    <div className={styles.after_usage_point}>
                        <div style={{ color: '#9B9B9B', marginRight: '2px' }}>사용 후 포인트 :</div>
                        <div>1,050p</div>
                    </div>
                </div>
            </div>
            <div className={styles.button_container}>
            <button>
                <Image
                    src={minusbutton}
                    style={{
                        width: 25,
                        height: 25
                    }}
                    alt='minus/'
                />
            </button>
            <input className={styles.text_input} type='text' placeholder='직접입력' />
            <button>
                <Image
                    src={plusbutton}
                    style={{
                        width: 25,
                        height: 25
                    }}
                    alt='plus/'
                />
            </button>
        </div>
        </div>
    )
}

export default SelectedPoint;