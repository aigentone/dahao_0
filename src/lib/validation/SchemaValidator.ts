import Ajv from 'ajv';
import { ValidationResult, ValidationError } from '@/types';

const dahaoSchema = {
  type: 'object',
  properties: {
    version: { type: 'string', pattern: '^\\d+\\.\\d+\\.\\d+$' },
    metadata: {
      type: 'object',
      properties: {
        created: { type: 'string', format: 'date-time' },
        lastModified: { type: 'string', format: 'date-time' },
        author: { type: 'string' }
      },
      required: ['created', 'lastModified', 'author']
    },
    entries: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
          title: { type: 'string' },
          description: { type: 'string' },
          participants: {
            type: 'array',
            items: { type: 'string' }
          },
          tags: {
            type: 'array',
            items: { type: 'string' }
          },
          relatedEntries: {
            type: 'array',
            items: { type: 'string' }
          },
          customData: { type: 'object' }
        },
        required: ['id', 'timestamp', 'title', 'description', 'participants', 'tags']
      }
    }
  },
  required: ['version', 'metadata', 'entries']
};

export class SchemaValidator {
  private ajv: Ajv;
  private validate: any;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    this.validate = this.ajv.compile(dahaoSchema);
  }

  validateDAHAOFile(data: any): ValidationResult {
    const valid = this.validate(data);
    
    if (valid) {
      return { valid: true };
    }
    
    const errors: ValidationError[] = this.validate.errors.map((error: any) => ({
      path: error.instancePath || '/',
      message: error.message || 'Unknown error',
      code: error.keyword
    }));
    
    return { valid: false, errors };
  }

  validateEntry(entry: any): ValidationResult {
    const entrySchema = dahaoSchema.properties.entries.items;
    const validateEntry = this.ajv.compile(entrySchema);
    const valid = validateEntry(entry);
    
    if (valid) {
      return { valid: true };
    }
    
    const errors: ValidationError[] = validateEntry.errors.map((error: any) => ({
      path: error.instancePath || '/',
      message: error.message || 'Unknown error',
      code: error.keyword
    }));
    
    return { valid: false, errors };
  }
}