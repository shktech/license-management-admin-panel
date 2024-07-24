import{ create } from 'zustand';

interface StoreState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useStore;