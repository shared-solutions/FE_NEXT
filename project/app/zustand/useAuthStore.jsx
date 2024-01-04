import create from 'zustand';

// create our store
export const useAuthStore = create((set) => ({
  authenticated: false, // initial value of authenticated property
  user: {}, // initial value of user property
  setAuthentication: (val) => set((state) => ({ authenticated: val })), // function to set the authentication status
  setUser: (user) => set({ user }), // function to set user information
}));