'use client'
import { useEffect } from 'react'
import styles from '@/app/modules/writepostCss/writepostheader.module.scss'
import Image from 'next/image'
import Link from "next/link"

import close from '../../public/image/close.ico'

const WritePostHeader = ({ onSubmit }) => {
    return (
        <div className={styles.header_container}>
            <Link href="/vote">
                <Image
                    src={close}
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
            </Link>
            <h4>고민 작성하기</h4>
            <button className={styles.complete_button} onClick={onSubmit}>완료</button>
        </div>
    )
}

export default WritePostHeader;