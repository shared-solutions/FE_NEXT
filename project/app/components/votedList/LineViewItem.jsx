'user client'
import styles from '@/app/modules/votedListCss/lineViewItem.module.scss'

import LineBox from './LineBox'

const LineViewItem = () => {
    return (
        <div className={styles.container}>
            <div className={styles.box_container}>
                <LineBox top="1일전" title="배고프네요 뭐 먹을까요?" content="먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ" goodCount={34} messageCount={24} />
                <LineBox top="2일전" title="제목1" content="내용1" goodCount={15} messageCount={8} />
                <LineBox top="3일전" title="제목2" content="내용2" goodCount={15} messageCount={8} />
                <LineBox top="4일전" title="제목3" content="내용3" goodCount={15} messageCount={8} />
                <LineBox top="5일전" title="제목4" content="내용4" goodCount={15} messageCount={8} />
                <LineBox top="6일전" title="제목5" content="내용5" goodCount={15} messageCount={8} />
            </div>
        </div>
    );
};

export default LineViewItem;