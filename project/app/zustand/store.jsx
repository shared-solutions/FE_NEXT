import { create } from "zustand";

export const PageRendering = create((set) => ({
  activePage: "originalPage",
  changePage() {
    set({ activePage: "viewPage" });
  },
  backPage() {
    set({ activePage: "originalPage" });
  },
}));
