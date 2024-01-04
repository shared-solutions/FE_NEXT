"use client"
import Image from "next/image"
import close from "@/app/public/image/close.ico"
import loginbg from "@/app/public/image/loginbg.png"
import logo from "@/app/public/image/logo.png"
import { useRouter } from "next/navigation"
export default function Modal(){
    const router = useRouter()

    const Close = () => {
        router.back()
    }
    return (
        <div className="bg-black top-0 fixed bg-opacity-50 w-screen h-screen z-10">
            <div className="flex absolute w-1/2 bg-gray-700 h-xl left-1/4 top-24" >
                <button className="absolute w-8 h-8 hover:bg-yellow-400 rounded-full" onClick={Close}>
                <Image 
                    src={close}
                    alt="x" 
                    width={50} 
                    height={50}
                    priority
                    />
                </button>
                <div className="w-2/5 h-full bg-white flex flex-col items-center font-bold justify-around">
                    <div className="w-4/5 text-2xl mt-2.5">
                        <h1>고민친구들을 만나기 위한 첫 단계!🤓</h1>
                        <p className="text-gray-500 text-sm">서비스 이용을 위해 로그인 해주세요</p>
                    </div>
                    <div className="w-4/5 rounded-xl border-solid border-yellow-400 h-24 border-2">
                        <input 
                            className="bg-transparent focus:outline-none w-full rounded-xl h-1/2 border-0 pl-2.5" 
                            type="text" placeholder="아이디"/>
                        <hr className="border-1 border-yellow-400" />
                        <input 
                            className="bg-transparent focus:outline-none w-full rounded-xl h-1/2 border-0 pl-2.5" 
                            type="password" placeholder="비밀번호" 
                            /> 
                    </div>
                    <div className="w-4/5 flex justify-between">
                        <button className="w-semi-mid font-bold rounded-xl border-solid border-black h-12 border-2">
                            <h1>👋회원가입</h1>
                            </button>
                        <button className="bg-amber w-semi-mid font-bold rounded-xl border-solid border-yellow-400 h-12 border-2">
                            <h1>😑로그인</h1>
                        </button>
                    </div>

                </div>
                <div className="w-3/5 h-full">
                
                <div className="w-3/5 absolute h-full bg-opacity-40 bg-darkamber "></div>
                    <div className="text-white absolute text-2xl font-semibold w-3/5  ">
                        <h1 className="w-full text-right pt-4 p-2">세상의 모든 고민이 거쳐가는 공간,</h1>
                        <h1 className="flex justify-end w-full text-right pr-2">
                        <Image 
                            src={logo}
                            alt="x" 
                            width={30} 
                            height={20}
                            priority
                            />
                         고민친구</h1>
                    </div>
                    
                    
                    <Image 
                        src={loginbg}
                        alt="" 
                        priority
                        style={{width:'100%', height:'100%'}}
                    />
                </div>
            </div>
        </div>




    )
}/* Vector 36 */

