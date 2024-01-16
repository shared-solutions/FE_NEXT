'use client'
import styles from '@/app/modules/mypage.module.scss'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function MyPage(){
    const router = useRouter()
    const data = useSession
    const Logout = () => {
        signOut({redirect:false})
        .then(()=>{
            router.replace('/')
        })
    }
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
                <button onClick={Logout}>로그아웃</button>
            </div>
        </div>
    )
}