'use client'
import Header from '@/app/components/reviews/Header'
import ReviewBox from '@/app/components/reviews/ReviewBox'

import styles from '@/app/modules/reviewCss/review.module.scss'

export default function Review(){
    return(
        <div className={styles.container}>
            <Header />
            <div className={styles.scrollable_container}>
                <ReviewBox />
                <ReviewBox />
                <ReviewBox />
                <ReviewBox />
            </div>
        </div>
    )
}