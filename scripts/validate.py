#!/usr/bin/env python3
"""
DAHAO Structure Validator
Validates YAML files against schemas and checks repository structure
"""

import os
import sys
import yaml
import json
from pathlib import Path
from typing import Dict, List, Tuple

class DAHAOValidator:
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.errors = []
        self.warnings = []
        
    def validate(self) -> bool:
        """Run all validation checks"""
        print("🔍 Validating DAHAO structure...")
        
        # Check required directories
        self._check_directories()
        
        # Validate YAML syntax
        self._validate_yaml_files()
        
        # Check required files
        self._check_required_files()
        
        # Validate configuration
        self._validate_config()
        
        # Report results
        self._report_results()
        
        return len(self.errors) == 0
    
    def _check_directories(self):
        """Check that required directories exist"""
        required_dirs = [
            '.dahao',
            'constitution',
            'terms',
            'governance',
            'tokens'
        ]
        
        for dir_name in required_dirs:
            dir_path = self.repo_path / dir_name
            if not dir_path.exists():
                self.errors.append(f"Missing required directory: {dir_name}")
            elif not dir_path.is_dir():
                self.errors.append(f"{dir_name} exists but is not a directory")
    
    def _validate_yaml_files(self):
        """Validate all YAML files can be parsed"""
        yaml_files = list(self.repo_path.rglob("*.yaml")) + list(self.repo_path.rglob("*.yml"))
        
        for yaml_file in yaml_files:
            try:
                with open(yaml_file, 'r') as f:
                    yaml.safe_load(f)
            except yaml.YAMLError as e:
                self.errors.append(f"Invalid YAML in {yaml_file.relative_to(self.repo_path)}: {e}")
            except Exception as e:
                self.errors.append(f"Error reading {yaml_file.relative_to(self.repo_path)}: {e}")
    
    def _check_required_files(self):
        """Check that required files exist"""
        required_files = [
            '.dahao/config.yaml',
            '.dahao/version',
            'constitution/manifest.yaml',
            'tokens/economics.yaml'
        ]
        
        for file_path in required_files:
            full_path = self.repo_path / file_path
            if not full_path.exists():
                self.errors.append(f"Missing required file: {file_path}")
    
    def _validate_config(self):
        """Validate .dahao/config.yaml structure"""
        config_path = self.repo_path / '.dahao/config.yaml'
        
        if not config_path.exists():
            return
        
        try:
            with open(config_path, 'r') as f:
                config = yaml.safe_load(f)
            
            # Check required fields
            if 'dahao' not in config:
                self.errors.append("config.yaml missing 'dahao' section")
            elif 'version' not in config['dahao']:
                self.errors.append("config.yaml missing 'dahao.version'")
            
            if 'organization' not in config:
                self.errors.append("config.yaml missing 'organization' section")
            elif 'name' not in config['organization']:
                self.errors.append("config.yaml missing 'organization.name'")
                
        except Exception as e:
            self.errors.append(f"Error validating config.yaml: {e}")
    
    def _report_results(self):
        """Report validation results"""
        if self.errors:
            print("\n❌ Validation failed with errors:")
            for error in self.errors:
                print(f"  - {error}")
        else:
            print("\n✅ All validation checks passed!")
        
        if self.warnings:
            print("\n⚠️  Warnings:")
            for warning in self.warnings:
                print(f"  - {warning}")

def main():
    # Determine repository path
    if len(sys.argv) > 1:
        repo_path = sys.argv[1]
    else:
        repo_path = os.getcwd()
    
    # Check if we're in dahao-template subdirectory
    if os.path.basename(repo_path) != 'dahao-template' and os.path.exists(os.path.join(repo_path, 'dahao-template')):
        repo_path = os.path.join(repo_path, 'dahao-template')
    
    validator = DAHAOValidator(repo_path)
    success = validator.validate()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()