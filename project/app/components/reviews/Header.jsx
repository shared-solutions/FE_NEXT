'user client'
import styles from '@/app/modules/reviewCss/header.module.scss'

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sorting_button_container}>
                <div className={styles.button}>조회순</div>
                <div className={styles.button}>최신순</div>
            </div>
            <div className={styles.submit_button_container}>
                <button className={styles.submit_button}>고민투표 후기 작성하기</button>
            </div>
        </div>
    )
}

export default Header;