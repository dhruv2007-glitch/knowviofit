// scripts/postbuild.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { glob } from 'glob';

async function fixImports() {
  const files = await glob('dist/**/*.js');
  
  for (const file of files) {
    let content = readFileSync(file, 'utf8');
    // Updated regex to target only relative paths
    content = content.replace(
      /from\s+['"](\.{1,2}\/[\w-/]+)(?<!\.js)['"]/g,
      'from "$1.js"'
    );
    writeFileSync(file, content);
  }
}

fixImports().catch(console.error);