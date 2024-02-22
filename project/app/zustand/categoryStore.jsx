import { create } from "zustand";

export const categoryStore = create((set) => ({
  categories: {
    education: false,
    entertainment: false,
    life: false,
    economy: false,
    shopping: false,
    etc: false,
  },
  setCategoryClicked: (category, value) =>
    set((state) => ({ categories: { ...state.categories, [category]: value } })),
}));