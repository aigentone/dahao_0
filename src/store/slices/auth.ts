import { StateCreator } from 'zustand';
import { StoreState } from '..';

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  githubId: string;
  accessToken?: string;
}

export interface AuthSlice {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const createAuthSlice: StateCreator<
  StoreState,
  [],
  [],
  AuthSlice
> = (set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  login: async () => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    });

    try {
      // Redirect to GitHub OAuth
      window.location.href = '/api/auth/github';
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
        state.isLoading = false;
      });
    }
  },

  logout: async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to logout');
      
      set((state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  checkAuth: async () => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    });

    try {
      const response = await fetch('/api/auth/me');
      
      if (response.ok) {
        const user = await response.json();
        set((state) => {
          state.user = user;
          state.isAuthenticated = true;
          state.isLoading = false;
        });
      } else {
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.isLoading = false;
        });
      }
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
        state.isAuthenticated = false;
        state.isLoading = false;
      });
    }
  },

  setUser: (user) => set((state) => {
    state.user = user;
    state.isAuthenticated = !!user;
  }),
});