#!/usr/bin/env python3
"""Validate all SKILL.md files in the skills directory."""

import os
import yaml
from pathlib import Path

def validate_skill(skill_path: Path) -> bool:
    """Validate a single skill."""
    skill_md = skill_path / "SKILL.md"
    
    if not skill_md.exists():
        print(f"❌ {skill_path.name}: Missing SKILL.md")
        return False
    
    try:
        with open(skill_md, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check for YAML frontmatter
        if not content.startswith('---'):
            print(f"❌ {skill_path.name}: Missing YAML frontmatter")
            return False
        
        # Parse frontmatter
        parts = content.split('---', 2)
        if len(parts) < 3:
            print(f"❌ {skill_path.name}: Invalid frontmatter")
            return False
        
        frontmatter = yaml.safe_load(parts[1])
        
        # Check required fields
        required_fields = ['name', 'description']
        for field in required_fields:
            if field not in frontmatter:
                print(f"❌ {skill_path.name}: Missing '{field}' in frontmatter")
                return False
        
        print(f"✅ {skill_path.name}: Valid")
        return True
    
    except Exception as e:
        print(f"❌ {skill_path.name}: Error - {e}")
        return False

def main():
    skills_dir = Path(__file__).parent.parent / "skills"
    
    if not skills_dir.exists():
        print("❌ skills/ directory not found")
        exit(1)
    
    valid_count = 0
    total_count = 0
    
    for skill_path in skills_dir.iterdir():
        if skill_path.is_dir():
            total_count += 1
            if validate_skill(skill_path):
                valid_count += 1
    
    print(f"\n{'='*50}")
    print(f"Validation complete: {valid_count}/{total_count} skills valid")
    
    if valid_count == total_count:
        print("✅ All skills are valid!")
        exit(0)
    else:
        print(f"❌ {total_count - valid_count} skills have issues")
        exit(1)

if __name__ == "__main__":
    main()
