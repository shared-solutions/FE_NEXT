'user client'
import styles from '@/app/modules/reviewCss/button.module.scss'

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sorting_button_container}>
                <div className={styles.button}>조회순</div>
                <div className={styles.button}>최신순</div>
            </div>
        </div>
    )
}

export default Header;