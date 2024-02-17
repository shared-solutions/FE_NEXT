import { create } from "zustand";
import hotimg from "@/app/public/image/hotimg.png";
import waitimg from "@/app/public/image/waitimg.png";

export const PageRendering = create((set) => ({
  activePage: "originalPage",
  title: "",
  img: "",
  changePage() {
    set({
      activePage: "viewPage",
      title: "지금 가장 핫한 고민투표",
      img: hotimg,
    });
  },
  changePageWait() {
    set({
      activePage: "viewPage",
      title: "답변을 기다리는 고민들",
      img: waitimg,
    });
  },
  backPage() {
    set({ activePage: "originalPage" });
  },
}));
