"use client"
import Image from "next/image"
import Link from "next/link"
import { signIn, signOut } from "next-auth/react"

import styles from '@/app/modules/login.module.scss'
import smile from "@/app/public/image/smile.png"


export default function Modal(){
    
    return (
        <div className={styles.container}>
            <div className={styles.blank}/>
            <div className={styles.title}>
                <Image 
                src={smile}
                alt="x" 
                width={100} 
                height={100}
                priority
                />
                <h1>고민친구</h1>
            </div>
            <div className={styles.blank}/>
            <div className={styles.sub}>
                <p>간편하게 로그인하고</p>
                <p>나의 고민을 공유해보세요.</p>
            </div>
            <button className={styles.btn} onClick={() => signIn("kakao", { redirect: true, callbackUrl: "/home" })}
            ><h2>카카오로 3초만에 시작하기</h2></button> 
            <button onClick={() => signOut()}>로그아웃</button>   
            <div className={styles.option}>
                <Link href='/signup'>이메일로 로그인</Link>
                <p>|</p>
                <Link href='/signup'>회원가입</Link>
            </div>
            
            
            
        </div>




    )
}

