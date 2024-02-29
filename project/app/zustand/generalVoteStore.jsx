import {create} from 'zustand';

const useGeneralVoteStore = create((set) => ({
    voteGeneralItems: [
      { id: 1, placeholder: "투표 항목 1", image: null, fileData:null},
      { id: 2, placeholder: "투표 항목 2", image: null, fileData:null},
      { id: 3, placeholder: "투표 항목 3", image: null, fileData:null},
    ],

    setVoteItems: (items) => set({ voteItems: items }),
    addVoteItem: (newItem) =>
      set((state) => ({
        voteGeneralItems: [...state.voteGeneralItems, newItem],
      })),
    deleteVoteItem: (id) =>
    set((state) => ({
    voteGeneralItems: state.voteGeneralItems.filter((item) => item.id !== id),
    })),
    updateVoteItem: (id, updatedItem) =>
    set((state) => ({
    voteGeneralItems: state.voteGeneralItems.map((item) =>
        item.id === id ? updatedItem : item
    ),
    })),
  }));
  
  export default useGeneralVoteStore;
  