import { StateCreator } from 'zustand';
import { StoreState } from '..';

export interface Document {
  id: string;
  title: string;
  content: string;
  path: string;
  lastModified: string;
  author: string;
  tags: string[];
  type: 'dao' | 'standard' | 'proposal';
}

export interface DocumentSlice {
  // State
  documents: Document[];
  currentDocument: Document | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setDocuments: (documents: Document[]) => void;
  setCurrentDocument: (document: Document | null) => void;
  setSearchQuery: (query: string) => void;
  fetchDocuments: (type?: string) => Promise<void>;
  fetchDocument: (id: string) => Promise<void>;
  createDocument: (document: Omit<Document, 'id' | 'lastModified'>) => Promise<void>;
  updateDocument: (id: string, updates: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  searchDocuments: (query: string) => Promise<void>;
}

export const createDocumentSlice: StateCreator<
  StoreState,
  [],
  [],
  DocumentSlice
> = (set, get) => ({
  // Initial state
  documents: [],
  currentDocument: null,
  searchQuery: '',
  isLoading: false,
  error: null,

  // Actions
  setDocuments: (documents) => set((state) => {
    state.documents = documents;
  }),

  setCurrentDocument: (document) => set((state) => {
    state.currentDocument = document;
  }),

  setSearchQuery: (query) => set((state) => {
    state.searchQuery = query;
  }),

  fetchDocuments: async (type) => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    });

    try {
      const url = type ? `/api/documents?type=${type}` : '/api/documents';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch documents');
      
      const documents = await response.json();
      set((state) => {
        state.documents = documents;
        state.isLoading = false;
      });
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
        state.isLoading = false;
      });
    }
  },

  fetchDocument: async (id) => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    });

    try {
      const response = await fetch(`/api/documents/${id}`);
      if (!response.ok) throw new Error('Failed to fetch document');
      
      const document = await response.json();
      set((state) => {
        state.currentDocument = document;
        state.isLoading = false;
      });
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
        state.isLoading = false;
      });
    }
  },

  createDocument: async (document) => {
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(document),
      });
      
      if (!response.ok) throw new Error('Failed to create document');
      await get().fetchDocuments();
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  updateDocument: async (id, updates) => {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('Failed to update document');
      await get().fetchDocuments();
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  deleteDocument: async (id) => {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete document');
      await get().fetchDocuments();
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  searchDocuments: async (query) => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
      state.searchQuery = query;
    });

    try {
      const response = await fetch(`/api/documents/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search documents');
      
      const documents = await response.json();
      set((state) => {
        state.documents = documents;
        state.isLoading = false;
      });
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
        state.isLoading = false;
      });
    }
  },
});