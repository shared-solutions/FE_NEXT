import styles from '@/app/modules/writepostCss/writepostfooter.module.scss'
import Image from 'next/image'

import add_button from '../../public/image/add_button.png'
import imageicon from '../../public/image/imageicon.png'

const WritePostFooter = () => {
    return (
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
        
    )
}

export default WritePostFooter;