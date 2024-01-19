'user client'
import styles from '@/app/modules/voteCss/category.module.scss'
import Image from 'next/image'

import downimg from '../../public/image/down.png'

const Category = () => {
    return(
        <div className={styles.container}>
            <div className={styles.text}>게시판 선택</div>
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

export default Category;