'user clinet'
import styles from '@/app/modules/voteCss/votemodal.module.scss';
import Image from 'next/image'

import VoteStyle from "./VoteStyle"
import VoteItem from "./VoteItem"
import Category from "./Category"
import VoteDeadline from "./VoteDeadline"
import SelectedPoint from "./SelectedPoint"

import downimg from '../../public/image/down.png'
import addbutton from '../../public/image/add_button.png'

const VoteModal = ({ onClose }) => {
    return (
        <div className={styles.modal_Overlay}>
            <div className={styles.modal_container}>
                <div className={styles.modal_content}>
                    {/* 상단 바 고정 */}
                    <button onClick={onClose} className={styles.closeButton}>
                        <Image
                            src={downimg}
                            style={{
                                width: 23,
                                height: 10
                            }}
                            alt='down/'
                        />
                    </button>
                    {/* ---- 투표 내용 입력 시작 ---- */}
                    <div className={styles.modal_innerContent}>
                        <p>투표 제목</p>
                        <input className={styles.write_title} type='text' placeholder='내용을 입력하세요'/>
                        <p>투표 스타일</p>
                        <VoteStyle />
                        <p>항목</p>
                        <VoteItem />
                        <VoteItem />
                        <VoteItem />
                        <div className={styles.add_item}>
                            <button>
                                <Image
                                    src={addbutton}
                                    style={{
                                     width: 30,
                                     height: 30
                                    }}
                                    alt='add/'
                                />
                            </button>
                            <div className={styles.add_context}>항목 추가하기</div>
                        </div>
                        <p>글 카테고리</p>
                        <Category />
                        <p>투표 마감 시간 설정</p>
                        <VoteDeadline />
                        <p>채택 포인트</p>
                        <SelectedPoint />
                    </div>
                    {/* ---- 투표 내용 입력 끝 ---- */}
                    <div className={styles.complete_button_container}>
                        <button>완료</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoteModal;
