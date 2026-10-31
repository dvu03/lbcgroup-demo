const fs = require('fs');
const path = require('path');

// 1. Scan all src files to map usages
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const srcFiles = getFiles('src');
console.log(`Scanning ${srcFiles.length} source files...`);

// Mapping: PascalCase -> { usages: Set<string>, isFrontend: boolean, isAdmin: boolean }
const usageMap = new Map();

function trackUsage(iconName, filePath) {
  const rel = path.relative('.', filePath).replace(/\\/g, '/');
  if (!usageMap.has(iconName)) {
    usageMap.set(iconName, {
      files: new Set(),
      isFrontend: false,
      isAdmin: false
    });
  }
  const entry = usageMap.get(iconName);
  entry.files.add(rel);
  if (rel.includes('/admin/')) {
    entry.isAdmin = true;
  } else {
    entry.isFrontend = true;
  }
}

// Check imports and string mentions
const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g;
const dynamicRegex = /(?:iconName|iconCode|icon)\s*:\s*['"]([A-Z][A-Za-z0-9]*)['"]/g;
const jsxDynamicRegex = /<DynamicIcon[^>]*\bname=['"]([A-Z][A-Za-z0-9]*)['"]/g;

srcFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = importRegex.exec(content)) !== null) {
    const names = m[1].replace(/\/\/[^\n]*/g, '').split(',').map(s => s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean);
    names.forEach(n => {
      if (n && /^[A-Z][A-Za-z0-9]*$/.test(n)) trackUsage(n, f);
    });
  }
  while ((m = dynamicRegex.exec(content)) !== null) {
    trackUsage(m[1], f);
  }
  while ((m = jsxDynamicRegex.exec(content)) !== null) {
    trackUsage(m[1], f);
  }
});

// Also check Curated Icons in IconPickerModal
const iconPickerPath = 'src/components/admin/IconPickerModal.tsx';
if (fs.existsSync(iconPickerPath)) {
  const content = fs.readFileSync(iconPickerPath, 'utf8');
  const matches = content.match(/name:\s*['"]([A-Z][A-Za-z0-9]*)['"]/g);
  if (matches) {
    matches.forEach(m => {
      const name = m.replace(/name:\s*['"]/, '').replace(/['"]/, '');
      trackUsage(name, iconPickerPath);
    });
  }
}

console.log(`Tracked ${usageMap.size} icon names in source code.`);

// 2. Audit icons in icons/all
const allDir = 'icons/all';
const iconFiles = fs.readdirSync(allDir).filter(f => f.endsWith('.svg'));
console.log(`Found ${iconFiles.length} SVG files in ${allDir}`);

const auditedIcons = [];
const duplicatesGroup = [];

iconFiles.forEach(file => {
  const filePath = path.join(allDir, file);
  const rawSvg = fs.readFileSync(filePath, 'utf8');
  
  // Extract SVG characteristics
  const viewBoxMatch = rawSvg.match(/viewBox=["']([^"']+)["']/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : 'none';
  const isOutline = rawSvg.includes('stroke="currentColor"') || rawSvg.includes('fill="none"');
  const isMultiColor = rawSvg.includes('fill="#') || rawSvg.includes('stroke="#') || rawSvg.includes('fill-opacity');
  const pathCount = (rawSvg.match(/<path/g) || []).length;
  const circleCount = (rawSvg.match(/<circle/g) || []).length;
  const rectCount = (rawSvg.match(/<rect/g) || []).length;

  // Correlate with usage
  // Convert kebab-case to PascalCase (e.g. check-circle2 -> CheckCircle2)
  const baseName = file.replace('.svg', '');
  const pascalName = baseName.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  
  let usage = usageMap.get(pascalName);
  if (!usage) {
    // Try case-insensitive lookup
    for (const [k, v] of usageMap.entries()) {
      if (k.toLowerCase() === pascalName.toLowerCase() || k.toLowerCase() === baseName.toLowerCase().replace(/-/g, '')) {
        usage = v;
        break;
      }
    }
  }

  const filesUsed = usage ? Array.from(usage.files) : [];
  const isFrontend = usage ? usage.isFrontend : false;
  const isAdmin = usage ? usage.isAdmin : true; // Default admin if not explicit

  auditedIcons.push({
    file,
    baseName,
    pascalName,
    viewBox,
    isOutline,
    isMultiColor,
    complexity: pathCount + circleCount + rectCount,
    usageCount: filesUsed.length,
    filesUsed,
    scope: isFrontend && isAdmin ? 'Frontend & Admin' : isFrontend ? 'Frontend' : 'Admin CMS',
    rawSvg
  });
});

console.log(`Audited ${auditedIcons.length} SVG icons.`);

// 3. Detect duplicate pairs and similarity groups
const similarGroups = [
  { group: 'Check / Success', icons: ['check.svg', 'check-circle2.svg', 'file-check.svg'] },
  { group: 'Alert / Warning', icons: ['alert-circle.svg', 'alert-triangle.svg', 'shield-alert.svg'] },
  { group: 'Shield / Security', icons: ['shield.svg', 'shield-check.svg', 'shield-alert.svg'] },
  { group: 'Sun / Radiance', icons: ['sun.svg', 'sun-medium.svg'] },
  { group: 'Sparkle / Laser / Glow', icons: ['sparkle.svg', 'sparkles.svg'] },
  { group: 'Calendar / Booking', icons: ['calendar.svg', 'calendar-check.svg', 'calendar-check2.svg'] },
  { group: 'Arrows / Directions', icons: ['arrow-up.svg', 'chevron-up.svg', 'chevrons-up.svg', 'arrow-up-circle.svg', 'move-up.svg', 'arrow-right.svg', 'arrow-up-right.svg'] },
  { group: 'Phone / Contact', icons: ['phone.svg', 'phone-call.svg'] },
  { group: 'User / Identity', icons: ['user.svg', 'user-check.svg', 'user-plus.svg', 'users.svg'] },
  { group: 'Building / Organization', icons: ['building.svg', 'building2.svg'] },
  { group: 'Settings / Configuration', icons: ['settings.svg', 'settings2.svg'] },
  { group: 'Edit / Authoring', icons: ['edit.svg', 'edit3.svg'] },
  { group: 'Share / Social', icons: ['share.svg', 'share2.svg'] },
  { group: 'Visibility / Toggle', icons: ['eye.svg', 'eye-off.svg'] },
  { group: 'Droplet / Liquid', icons: ['droplet.svg', 'droplets.svg'] }
];

// Output summary
fs.writeFileSync('scripts/audit_results.json', JSON.stringify({
  totalIcons: auditedIcons.length,
  similarGroups,
  icons: auditedIcons.map(i => ({
    file: i.file,
    scope: i.scope,
    usageCount: i.usageCount,
    filesUsed: i.filesUsed,
    viewBox: i.viewBox,
    isOutline: i.isOutline,
    isMultiColor: i.isMultiColor
  }))
}, null, 2), 'utf8');

console.log('Saved audit_results.json successfully.');
