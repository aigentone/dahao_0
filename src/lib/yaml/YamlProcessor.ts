import yaml from 'js-yaml';
import { DAHAOFile, DAHAOEntry } from '@/types';

export class YamlProcessor {
  static parse(content: string): DAHAOFile {
    try {
      const data = yaml.load(content) as DAHAOFile;
      return data;
    } catch (error) {
      throw new Error(`Failed to parse YAML: ${error}`);
    }
  }

  static stringify(data: DAHAOFile): string {
    try {
      return yaml.dump(data, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        sortKeys: false,
      });
    } catch (error) {
      throw new Error(`Failed to stringify YAML: ${error}`);
    }
  }

  static validateStructure(data: any): boolean {
    if (!data || typeof data !== 'object') return false;
    if (!data.version || typeof data.version !== 'string') return false;
    if (!data.metadata || typeof data.metadata !== 'object') return false;
    if (!Array.isArray(data.entries)) return false;
    
    return true;
  }

  static mergeEntries(existing: DAHAOEntry[], incoming: DAHAOEntry[]): DAHAOEntry[] {
    const entryMap = new Map<string, DAHAOEntry>();
    
    // Add existing entries
    existing.forEach(entry => {
      entryMap.set(entry.id, entry);
    });
    
    // Merge or add incoming entries
    incoming.forEach(entry => {
      if (entryMap.has(entry.id)) {
        // Merge logic - newer timestamp wins
        const existingEntry = entryMap.get(entry.id)!;
        if (new Date(entry.timestamp) > new Date(existingEntry.timestamp)) {
          entryMap.set(entry.id, entry);
        }
      } else {
        entryMap.set(entry.id, entry);
      }
    });
    
    // Sort by timestamp
    return Array.from(entryMap.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
}