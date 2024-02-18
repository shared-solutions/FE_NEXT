import { create } from "zustand";

const useStore = create((set) => ({
  user: {
    userImage: "",
    nickName: "",
    email: "",
    phone: "",
    password: "",
    security: "",
  },
  isEditing: {
    userImage: false,
    nickname: false,
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
  setUserData: (data) =>
    set((state) => ({ user: { ...state.user, ...data } })),
}));

export default useStore;
