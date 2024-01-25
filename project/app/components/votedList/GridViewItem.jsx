'user client'
import styles from '@/app/modules/votedListCss/gridViewItem.module.scss'

import GridBox from './GridBox'

const GridViewItem = () => {
    return (
        <div className={styles.container}>
            <div className={styles.box_container}>
                <GridBox top="1일전" title="배고프네요 뭐 먹을까요?" content="먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ" goodCount={34} messageCount={24} />
                <GridBox top="2일전" title="제목1" content="내용1" goodCount={15} messageCount={8} />
                <GridBox top="3일전" title="제목2" content="내용2" goodCount={15} messageCount={8} />
                <GridBox top="4일전" title="제목3" content="내용3" goodCount={15} messageCount={8} />
                <GridBox top="5일전" title="제목4" content="내용4" goodCount={15} messageCount={8} />
                <GridBox top="6일전" title="제목5" content="내용5" goodCount={15} messageCount={8} />
            </div>
        </div>
    );
};

export default GridViewItem;