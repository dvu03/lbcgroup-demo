const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'brief_dump.json'), 'utf-8'));

function dumpSheet(name) {
  console.log(`\n================== SHEET: ${name} ==================`);
  if (!data[name]) return;
  data[name].forEach((row, i) => {
    if (row.length > 0 && row.some(c => c !== null && c !== '')) {
      console.log(`[R${i}]`, row.filter(c => c !== null && c !== '').join(' | '));
    }
  });
}

dumpSheet('1. Sitemap & Menu');
dumpSheet('5. ND Dịch vụ');
