import { create } from "zustand";

const useVotedListBox = create((set) => ({
  // votedBoxIndex: null,
  votedBoxData: null, // 새로운 상태 추가
  // setVotedBox: (index) => set({ selectedBoxIndex: index }),
  setVotedBoxData: (data) => set({ votedBoxData: data }), // 새로운 함수 추가
}));

export default useVotedListBox;