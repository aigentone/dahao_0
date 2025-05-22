import { StateCreator } from 'zustand';
import { StoreState } from '..';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  author: string;
  status: 'draft' | 'active' | 'approved' | 'rejected' | 'implemented';
  type: 'standard' | 'emergency' | 'constitutional';
  createdAt: string;
  votingEndsAt: string;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  quorum: number;
  threshold: number;
}

export interface Vote {
  proposalId: string;
  voter: string;
  choice: 'for' | 'against' | 'abstain';
  timestamp: string;
  reason?: string;
}

export interface GovernanceSlice {
  // State
  proposals: Proposal[];
  currentProposal: Proposal | null;
  userVotes: Record<string, Vote>;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProposals: (status?: string) => Promise<void>;
  fetchProposal: (id: string) => Promise<void>;
  createProposal: (proposal: Omit<Proposal, 'id' | 'createdAt' | 'votes'>) => Promise<void>;
  updateProposal: (id: string, updates: Partial<Proposal>) => Promise<void>;
  submitVote: (proposalId: string, choice: Vote['choice'], reason?: string) => Promise<void>;
  executeProposal: (id: string) => Promise<void>;
}

export const createGovernanceSlice: StateCreator<
  StoreState,
  [],
  [],
  GovernanceSlice
> = (set, get) => ({
  // Initial state
  proposals: [],
  currentProposal: null,
  userVotes: {},
  isLoading: false,
  error: null,

  // Actions
  fetchProposals: async (status) => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    });

    try {
      const url = status ? `/api/governance/proposals?status=${status}` : '/api/governance/proposals';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch proposals');
      
      const proposals = await response.json();
      set((state) => {
        state.proposals = proposals;
        state.isLoading = false;
      });
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
        state.isLoading = false;
      });
    }
  },

  fetchProposal: async (id) => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    });

    try {
      const response = await fetch(`/api/governance/proposals/${id}`);
      if (!response.ok) throw new Error('Failed to fetch proposal');
      
      const proposal = await response.json();
      set((state) => {
        state.currentProposal = proposal;
        state.isLoading = false;
      });
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
        state.isLoading = false;
      });
    }
  },

  createProposal: async (proposal) => {
    try {
      const response = await fetch('/api/governance/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proposal),
      });
      
      if (!response.ok) throw new Error('Failed to create proposal');
      await get().fetchProposals();
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  updateProposal: async (id, updates) => {
    try {
      const response = await fetch(`/api/governance/proposals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('Failed to update proposal');
      await get().fetchProposals();
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  submitVote: async (proposalId, choice, reason) => {
    try {
      const response = await fetch(`/api/governance/proposals/${proposalId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice, reason }),
      });
      
      if (!response.ok) throw new Error('Failed to submit vote');
      
      const vote = await response.json();
      set((state) => {
        state.userVotes[proposalId] = vote;
      });
      
      await get().fetchProposal(proposalId);
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  executeProposal: async (id) => {
    try {
      const response = await fetch(`/api/governance/proposals/${id}/execute`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to execute proposal');
      await get().fetchProposals();
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },
});