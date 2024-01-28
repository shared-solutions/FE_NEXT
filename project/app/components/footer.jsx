
'use client'
import {useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";

import styles from '@/app/modules/footer.module.scss'

const Footer = ()=> {
    const segment = useSelectedLayoutSegments()
    return(
        <div className={styles.container} >
            <div className={styles.category}>
            <Link href='/home'>
                {segment[1] === 'home' ?
                    <p style={{color:"#FFC700"}}>홈</p> :
                    <p>홈</p>
                }
            </Link>
            <Link href='/vote'>
                {segment[1] === 'vote' ?
                    <p style={{color:"#FFC700"}}>고민투표</p> :
                    <p>고민투표</p>
                }
            </Link>
            <Link href='/review'>
                {segment[1] === 'review' ?
                    <p style={{color:"#FFC700"}}>고민후기</p> :
                    <p>고민후기</p>
                }
            </Link>
            <Link href='/mypage'>
                {segment[1] === 'mypage' ?
                    <p style={{color:"#FFC700"}}>마이페이지</p> :
                    <p>마이페이지</p>
                }
            </Link>
            </div>
        </div>
    )
}
export default Footer;