
'use client'
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "../public/image/logo.png"

const Header = ()=> {
    const router = useRouter()
    const segment = useSelectedLayoutSegments()
    console.log(segment[1])
    return(
        <div className="flex justify-around items-center w-full h-20 px-4 text-white bg-black nav font-semibold text-lg">
            <div className="flex items-center">
                <Image 
                    className="m-3"
                    src={logo}
                    alt="awefeawf" 
                    width={24} 
                    height={24}
                    priority
                    />
                <Link href='/'>고민친구</Link>
            </div>
            <div className="flex justify-end w-3/5">
                <div className="flex justify-around w-1/2">
                  <Link href='/home'>
                    {segment[1] === 'home' ?
                    <>
                    <h1 className="underline underline-offset-4 text-yellow-400">홈</h1>
                    </>: <> <h1 className="text-white">홈</h1></>
                    }
                  </Link>
                  <Link href='/vote'>
                    {segment[1] === 'vote' ?
                    <>
                    <h1 className="underline underline-offset-4 text-yellow-400">고민투표</h1>
                    </>: <> <h1 className="text-white">고민투표</h1></>
                    }
                  </Link>
                  <Link href='/community'>
                    {segment[1] === 'community' ?
                    <>
                    <h1 className="underline underline-offset-4 text-yellow-400">커뮤니티</h1>
                    </>: <> <h1 className="text-white">커뮤니티</h1></>
                    }
                  </Link>
                  <Link href='/mypage'>
                    {segment[1] === 'mypage' ?
                    <>
                    <h1 className="underline underline-offset-4 text-yellow-400">마이페이지</h1>
                    </>: <> <h1 className="text-white">마이페이지</h1></>
                    }
                  </Link>
                </div>
                
            </div>
            <div className="flex w-1/6 h-3/5">
                <button className="w-2/5" type="button" onClick={() => router.push("/i/signup") }>
                회원가입
                </button>
                <hr className="border-white border-1 h-full"/>
                <button className="w-2/5 bg-white text-black rounded " type="button" onClick={() => router.push("/login")}>
                로그인
                </button>
            </div>
            
        </div>
    )
    
}

export default Header;