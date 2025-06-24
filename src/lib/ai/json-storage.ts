// JSON Storage System for DAHAO Agent Analyses
// Provides persistence layer for all AI analysis data

import { promises as fs } from 'fs';
import path from 'path';
import { AgentAnalysis, AnalysisStorage } from './types';

const STORAGE_FILE = path.join(process.cwd(), 'src/lib/mock-data/agent-analyses.json');

// Initialize storage file if it doesn't exist
async function ensureStorageFile(): Promise<void> {
  try {
    await fs.access(STORAGE_FILE);
  } catch (error) {
    // File doesn't exist, create it
    const initialData: AnalysisStorage = {
      analyses: {},
      metadata: {
        version: '1.0',
        lastUpdated: null,
        totalAnalyses: 0,
        totalCost: 0
      }
    };
    await fs.writeFile(STORAGE_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

// Read storage file
async function readStorage(): Promise<AnalysisStorage> {
  await ensureStorageFile();
  try {
    const data = await fs.readFile(STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading analysis storage:', error);
    throw new Error('Failed to read analysis storage');
  }
}

// Write storage file
async function writeStorage(storage: AnalysisStorage): Promise<void> {
  try {
    await fs.writeFile(STORAGE_FILE, JSON.stringify(storage, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing analysis storage:', error);
    throw new Error('Failed to write analysis storage');
  }
}

// Save a new analysis
export async function saveAnalysis(analysis: AgentAnalysis): Promise<void> {
  const storage = await readStorage();
  
  // Add analysis to storage
  storage.analyses[analysis.id] = analysis;
  
  // Update metadata
  storage.metadata.lastUpdated = new Date().toISOString();
  storage.metadata.totalAnalyses = Object.keys(storage.analyses).length;
  storage.metadata.totalCost += analysis.usage.cost.amount;
  
  await writeStorage(storage);
}

// Get analysis by element ID
export async function getAnalysesByElementId(elementId: string): Promise<AgentAnalysis[]> {
  const storage = await readStorage();
  
  return Object.values(storage.analyses).filter(
    analysis => analysis.target.elementId === elementId
  ).sort((a, b) => new Date(b.timeline.completedAt).getTime() - new Date(a.timeline.completedAt).getTime());
}

// Get analyses by user ID
export async function getAnalysesByUserId(userId: string): Promise<AgentAnalysis[]> {
  const storage = await readStorage();
  
  return Object.values(storage.analyses).filter(
    analysis => analysis.requestedBy.userId === userId
  ).sort((a, b) => new Date(b.timeline.completedAt).getTime() - new Date(a.timeline.completedAt).getTime());
}

// Get analyses by branch ID
export async function getAnalysesByBranchId(branchId: string): Promise<AgentAnalysis[]> {
  const storage = await readStorage();
  
  return Object.values(storage.analyses).filter(
    analysis => analysis.target.branchId === branchId
  ).sort((a, b) => new Date(b.timeline.completedAt).getTime() - new Date(a.timeline.completedAt).getTime());
}

// Get all analyses with pagination
export async function getAllAnalyses(limit?: number, offset?: number): Promise<{
  analyses: AgentAnalysis[];
  total: number;
  hasMore: boolean;
}> {
  const storage = await readStorage();
  const allAnalyses = Object.values(storage.analyses).sort(
    (a, b) => new Date(b.timeline.completedAt).getTime() - new Date(a.timeline.completedAt).getTime()
  );
  
  const total = allAnalyses.length;
  const startIndex = offset || 0;
  const endIndex = limit ? startIndex + limit : allAnalyses.length;
  const analyses = allAnalyses.slice(startIndex, endIndex);
  const hasMore = endIndex < total;
  
  return { analyses, total, hasMore };
}

// Get analyses by discussion ID
export async function getAnalysesByDiscussionId(discussionId: string): Promise<AgentAnalysis[]> {
  const storage = await readStorage();
  
  return Object.values(storage.analyses)
    .filter(analysis => analysis.request.discussionId === discussionId)
    .sort((a, b) => new Date(b.timeline.completedAt).getTime() - new Date(a.timeline.completedAt).getTime());
}

// Get analyses by comment ID
export async function getAnalysesByCommentId(commentId: string): Promise<AgentAnalysis[]> {
  const storage = await readStorage();
  
  return Object.values(storage.analyses)
    .filter(analysis => analysis.request.commentId === commentId)
    .sort((a, b) => new Date(b.timeline.completedAt).getTime() - new Date(a.timeline.completedAt).getTime());
}

// Update analysis status (for pending/failed analyses)
export async function updateAnalysisStatus(
  id: string, 
  status: 'pending' | 'completed' | 'failed', 
  errorInfo?: string
): Promise<void> {
  const storage = await readStorage();
  
  if (storage.analyses[id]) {
    storage.analyses[id].metadata.status = status;
    if (errorInfo) {
      storage.analyses[id].metadata.errorInfo = errorInfo;
    }
    storage.metadata.lastUpdated = new Date().toISOString();
    await writeStorage(storage);
  }
}

// Get analysis by ID
export async function getAnalysisById(id: string): Promise<AgentAnalysis | null> {
  const storage = await readStorage();
  return storage.analyses[id] || null;
}

// Delete analysis by ID
export async function deleteAnalysis(id: string): Promise<boolean> {
  const storage = await readStorage();
  
  if (storage.analyses[id]) {
    // Subtract cost from total
    storage.metadata.totalCost -= storage.analyses[id].usage.cost.amount;
    
    delete storage.analyses[id];
    storage.metadata.totalAnalyses = Object.keys(storage.analyses).length;
    storage.metadata.lastUpdated = new Date().toISOString();
    
    await writeStorage(storage);
    return true;
  }
  
  return false;
}

// Get storage metadata
export async function getStorageMetadata(): Promise<AnalysisStorage['metadata']> {
  const storage = await readStorage();
  return storage.metadata;
}

// Get analyses with filtering
export async function getFilteredAnalyses(filters: {
  elementType?: 'term' | 'principle' | 'rule';
  agentType?: 'personal' | 'system';
  branchId?: string;
  userId?: string;
  status?: 'pending' | 'completed' | 'failed';
  fromDate?: string;
  toDate?: string;
  limit?: number;
  offset?: number;
}): Promise<{
  analyses: AgentAnalysis[];
  total: number;
  hasMore: boolean;
}> {
  const storage = await readStorage();
  let filteredAnalyses = Object.values(storage.analyses);
  
  // Apply filters
  if (filters.elementType) {
    filteredAnalyses = filteredAnalyses.filter(a => a.target.elementType === filters.elementType);
  }
  
  if (filters.agentType) {
    filteredAnalyses = filteredAnalyses.filter(a => a.request.agentType === filters.agentType);
  }
  
  if (filters.branchId) {
    filteredAnalyses = filteredAnalyses.filter(a => a.target.branchId === filters.branchId);
  }
  
  if (filters.userId) {
    filteredAnalyses = filteredAnalyses.filter(a => a.requestedBy.userId === filters.userId);
  }
  
  if (filters.status) {
    filteredAnalyses = filteredAnalyses.filter(a => a.metadata.status === filters.status);
  }
  
  if (filters.fromDate) {
    const fromTime = new Date(filters.fromDate).getTime();
    filteredAnalyses = filteredAnalyses.filter(a => new Date(a.timeline.requestedAt).getTime() >= fromTime);
  }
  
  if (filters.toDate) {
    const toTime = new Date(filters.toDate).getTime();
    filteredAnalyses = filteredAnalyses.filter(a => new Date(a.timeline.requestedAt).getTime() <= toTime);
  }
  
  // Sort by completion time (newest first)
  filteredAnalyses.sort((a, b) => new Date(b.timeline.completedAt).getTime() - new Date(a.timeline.completedAt).getTime());
  
  // Apply pagination
  const total = filteredAnalyses.length;
  const startIndex = filters.offset || 0;
  const endIndex = filters.limit ? startIndex + filters.limit : filteredAnalyses.length;
  const analyses = filteredAnalyses.slice(startIndex, endIndex);
  const hasMore = endIndex < total;
  
  return { analyses, total, hasMore };
}

// Export/import functions for backup
export async function exportAnalyses(): Promise<AnalysisStorage> {
  return await readStorage();
}

export async function importAnalyses(data: AnalysisStorage): Promise<void> {
  await writeStorage(data);
}

// Statistics functions
export async function getAnalysisStats(): Promise<{
  totalAnalyses: number;
  totalCost: number;
  analysesByType: Record<string, number>;
  analysesByAgent: Record<string, number>;
  analysesByBranch: Record<string, number>;
  costByModel: Record<string, number>;
  averageConfidence: number;
}> {
  const storage = await readStorage();
  const analyses = Object.values(storage.analyses);
  
  const stats = {
    totalAnalyses: analyses.length,
    totalCost: storage.metadata.totalCost,
    analysesByType: {} as Record<string, number>,
    analysesByAgent: {} as Record<string, number>,
    analysesByBranch: {} as Record<string, number>,
    costByModel: {} as Record<string, number>,
    averageConfidence: 0
  };
  
  let totalConfidence = 0;
  
  for (const analysis of analyses) {
    // Count by element type
    stats.analysesByType[analysis.target.elementType] = (stats.analysesByType[analysis.target.elementType] || 0) + 1;
    
    // Count by agent type
    stats.analysesByAgent[analysis.request.agentType] = (stats.analysesByAgent[analysis.request.agentType] || 0) + 1;
    
    // Count by branch
    stats.analysesByBranch[analysis.target.branchName] = (stats.analysesByBranch[analysis.target.branchName] || 0) + 1;
    
    // Cost by model
    stats.costByModel[analysis.execution.modelVersion] = (stats.costByModel[analysis.execution.modelVersion] || 0) + analysis.usage.cost.amount;
    
    // Sum confidence
    totalConfidence += analysis.result.confidence;
  }
  
  stats.averageConfidence = analyses.length > 0 ? totalConfidence / analyses.length : 0;
  
  return stats;
}