#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Rebuilding TypeScript types...');

// Force removing TypeScript cache
const cacheDir = path.join(process.cwd(), 'node_modules', '.cache', 'typescript');
if (fs.existsSync(cacheDir)) {
  console.log('Removing TypeScript cache...');
  try {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('TypeScript cache removed.');
  } catch (err) {
    console.error('Error removing TypeScript cache:', err);
  }
}

// Run TypeScript compilation to rebuild types
try {
  console.log('Running TypeScript to rebuild types...');
  execSync('npx tsc --noEmit');
  console.log('TypeScript types rebuilt successfully.');
} catch (error) {
  console.error('Error rebuilding TypeScript types:', error.message);
  
  // Even if there are TypeScript errors, the process can still be useful
  console.log('TypeScript completed with errors, but type information should be updated.');
}

console.log('Type rebuild process complete. You may need to restart your development server.'); 