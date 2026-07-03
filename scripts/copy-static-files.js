#!/usr/bin/env node

/**
 * Post-build script for Hostinger GitHub integration
 * Copies static files from 'out' folder to root for Hostinger to serve
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const rootDir = path.join(__dirname, '..');

// Check if out directory exists
if (!fs.existsSync(outDir)) {
  console.error('Error: out directory not found. Run "npm run build" first.');
  process.exit(1);
}

console.log('Copying static files from out/ to root for Hostinger deployment...');

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Skip .next directory as it's already in out/_next
      if (entry.name === '.next') {
        continue;
      }
      copyDir(srcPath, destPath);
    } else {
      // Skip certain files that shouldn't be copied
      if (entry.name === '.git' || entry.name === 'node_modules') {
        continue;
      }
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${entry.name}`);
    }
  }
}

// Copy all files from out to root
try {
  const entries = fs.readdirSync(outDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(outDir, entry.name);
    const destPath = path.join(rootDir, entry.name);

    // Skip copying if it's a directory that already exists and shouldn't be overwritten
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'src' || entry.name === 'public') {
        continue;
      }
      if (fs.existsSync(destPath)) {
        // Remove existing directory and copy fresh
        fs.rmSync(destPath, { recursive: true, force: true });
      }
      copyDir(srcPath, destPath);
      console.log(`Copied directory: ${entry.name}/`);
    } else {
      // For files, copy directly
      if (entry.name === '.gitignore' || entry.name === 'package.json' || entry.name === 'package-lock.json') {
        continue; // Don't overwrite these files
      }
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied file: ${entry.name}`);
    }
  }

  console.log('\n✅ Static files copied successfully!');
  console.log('Hostinger will now serve these files as static content.');
} catch (error) {
  console.error('Error copying files:', error);
  process.exit(1);
}

