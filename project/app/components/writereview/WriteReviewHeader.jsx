import styles from '@/app/modules/writepostCss/writepostheader.module.scss'
import Image from 'next/image'

import close from '../../public/image/close.ico'

const WriteReviewHeader = () => {
    return (
        <div className={styles.header_container}>
            <Image
                src={close}
                style={{
                    width: 25,
                    height: 25,
                }}
            />
            <h4>고민 후기 작성하기</h4>
            <button className={styles.complete_button}>완료</button>
        </div>
    )
}

export default WriteReviewHeader;