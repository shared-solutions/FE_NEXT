'user client'
import styles from '@/app/modules/voteCss/selectedpoint.module.scss'
import Image from 'next/image'

import minusbutton from '../../public/image/delete.png'
import plusbutton from '../../public/image/add_button.png'

const SelectedPoint = () => {
    return (
        <div className={styles.container}>
            <button>
                <Image
                    src={minusbutton}
                    style={{
                        width: 25,
                        height: 25
                    }}
                    alt='minus/'
                />
            </button>
            <input className={styles.text_input} type='text' placeholder='직접입력' />
            <button>
                <Image
                    src={plusbutton}
                    style={{
                        width: 25,
                        height: 25
                    }}
                    alt='plus/'
                />
            </button>
        </div>
    )
}

export default SelectedPoint;