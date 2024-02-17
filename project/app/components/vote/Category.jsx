'use client'
import { useState } from 'react';
import styles from '@/app/modules/voteCss/category.module.scss'
import Image from 'next/image'
import useVoteStore from '@/app/zustand/voteStore';

import downimg from '../../public/image/down.png'

const Category = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const selectedCategory = useVoteStore(state => state.selectedCategory); // Zustand에서 선택된 카테고리 가져오기
    const setSelectedCategory = useVoteStore(state => state.setSelectedCategory); // Zustand에서 선택된 카테고리 업데이트 함수 가져오기

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // Zustand를 통해 선택된 카테고리 업데이트
        setIsDropdownOpen(false); // dropdown 닫기
    };

    return(
        <div className={`${styles.container} ${isDropdownOpen ? styles['with-dropdown'] : ''}`}>
            <div className={`${styles.text} ${selectedCategory ? styles.selectedText : ''}`}>
                {selectedCategory || '분야 선택'}
            </div>
            <button 
                className={`${styles.button} ${isDropdownOpen ? styles.active : ''}`}
                onClick={toggleDropdown}
            >
                <Image
                    src={downimg}
                    style={{
                        width: 10,
                        height: 5
                    }}
                    alt='down/'
                />
            </button>
            {isDropdownOpen && (
                <div className={styles.dropdown_container}>
                    <div
                        className={`${styles.category} ${selectedCategory === '교육' ? styles.selected : ''} ${selectedCategory === '교육' ? styles.selectedEducation : ''}`}
                        onClick={() => handleCategorySelect('교육')}
                    >
                        교육
                    </div>
                    <div
                        className={`${styles.category} ${selectedCategory === '엔터테인먼트' ? styles.selected : ''}`}
                        onClick={() => handleCategorySelect('엔터테인먼트')}
                    >
                        엔터테인먼트
                    </div>
                    <div
                        className={`${styles.category} ${selectedCategory === '생활' ? styles.selected : ''}`}
                        onClick={() => handleCategorySelect('생활')}
                    >
                        생활
                    </div>
                    <div
                        className={`${styles.category} ${selectedCategory === '경제' ? styles.selected : ''}`}
                        onClick={() => handleCategorySelect('경제')}
                    >
                        경제
                    </div>
                    <div
                        className={`${styles.category} ${selectedCategory === '쇼핑' ? styles.selected : ''}`}
                        onClick={() => handleCategorySelect('쇼핑')}
                    >
                        쇼핑
                    </div>
                    <div
                        className={`${styles.category} ${selectedCategory === '기타' ? styles.selected : ''} ${selectedCategory === '기타' ? styles.selectedEtc : ''}`}
                        onClick={() => handleCategorySelect('기타')}
                    >
                        기타
                    </div>
                </div>
            )}
        </div>
    )
}

export default Category;