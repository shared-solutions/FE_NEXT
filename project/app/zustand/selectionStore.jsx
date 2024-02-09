import { create } from "zustand";

const useSelectedBox = create((set) => ({
  selectedBoxIndex: null,
  selectedBoxData: null, // 새로운 상태 추가
  setSelectedBox: (index) => set({ selectedBoxIndex: index }),
  setSelectedBoxData: (data) => set({ selectedBoxData: data }), // 새로운 함수 추가
}));

export default useSelectedBox;
