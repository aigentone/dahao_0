import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createGitSlice, GitSlice } from './slices/git';
import { createDocumentSlice, DocumentSlice } from './slices/document';
import { createGovernanceSlice, GovernanceSlice } from './slices/governance';
import { createAuthSlice, AuthSlice } from './slices/auth';

export type StoreState = GitSlice & DocumentSlice & GovernanceSlice & AuthSlice;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createGitSlice(...a),
        ...createDocumentSlice(...a),
        ...createGovernanceSlice(...a),
        ...createAuthSlice(...a),
      })),
      {
        name: 'dahao-storage',
        partialize: (state) => ({
          // Only persist specific parts of the state
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

export default useStore;