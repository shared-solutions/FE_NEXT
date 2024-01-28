import {create} from 'zustand';

const useSignUpStore = create((set) => ({
  currentStage: 'agree',
  isSucceed: {
    agree: false,
    email: false,
    password: false,
    nickname: false,
  },
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
export default useSignUpStore