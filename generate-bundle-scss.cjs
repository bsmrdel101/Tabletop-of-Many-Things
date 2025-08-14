const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve('src/styles');
const OUTPUT_FILE = path.resolve('src/styles/bundle.scss');

function getScssFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(getScssFiles(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.scss') &&
      !entry.name.startsWith('bundle') &&
      entry.name !== 'index.scss'
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalize(filePath) {
  const relative = path.relative(path.dirname(OUTPUT_FILE), filePath).replace(/\\/g, '/');
  const noUnderscore = relative.replace(/^_/, '').replace(/\.scss$/, '');
  return `@use '${noUnderscore}';`;
}

function generateBundle() {
  const scssFiles = getScssFiles(ROOT_DIR);
  const newImports = new Set(scssFiles.map(normalize));

  let currentLines = [];
  if (fs.existsSync(OUTPUT_FILE)) {
    currentLines = fs.readFileSync(OUTPUT_FILE, 'utf8')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
  }

  const currentImports = new Set(currentLines);

  const toAdd = [...newImports].filter(line => !currentImports.has(line));
  const toRemove = [...currentImports].filter(line => !newImports.has(line));

  if (toAdd.length === 0 && toRemove.length === 0) {
    console.log('No changes needed.');
    return;
  }

  const updatedLines = currentLines
    .filter(line => !toRemove.includes(line))
    .concat(toAdd);

  fs.writeFileSync(OUTPUT_FILE, updatedLines.join('\n') + '\n');
  console.log('bundle.scss updated.');
}

generateBundle();
