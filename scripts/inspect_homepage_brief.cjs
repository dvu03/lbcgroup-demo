const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'brief_dump.json'), 'utf-8'));

console.log('=== ROWS 0 TO 12 ===');
data['2. Bố cục Trang chủ'].slice(0, 13).forEach((row, i) => {
  if (row.length > 0 && row.some(cell => cell !== null && cell !== '')) {
    console.log(`[R${i}]`, row.filter(c => c !== null && c !== '').join(' | '));
  }
});
