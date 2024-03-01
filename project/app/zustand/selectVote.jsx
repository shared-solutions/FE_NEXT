import { create } from "zustand";
const useSelectVoteStore = create((set) => ({
  selectList: [],
  position: 0,

  // 해당 함수를 통해 selectList 업데이트
  updateSelectList: (optionId) => {
    set((state) => ({
      selectList: [optionId],
    }));
  },
  // position 업데이트 함수
  updatePosition: (newPosition) => {
    set({ position: newPosition });
  },
}));

export default useSelectVoteStore;
