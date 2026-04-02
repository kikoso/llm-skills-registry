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
    return JSON.parse(content);
  });

  if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));
  console.log(`Generated registry with ${registry.length} skills.`);
}

generate();
