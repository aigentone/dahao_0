// GitHub API service for fetching governance files
import yaml from 'js-yaml';

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'file' | 'dir';
}

export interface GitHubContent {
  content: string;
  encoding: string;
}

export interface YamlDocument {
  version?: string;
  name?: string;
  title?: string;
  description?: string;
  statement?: string;
  rationale?: string;
  requirements?: string[];
  exceptions?: string[];
  examples?: string[];
  uses_terms?: string[];
  [key: string]: any;
}

export interface GovernanceFileData {
  path: string;
  name: string;
  category: 'meta-rules' | 'principles' | 'rules' | 'terms';
  content: YamlDocument;
  raw: string;
}

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'dahao-org';
const REPO_NAME = 'core';
const CACHE_KEY = 'dahao-governance-cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface CacheData {
  timestamp: number;
  data: GovernanceFileData[];
}

export class GitHubService {
  private static async fetchFromGitHub(path: string): Promise<any> {
    try {
      console.log(`Fetching from GitHub: ${path}`);
      const response = await fetch(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Add GitHub token if available (for higher rate limits)
          ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
            'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
          })
        }
      });

      console.log(`GitHub API Response: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`GitHub API error details: ${errorText}`);
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Failed to fetch from GitHub: ${error}`);
      throw error;
    }
  }

  private static async fetchFileContent(file: GitHubFile): Promise<string> {
    const response = await fetch(file.download_url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file content: ${response.status}`);
    }
    return response.text();
  }

  private static parseYamlContent(content: string): YamlDocument {
    try {
      // Pre-process YAML content to handle @term@version keys
      let processedContent = content;
      
      // Fix unquoted @term@version keys that cause YAML parsing errors
      processedContent = processedContent.replace(/^(@\w+@[\d.]+):/gm, '"$1":');
      
      // Try to parse with better error handling for multiline strings
      const parsed = yaml.load(processedContent, {
        onWarning: (warning) => console.warn('YAML warning:', warning),
      }) as any;
      
      // Handle different YAML structures
      if (parsed && typeof parsed === 'object') {
        // Check if it's a term definition (has @term@version pattern)
        const termKey = Object.keys(parsed).find(key => key.startsWith('@') && key.includes('@'));
        if (termKey) {
          const termContent = parsed[termKey];
          // Ensure multiline strings are properly handled
          if (termContent.definition && typeof termContent.definition === 'string') {
            termContent.definition = termContent.definition.trim();
          }
          return {
            ...termContent,
            _termKey: termKey
          };
        }
        // Check if it's wrapped in a single key (like transparency principle)
        const keys = Object.keys(parsed);
        if (keys.length === 1 && typeof parsed[keys[0]] === 'object') {
          return {
            ...parsed[keys[0]],
            _wrapperKey: keys[0]
          };
        }
        return parsed;
      }
      return { content: content };
    } catch (error) {
      console.error('YAML parsing error for content:', content.substring(0, 300));
      console.error('Error details:', error);
      
      // Fallback: try to extract basic info from the raw content
      try {
        const lines = content.split('\n');
        const termKeyLine = lines.find(line => line.match(/@\w+@[\d.]+:/));
        if (termKeyLine) {
          const match = termKeyLine.match(/@(\w+)@([\d.]+):/);
          if (match) {
            const termName = match[1];
            const version = match[2];
            const termKey = `@${termName}@${version}`;
            
            // Extract definition manually
            const defStart = content.indexOf('definition: |');
            let definition = '';
            if (defStart > -1) {
              const defContent = content.substring(defStart + 13);
              const nextKey = defContent.search(/\n\s+\w+:/);
              definition = nextKey > -1 ? defContent.substring(0, nextKey).trim() : defContent.trim();
            }
            
            return {
              definition: definition,
              _termKey: termKey,
              _parseError: true,
              raw: content
            };
          }
        }
      } catch (fallbackError) {
        console.error('Fallback parsing also failed:', fallbackError);
      }
      
      return { 
        error: 'Failed to parse YAML',
        raw: content 
      };
    }
  }

  private static getCategoryFromPath(path: string): GovernanceFileData['category'] {
    if (path.includes('meta-rules')) return 'meta-rules';
    if (path.includes('principles')) return 'principles';
    if (path.includes('rules')) return 'rules';
    if (path.includes('terms')) return 'terms';
    throw new Error(`Unknown category for path: ${path}`);
  }

  private static getCache(): CacheData | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      
      const data = JSON.parse(cached) as CacheData;
      const now = Date.now();
      
      if (now - data.timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Cache error:', error);
      return null;
    }
  }

  private static setCache(data: GovernanceFileData[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      const cacheData: CacheData = {
        timestamp: Date.now(),
        data
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Failed to set cache:', error);
    }
  }

  static async fetchGovernanceFiles(): Promise<GovernanceFileData[]> {
    console.log('fetchGovernanceFiles called');
    
    // Check cache first
    const cached = this.getCache();
    if (cached) {
      console.log('Returning cached data:', cached.data.length, 'files');
      return cached.data;
    }

    const categories = ['meta-rules', 'principles', 'rules', 'terms'];
    const allFiles: GovernanceFileData[] = [];

    for (const category of categories) {
      try {
        console.log(`Fetching category: ${category}`);
        const files = await this.fetchFromGitHub(category);
        
        if (!Array.isArray(files)) {
          console.error(`Expected array for ${category}, got:`, files);
          continue;
        }

        console.log(`Found ${files.length} files in ${category}`);

        // Process each YAML file
        for (const file of files) {
          if (file.type === 'file' && file.name.endsWith('.yaml')) {
            try {
              console.log(`Processing file: ${file.name}`);
              const content = await this.fetchFileContent(file);
              const parsed = this.parseYamlContent(content);
              
              allFiles.push({
                path: file.path,
                name: file.name.replace('.yaml', ''),
                category: this.getCategoryFromPath(file.path),
                content: parsed,
                raw: content
              });
              console.log(`Successfully processed: ${file.name}`);
            } catch (error) {
              console.error(`Failed to process file ${file.name}:`, error);
            }
          }
        }
      } catch (error) {
        console.error(`Failed to fetch ${category}:`, error);
      }
    }

    console.log(`Total files processed: ${allFiles.length}`);
    
    // Cache the results
    this.setCache(allFiles);
    
    return allFiles;
  }

  static async fetchSingleFile(path: string): Promise<GovernanceFileData | null> {
    try {
      const file = await this.fetchFromGitHub(path);
      
      if (file.type !== 'file') {
        throw new Error('Path does not point to a file');
      }

      const content = await this.fetchFileContent(file);
      const parsed = this.parseYamlContent(content);

      return {
        path: file.path,
        name: file.name.replace('.yaml', ''),
        category: this.getCategoryFromPath(file.path),
        content: parsed,
        raw: content
      };
    } catch (error) {
      console.error(`Failed to fetch file ${path}:`, error);
      return null;
    }
  }

  static clearCache(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CACHE_KEY);
    }
  }
}

// Export convenience functions
export const fetchGovernanceFiles = () => GitHubService.fetchGovernanceFiles();
export const fetchSingleFile = (path: string) => GitHubService.fetchSingleFile(path);
export const clearGovernanceCache = () => GitHubService.clearCache();