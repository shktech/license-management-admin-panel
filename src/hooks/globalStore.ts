import { User, Organization } from '@/types/types';
import{ create } from 'zustand';

interface StoreState {
  isLoading: boolean;
  user: User | null;
  organizations: Organization[];
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
  setOrganizations: (organizations: Organization[]) => void;
}

const useStore = create<StoreState>((set) => ({
  isLoading: false,
  user: null,
  organizations: [],
  setLoading: (isLoading) => set({ isLoading }),
  setUser: (user: User | null) => set({ user }),
  setOrganizations: (organizations) => set({ organizations }),
}));

export default useStore;