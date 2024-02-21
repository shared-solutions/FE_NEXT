import {create} from 'zustand';

const useFindPwStore = create((set) => ({
  currentStage: 'EmailInput',
  checkEmail:'',
  isSucceed: {
    EmailInput: false,
    Verify: false,
    password: false,
  },
  setEmailStore: (email) => set({ checkEmail:email }),
  setCurrentStage: (stage) => set({ currentStage: stage }),
  setIsSucceed: (key) => set((state) => ({ 
    isSucceed: { ...state.isSucceed, [key]: true } 
  })),
  handleNext: () => {
    const stages = ['agree', 'email', 'password', 'nickname'];

    for (const stage of stages) {
      if (!set.getState().isSucceed[stage]) {
        set.getState().setIsSucceed(stage);
        set.getState().setCurrentStage(stage === 'nickname' ? 'nickname' : stages[stages.indexOf(stage) + 1]);
        break;
      }
    }
  },
}));
export default useFindPwStore