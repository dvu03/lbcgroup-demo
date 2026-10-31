const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = getFiles('src');
console.log('Total files in src:', files.length);

const lucideImports = new Set();
// Match single line or multiline imports
const iconRegex = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = iconRegex.exec(content)) !== null) {
    const names = match[1]
      .replace(/\/\/[^\n]*/g, '')
      .split(',')
      .map(s => s.trim().split(/\s+as\s+/)[0].trim())
      .filter(Boolean);
    names.forEach(n => {
      if (n && /^[A-Z][A-Za-z0-9]*$/.test(n)) {
        lucideImports.add(n);
      }
    });
  }
});

// Also check for dynamic icon strings in data files:
// e.g. iconName: "Stethoscope", icon: "Award", etc.
const dynamicIconRegex = /(?:iconName|iconCode|icon)\s*:\s*['"]([A-Z][A-Za-z0-9]*)['"]/g;
const dynamicIcons = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = dynamicIconRegex.exec(content)) !== null) {
    dynamicIcons.add(match[1]);
  }
});

console.log('Lucide static imports:', lucideImports.size);
console.log('Dynamic icon references:', dynamicIcons.size);
dynamicIcons.forEach(n => lucideImports.add(n));

console.log('Total unique Lucide icons:', lucideImports.size);
console.log(Array.from(lucideImports).sort().join(', '));

// Also let's search for inline <svg> elements in src files
let inlineSvgCount = 0;
const inlineSvgs = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const svgMatches = content.match(/<svg[^>]*>[\s\S]*?<\/svg>/g);
  if (svgMatches) {
    inlineSvgCount += svgMatches.length;
    inlineSvgs.push({ file: f, count: svgMatches.length });
  }
});
console.log('Total inline <svg> elements found:', inlineSvgCount);
inlineSvgs.forEach(s => console.log(`  - ${s.file}: ${s.count} SVGs`));
