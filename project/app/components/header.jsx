
'use client'
import {useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from '@/app/modules/header.module.scss'

import logo from "../public/image/logo.png"

import { Bell, Menu, Search } from "lucide-react";
const Header = ()=> {
    const segment = useSelectedLayoutSegments()
    return(
        <div className={styles.container} >
            <div className={styles.logo}>
              <Link href='/home'>
                <Image 
                    src={logo}
                    alt="." 
                    width={30} 
                    height={30}
                    priority
                    />
                </Link>
            </div>
            <div className={styles.menu_container}>
                <div className={styles.menu}>
                  <Link href='/notification'>
                    {segment[1] === 'notification' ?
                    <>
                    <Bell />
                    </>: <>
                    <Bell />
                    </>
                    }
                  </Link>
                  <Link href='/search'>
                    {segment[1] === 'search' ?
                    <>
                    <Search />
                    </>: <> 
                    <Search />
                    </>
                    }
                  </Link>
                  <Link href='/menu'>
                    {segment[1] === 'menu' ?
                    <>
                     <Menu />
                    </>: <> 
                    <Menu />
                    </>
                    }
                  </Link>
                </div>
            </div>
            
        </div>
    )
    
}

export default Header;