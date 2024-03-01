import {create} from 'zustand';

export const voteDetailStore = create((set) => ({
  allCandidatePercent: [],
  topCandidatePercent: [],
  topCandidate: [],
  topVoteResult: [],
  userVote: [],
  userVotePercent: [],
  userVoteResult: [],
  pollOption: [],
  totalGauge: null,
  userGauge: null,
  isVoted: false,
  onGoing: false,

  setAllCandidatePercent: (allCandidatePercent) => set({ allCandidatePercent }),
  setTopCandidatePercent: (topCandidatePercent) => set({ topCandidatePercent }),
  setTopCandidate: (topCandidate) => set({ topCandidate }),
  setTopVoteResult: (topVoteResult) => set({ topVoteResult }),
  setUserVote: (userVote) => set({ userVote }),
  setUserVotePercent: (userVotePercent) => set({ userVotePercent }),
  setUserVoteResult: (userVoteResult) => set({ userVoteResult }),
  setPollOption: (pollOption) => set({ pollOption }),
  setTotalGauge: (totalGauge) => set({ totalGauge }),
  setUserGauge: (userGauge) => set({ userGauge }),
  setIsVoted: (isVoted) => set({ isVoted }),
  setOnGoing: (onGoing) => set({ onGoing }),
}));

export default voteDetailStore;