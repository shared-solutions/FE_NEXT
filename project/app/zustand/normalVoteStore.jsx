import {create} from 'zustand';

const useVoteStore = create((set) => ({
    voteCardItems: [
      { id: 1, placeholder: "항목 1", image: null,fileData:null},
      { id: 2, placeholder: "항목 2", image: null, fileData:null},
    ],

    setVoteItems: (items) => set({ voteItems: items }),
    addVoteItem: (newItem) =>
      set((state) => ({
        voteCardItems: [...state.voteCardItems, newItem],
      })),
    deleteVoteItem: (id) =>
    set((state) => ({
    voteCardItems: state.voteCardItems.filter((item) => item.id !== id),
    })),
    updateVoteItem: (id, updatedItem) =>
    set((state) => ({
    voteCardItems: state.voteCardItems.map((item) =>
        item.id === id ? updatedItem : item
    ),
    })),
  }));
  
  export default useVoteStore;
  