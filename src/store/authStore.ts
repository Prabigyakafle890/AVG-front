import type { User } from '@/pages/auth/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuthData: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuthData: (user) => {
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
