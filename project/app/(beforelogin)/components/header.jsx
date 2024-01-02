/* 로그인 전의 헤더*/ 
'use client'
import { useRouter } from "next/navigation";
import Logo from "../../public/logo";
import Link from "next/link";

const Header = ()=> {
    const router = useRouter()
    return(
        <div className="flex justify-around items-center w-full h-20 px-4 text-white bg-black fixed nav font-semibold text-lg">
            <div className="flex items-center"><Logo/><Link href='/'>고민친구</Link></div>
            <div className="flex justify-end w-3/5">
                <div className="flex justify-around w-1/2">
                  <Link href='/'>홈</Link>
                  <Link href='/'>고민투표</Link>
                  <Link href='/'>커뮤니티</Link>
                  <Link href='/'>마이페이지</Link>  
                </div>
                
            </div>
            <div className="flex w-1/6">
                <button className="w-1/2" type="button" onClick={() => router.push("/")}>
                회원가입
                </button>
                <button className="bg-white text-black rounded w-9/12" type="button" onClick={() => router.push("/")}>
                로그인
                </button>
            </div>
            
        </div>
    )
    
}

export default Header;