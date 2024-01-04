
import Image from 'next/image'
import logo from './public/image/bglogo.png'
import Link from 'next/link'

export default function Custom404() {
    return (
        <div className="bg-amber-300 w-full h-screen flex flex-col justify-center items-center font-bold">
            <Image 
                    className="m-3"
                    src={logo}
                    alt="awefeawf" 
                    width={200} 
                    height={200}
                    priority
                    />
            <h1>404 - 존재하지 않는 페이지 입니다.ㅜㅜ</h1>
            <Link href='/'><h1>홈 화면으로 이동하기</h1></Link>
        </div>
        
    )
  }