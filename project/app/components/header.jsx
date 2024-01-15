
'use client'
import {useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from '@/app/modules/header.module.scss'

import logo from "../public/image/logo.png"
import notification from "../public/image/notification.png"
import search from "../public/image/search.png"
import menu from "../public/image/menu.png"
const Header = ()=> {
    const segment = useSelectedLayoutSegments()
    return(
        <div className={styles.container} >
            <div className={styles.logo}>
                <Image 
                    src={logo}
                    alt="." 
                    className={styles.logo_img}
                    width={30} 
                    height={30}
                    padding={5}
                    priority
                    />
                <Link href='/home'>고민친구</Link>
            </div>
            <div className={styles.menu_container}>
                <div className={styles.menu}>
                  <Link href='/notification'>
                    {segment[1] === 'notification' ?
                    <>
                    <Image 
                    className={styles.noti}
                    src={notification}
                    alt="awefeawf" 
                    width={24} 
                    height={24}
                    priority
                    />
                    </>: <>
                    <Image 
                    className={styles.noti}
                    src={notification}
                    alt="awefeawf" 
                    width={24} 
                    height={24}
                    priority
                    />
                    </>
                    }
                  </Link>
                  <Link href='/search'>
                    {segment[1] === 'search' ?
                    <>
                    <Image 
                    src={search}
                    alt="awefeawf" 
                    width={30} 
                    height={30}
                    priority
                    />
                    </>: <> 
                    <Image 
                    src={search}
                    alt="awefeawf" 
                    width={30} 
                    height={30}
                    priority
                    /></>
                    }
                  </Link>
                  <Link href='/menu'>
                    {segment[1] === 'menu' ?
                    <>
                    <Image 
                    src={menu}
                    alt="awefeawf" 
                    width={30} 
                    height={30}
                    priority
                    />
                    </>: <> 
                    <Image 
                    src={menu}
                    alt="awefeawf" 
                    width={30} 
                    height={30}
                    priority
                    /></>
                    }
                  </Link>
                </div>
            </div>
            
        </div>
    )
    
}

export default Header;