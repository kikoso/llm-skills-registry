import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const SKILLS_DIR = path.join(process.cwd(), 'skills');
const OUTPUT_FILE = path.join(process.cwd(), 'src/registry.json');

async function generate() {
  const files = await glob('*.json', { cwd: SKILLS_DIR });
  const registry = files.map(file => {
    const filePath = path.join(SKILLS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const skill = JSON.parse(content);
    
    // Normalize tags during generation for extra safety
    if (skill.tags) {
      skill.tags = [...new Set(skill.tags.map(t => t.toLowerCase().trim()))]
        .sort()
        .slice(0, 5);
    }
    
    return skill;
  });

  // Sort registry by category, then by name
  registry.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });

  if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));
  console.log(`Generated registry with ${registry.length} skills across categories.`);
}

generate();
