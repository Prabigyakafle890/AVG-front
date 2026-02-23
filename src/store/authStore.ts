import type { User } from '@/pages/auth/types';
import { create } from 'zustand';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuthData: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setAuthData: (user) => {
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
