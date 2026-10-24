const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'brief_dump.json'), 'utf-8'));

function dumpSheet(name, limit = 25) {
  console.log(`\n================== SHEET: ${name} ==================`);
  if (!data[name]) {
    console.log('Sheet not found');
    return;
  }
  data[name].slice(0, limit).forEach((row, i) => {
    if (row.length > 0 && row.some(c => c !== null && c !== '')) {
      console.log(`[R${i}]`, row.filter(c => c !== null && c !== '').join(' | '));
    }
  });
}

dumpSheet('1. Sitemap & Menu', 20);
dumpSheet('5. ND Dịch vụ', 15);
dumpSheet('11. Hình ảnh & Icon', 20);
dumpSheet('12. Thông tin & Pháp lý', 20);
dumpSheet('13. Điểm cần xác nhận', 20);
