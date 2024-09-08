'use client'
import Image from "next/image"
import Link from "next/link"
import styles from '@/app/modules/login.module.scss'
import smile from "@/app/public/image/smile.png"
import { useEffect } from "react"


export default function Modal() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
           
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
              .then(registration => { 
                console.log('Success');
              })
              .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
              });
          });
        }
      }, []);
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
            <Link href='/i/signin' className={styles.btn} scroll={false}><h2>이메일로 로그인하기</h2></Link>
            <div className={styles.option}>
                
                <Link href='/i/signup' scroll={false}>회원가입</Link>
            </div>
        </div>
    )
}
