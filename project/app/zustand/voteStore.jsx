import {create} from 'zustand';

const useVoteStore = create((set) => ({
  voteTitle: '', // 투표 제목
  setVoteTitle: (title) => set({ voteTitle: title }),
}));

export default useVoteStore;
