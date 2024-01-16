
'use client'
import {useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";

import styles from '@/app/modules/footer.module.scss'
import { useState } from "react";
import { useAuthStore } from "../zustand/useAuthStore";

const Footer = ()=> {
    const segment = useSelectedLayoutSegments()
    const [isLogin, setIsLogin] =useState(false)
    console.log(segment[1])
    const { accessToken, setAccessToken } = useAuthStore();
    console.log(accessToken);
    if(isLogin===false && accessToken!==""){
        setIsLogin(true)
    }
    console.log(isLogin)
    return(
        <div className={styles.container} >
            <div className={styles.category}>
                <Link href={isLogin ? '/home' : '/login'}>
                    {segment[1] === 'home' ?
                    <>
                    <p style={{color:"#FFC700"}}>홈</p>
                    </>: <>
                    <p>홈</p>
                    </>
                    }
                </Link>
                <Link href={isLogin ? '/vote' : '/login'}>
                    {segment[1] === 'vote' ?
                    <>
                    <p style={{color:"#FFC700"}}>고민투표</p>
                    </>: <>
                    <p>고민투표</p>
                    </>
                    }
                </Link>
                <Link href={isLogin ? '/review' : '/login'}>
                    {segment[1] === 'review' ?
                    <>
                    <p style={{color:"#FFC700"}}>고민후기</p>
                    </>: <>
                    <p>고민후기</p>
                    </>
                    }
                </Link>
                <Link href={isLogin ? '/mypage' : '/login'}>
                    {segment[1] === 'mypage' ?
                    <>
                    <p style={{color:"#FFC700"}}>마이페이지</p>
                    </>: <>
                    <p>마이페이지</p>
                    </>
                    }
                </Link>
            </div>
            
        </div>
    )
    
}

export default Footer;