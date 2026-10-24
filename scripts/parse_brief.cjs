const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const workbook = XLSX.readFile(path.join(__dirname, '..', 'Brief_Website_lbcgroup.vn (2).xlsx'));
console.log('SHEET NAMES:', workbook.SheetNames);

const output = {};
workbook.SheetNames.forEach(sheetName => {
  const sheet = workbook.Sheets[sheetName];
  output[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
});

fs.writeFileSync(path.join(__dirname, 'brief_dump.json'), JSON.stringify(output, null, 2), 'utf-8');
console.log('Brief dumped to scripts/brief_dump.json');
