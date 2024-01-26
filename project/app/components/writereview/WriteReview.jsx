'user clinet'
import styles from '@/app/modules/writepostCss/writepost.module.scss'

import WriteReviewHeader from "./WriteReviewHeader"
import WriteReviewFooter from "./WriteReviewFooter"

const WriteReview = () => {
    return (
        <div>
            <div className={styles.container}>
                <WriteReviewHeader />
                <div className={styles.content_container}>
                    <input className={styles.title} type='text' placeholder='제목'/>
                    <textarea className={styles.content} placeholder='함께 공유하고 싶은 내용을 남겨보세요.'/>
                </div>
                <input className={styles.tag} type='text' placeholder='# 태그입력'/>
                <WriteReviewFooter />
            </div>
        </div>
    )
}

export default WriteReview;