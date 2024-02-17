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

  // ----- 투표 스타일 ------
  selectedVoteStyle: '일반', // 기본값은 '일반'으로 설정
  setSelectedVoteStyle: (style) => set({ selectedVoteStyle: style }), // 투표 스타일 선택 함수
  resetSelectedVoteStyle: () => set({ selectedVoteStyle: '일반' }), // 투표 스타일 초기화 함수

  // ----- 투표 마감 시간 -----
  voteDeadline: null,
  setVoteDeadline: (deadline) => set({ voteDeadline: deadline }),
  
}));

export default useVoteStore;