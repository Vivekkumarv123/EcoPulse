const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, fileList);
    } else {
      fileList.push(full);
    }
  }
  return fileList;
}

function stripIntegrityFromHtml(file) {
  let s = fs.readFileSync(file, 'utf8');
  const before = s;
  // remove integrity="sha384-..." or integrity='sha384-...'
  s = s.replace(/\sintegrity=("|')sha384-[^"']+\1/g, '');
  // remove any remaining integrity attributes (defensive)
  s = s.replace(/\sintegrity=("|')[^"']+\1/g, '');
  if (s !== before) {
    fs.writeFileSync(file, s, 'utf8');
    console.log('Stripped integrity from', file);
  }
}

function main() {
  const serverDir = path.resolve('.next', 'server');
  if (!fs.existsSync(serverDir)) {
    console.warn('.next/server not found; nothing to strip');
    return;
  }
  const all = walk(serverDir);
  const htmlFiles = all.filter(f => f.endsWith('.html'));
  for (const f of htmlFiles) stripIntegrityFromHtml(f);

  const manifest = path.join(serverDir, 'subresource-integrity-manifest.json');
  if (fs.existsSync(manifest)) {
    try {
      // Preserve the manifest file to avoid build systems (e.g. Vercel)
      // failing when they lstat the file. Replace contents with an
      // empty object as a safe fallback.
      fs.writeFileSync(manifest, '{}', 'utf8');
      console.log('Reset', manifest);
    } catch (err) {
      console.warn('Failed to reset manifest:', err.message);
    }
  }
}

main();
