import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const SKILLS_DIR = path.join(process.cwd(), 'skills');

async function lint() {
  const files = await glob('*.json', { cwd: SKILLS_DIR });
  let errors = 0;

  files.forEach(file => {
    const filePath = path.join(SKILLS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const skill = JSON.parse(content);

    // Basic validation logic (similar to schema)
    if (!skill.category) {
      console.error(`Error: ${file} is missing 'category'.`);
      errors++;
    }
    if (skill.tags && skill.tags.length > 5) {
      console.error(`Error: ${file} has more than 5 tags.`);
      errors++;
    }
    if (skill.tags && skill.tags.some(t => t !== t.toLowerCase())) {
      console.error(`Error: ${file} has non-lowercase tags.`);
      errors++;
    }
  });

  if (errors > 0) {
    console.error(`\nLinting failed with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log('All skills passed linting.');
  }
}

lint();
