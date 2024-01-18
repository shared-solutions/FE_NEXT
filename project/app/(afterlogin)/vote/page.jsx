'user client'
import Image from "next/image";
import styles from '@/app/modules/vote.module.scss'

import close from '../../public/image/close.ico'
import add_button from '../../public/image/add_button.png'
import imageicon from '../../public/image/imageicon.png'

export default function Vote(){
    return(
        <div>
            <div className={styles.container}>
                <div className={styles.header_container}>
                    <Image
                        src={close}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                    <h4>고민 작성하기</h4>
                    <button className={styles.complete_button}>완료</button>
                </div>
                <div className={styles.content_container}>
                    <input className={styles.title} type='text' placeholder='제목'/>
                    <textarea className={styles.content} placeholder='함께 공유하고 싶은 내용을 남겨보세요.'/>
                </div>
                <input className={styles.tag} type='text' placeholder='# 태그입력'/>
            </div>
            <div className={styles.footer_container}>
                <div className={styles.footer_add_vote}>
                    <Image
                        src={add_button}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                    <button className={styles.add_vote_button}>투표 추가</button>
                </div>
                <div className={styles.footer_menu}>
                    <Image
                        src={imageicon}
                        style={{
                            width: 25,
                            height: 25,
                            margin: 20
                        }}
                    />
                    <div>|</div>
                    <button className={styles.save_button}>임시저장</button>
                </div>
            </div>
        </div>
    )
}