import {create} from "zustand";
const useSelectVoteStore = create((set) => ({
  selectList: [],

  // 해당 함수를 통해 selectList 업데이트
  updateSelectList: (optionId) => {
    set((state) => ({
      selectList: [...state.selectList, optionId],
    }));
  },
}));

export default useSelectVoteStore;