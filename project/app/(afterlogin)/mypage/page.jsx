import styles from '@/app/modules/mypage.module.scss'

export default function MyPage(){
    return(
        <div className={styles.container}>
            마이페이지
            <div className={styles.profile}>
                프로필
            </div>
            <div className={styles.info}>
                QnA나 저장페이지
            </div>
            <div className={styles.setting}>
                설정 및 로그아웃
            </div>
        </div>
    )
}