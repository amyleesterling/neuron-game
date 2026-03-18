// Copy static web assets to www/ for Capacitor.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const www = path.join(root, 'www');

const ROOT_FILE_EXTENSIONS = new Set([
  '.html',
  '.css',
  '.js',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.ico',
]);

function resetDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyFile(srcPath, destPath) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  return 1;
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    return 0;
  }

  let copied = 0;
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copied += copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      copied += copyFile(srcPath, destPath);
    }
  }
  return copied;
}

resetDir(www);

let copied = 0;
for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (!entry.isFile()) {
    continue;
  }

  const ext = path.extname(entry.name).toLowerCase();
  if (!ROOT_FILE_EXTENSIONS.has(ext)) {
    continue;
  }

  copied += copyFile(path.join(root, entry.name), path.join(www, entry.name));
}

copied += copyDir(path.join(root, 'assets'), path.join(www, 'assets'));
copied += copyDir(path.join(root, 'js'), path.join(www, 'js'));

console.log(`Copied ${copied} files to www/`);