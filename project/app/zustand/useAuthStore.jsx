import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: global.accessToken || '', // 초기값은 global.accessToken이 있으면 그 값, 없으면 빈 문자열
  setAccessToken: (newToken) => {
    set({ accessToken: newToken });
    global.accessToken = newToken;
  },
}));

export { useAuthStore };
