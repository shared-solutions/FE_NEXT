import {create} from 'zustand';

const useVoteStore = create((set) => ({

  // ----- 투표 제목 ------
  voteTitle: '', // 기본값은 빈 문자열로 설정
  setVoteTitle: (title) => set({ voteTitle: title }), // 투표 제목 설정
  resetVoteTitle: () => set(() => ({ voteTitle: '' })), // 투표 제목 초기화

  // ----- 카테고리 ------
  selectedCategory: null, // 선택한 카테고리 상태 추가
  setSelectedCategory: (category) => set({ selectedCategory: category }), // 선택한 카테고리 설정
  resetSelectedCategory: () => set(() => ({ selectedCategory: null })), // 선택된 카테고리 초기화
}));

export default useVoteStore;