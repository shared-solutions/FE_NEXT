
'use client'
import {useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import styles from '@/app/modules/footer.module.scss'

import F_home from "../public/image/f_home";
import F_review from "../public/image/f_comment";
import F_vote from "../public/image/f_vote";
const Footer = ()=> {
    const segment = useSelectedLayoutSegments()
    
    return(
        <div className={styles.container} >
            <div className={styles.category}>
            <Link href='/home' className={styles.f_btn}>
                {segment[1] === 'home' ?
                    <F_home fillColor={"#FFE563"}/>
                    :
                    <F_home fillColor={"#B9B9B9"}/>
                }
                {segment[1] === 'home' ? <p style={{color:"#FFE563"}}>홈</p> :<p style={{color:"#B9B9B9"}}>홈</p> }
            </Link>
            <Link href='/vote' className={styles.f_btn}>
                {segment[1] === 'vote' ?
                    <F_vote fillColor={"#FFE563"}/>
                         
                    :
                    <F_vote fillColor={"#B9B9B9"}/>
                }
                {segment[1] === 'vote' ? <p style={{color:"#FFE563"}}>고민투표</p> :<p style={{color:"#B9B9B9"}}>고민투표</p> }
            </Link>
            <Link href='/review' className={styles.f_btn}>
                
                {segment[1] === 'review' ?
                    <F_review fillColor={"#FFE563"}/>
                         
                    :
                    <F_review fillColor={"#B9B9B9"}/>
                }
                {segment[1] === 'review' ? <p style={{color:"#FFE563"}}>고민후기</p> :<p style={{color:"#B9B9B9"}}>고민후기</p> }
            </Link>
            
            </div>
        </div>
    )
}
export default Footer;