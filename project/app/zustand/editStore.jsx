import { create } from "zustand";

const useStore = create((set) => ({
  user: {
    nickname: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    security: "",
  },
  isEditing: {
    nickname: false,
    name: false,
    email: false,
    phone: false,
    password: false,
    security: false,
  },
  // 액션: 필드 수정 여부 토글
  toggleEditing: (field) =>
    set((state) => ({
      isEditing: { ...state.isEditing, [field]: !state.isEditing[field] },
    })),
  // 액션: 필드 값 수정
  updateField: (field, value) =>
    set((state) => ({ user: { ...state.user, [field]: value } })),
}));

export default useStore;
