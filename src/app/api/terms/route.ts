import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { TermDictionary } from '@/types/governance';

async function loadTermsForDomain(domain: string): Promise<TermDictionary | null> {
  const termsPath = path.join(process.cwd(), 'dahao-governance', domain, 'terms');

  if (!fs.existsSync(termsPath)) {
    return null;
  }

  // Load all term files
  const termFiles = fs.readdirSync(termsPath, { recursive: true })
    .filter(file => file.toString().endsWith('.yml'));

  const terms: TermDictionary = {
    version: "1.0",
    namespace: domain,
    terms: {}
  };

  for (const file of termFiles) {
    try {
      const content = fs.readFileSync(path.join(termsPath, file.toString()), 'utf8');
      const termData = yaml.load(content) as TermDictionary;

      // Merge terms
      Object.assign(terms.terms, termData.terms);
    } catch (error) {
      console.error(`Error loading term file ${file} for ${domain}:`, error);
    }
  }

  return terms;
}

export async function GET() {
  try {
    const allTerms: Record<string, any> = {};
    
    // Load terms from each organization
    const domains = ['core-governance', 'animal-welfare', 'environment'];
    
    for (const domain of domains) {
      const terms = await loadTermsForDomain(domain);
      if (terms) {
        allTerms[domain] = terms;
      }
    }

    return NextResponse.json(allTerms);
  } catch (error) {
    console.error('Error loading terms:', error);
    return NextResponse.json({ error: 'Failed to load terms' }, { status: 500 });
  }
}