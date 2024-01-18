'use client'

import styles from '@/app/modules/review.module.scss'

const Home = ()=> {
    return(
        <div className={styles.container}>
            <div className={styles.button_container}>
                <div className={styles.sorting_button_container}>
                    <button className={styles.button}>조회순</button>
                    <button className={styles.button}>최신순</button>
                </div>
                <div className={styles.submit_button_container}>
                    <button className={styles.submit_button}>고민투표 후기 작성하기</button>
                </div>
            </div>
            <div className={styles.scrollable_container}>
                <div className={styles.review_box}>
                    <p>후기 1</p>
                </div>
                <div className={styles.review_box}>
                    <p>후기 2</p>
                </div>
                <div className={styles.review_box}>
                    <p>후기 3</p>
                </div>
            </div>
        </div>
    )
}

export default Home;