'user client'
import Link from "next/link";

import styles from '@/app/modules/reviewCss/button.module.scss'

const WriteButton = () => {
    return(
        <Link href='/writereview'>
            <button className={styles.submit_button}>후기 작성</button>
        </Link>
    )
}

export default WriteButton;