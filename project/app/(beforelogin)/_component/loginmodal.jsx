'use client'
import Image from "next/image"
import Link from "next/link"
import styles from '@/app/modules/login.module.scss'
import smile from "@/app/public/image/smile.png"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const RestApi = '74a6375e4d5e498e04211309f83a2ec5'
const Redirect = 'http://localhost:3000/api/auth/callback/kakao'

export default function Modal() {
    const router = useRouter();
    
    useEffect(() => {
        const handleKakaoLogin = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                console.log(code); // 코드가 잘 가져와지는지 확인하기 위해 콘솔에 출력
    
                if (code) {
                    const response = await axios.get(`http://dev.gomin-chingu.site/api/auth/callback/kakao?code=${code}`);
                    console.log('Kakao OAuth response:', response.data);
                    // 여기서 서버로부터 받은 토큰을 이용하여 로그인 등의 추가 작업을 수행할 수 있음
                    const token = response.data.token;
                    window.localStorage.setItem('token', token);
                    router.push('/home');
                }
            } catch (error) {
                console.error('Kakao OAuth error:', error);
            }
        };
    
        handleKakaoLogin();
    }, [router]);
    
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
            <button className={styles.btn} onClick={() => window.location.href=`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${RestApi}&redirect_uri=${Redirect}&response_type=code`}
            ><h2>카카오로 3초만에 시작하기</h2></button>
            <div className={styles.option}>
                <Link href='/i/signin' scroll={false}>이메일로 로그인</Link>
                <p>|</p>
                <Link href='/i/signup' scroll={false}>회원가입</Link>
            </div>
        </div>
    )
}
