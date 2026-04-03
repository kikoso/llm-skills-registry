import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const SKILLS_DIR = path.join(process.cwd(), 'skills');
const OUTPUT_FILE = path.join(process.cwd(), 'src/registry.json');

// Canonical Tag Allowlist
const ALLOWED_TAGS = new Set([
  'ai', 'android', 'api', 'architecture', 'automation', 
  'cloud', 'compose', 'data', 'design', 'devops', 
  'devtools', 'google-maps', 'mcp', 'mobile', 'networking', 'office', 
  'python', 'security', 'testing', 'ui', 'web'
]);

// Tag Mapping: niche -> canonical
const TAG_MAP = {
  '3d': 'google-maps',
  'clean-architecture': 'architecture',
  'mvvm': 'architecture',
  'art': 'design',
  'generative': 'ai',
  'graphics': 'design',
  'bot': 'ai',
  'chat': 'ai',
  'live': 'ai',
  'real-time': 'ai',
  'structured-output': 'ai',
  'cloudflare': 'networking',
  'dns': 'networking',
  'docx': 'office',
  'excel': 'office',
  'pptx': 'office',
  'pdf': 'office',
  'word': 'office',
  'xlsx': 'office',
  'figma': 'design',
  'frontend': 'web',
  'react': 'web',
  'github': 'devops',
  'gitlab': 'devops',
  'jira': 'devops',
  'pagerduty': 'devops',
  'incidents': 'devops',
  'gradle': 'devtools',
  'tooling': 'devtools',
  'creation': 'devtools',
  'meta': 'devtools',
  'registry': 'devtools',
  'discovery': 'devtools',
  'code-review': 'devtools',
  'migration': 'android',
  'xml': 'android',
  'ml': 'ai',
  'deep-learning': 'ai',
  'pytorch': 'ai',
  'retrofit': 'networking',
  'stripe': 'api',
  'payments': 'api',
  'twilio': 'api',
  'communications': 'api',
  'vertex-ai': 'ai',
  'google-cloud': 'cloud'
};

async function generate() {
  const files = await glob('*.json', { cwd: SKILLS_DIR });
  const registry = files.map(file => {
    const filePath = path.join(SKILLS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const skill = JSON.parse(content);
    
    if (skill.tags) {
      let mappedTags = skill.tags.map(t => {
        const cleanTag = t.toLowerCase().trim();
        return TAG_MAP[cleanTag] || cleanTag;
      });

      // Filter only allowed tags, deduplicate, and limit to 3
      skill.tags = [...new Set(mappedTags)]
        .filter(t => ALLOWED_TAGS.has(t))
        .sort()
        .slice(0, 3);
    }
    
    return skill;
  });

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
  
  // Final verification log
  const allTags = new Set();
  registry.forEach(s => s.tags.forEach(t => allTags.add(t)));
  console.log(`Generated registry with ${registry.length} skills.`);
  console.log(`Canonical tags in use: ${allTags.size} (${Array.from(allTags).join(', ')})`);
}

generate();
