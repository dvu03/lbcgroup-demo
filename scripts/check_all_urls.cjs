const fs = require('fs');
const https = require('https');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

const urls = new Set();
for (const file of files) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  const matches = content.match(/https:\/\/images\.unsplash\.com\/[^\s\"\'\`]+/g);
  if (matches) {
    matches.forEach(u => urls.add(u.replace(/[,;]+$/, '')));
  }
}

console.log('Total unique Unsplash image URLs in src/data:', urls.size);

async function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ url: url.slice(0, 70), status: res.statusCode });
    });
    req.on('error', (e) => resolve({ url: url.slice(0, 70), error: e.message }));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ url: url.slice(0, 70), error: 'timeout' });
    });
  });
}

(async () => {
  const list = Array.from(urls);
  const results = await Promise.all(list.map(checkUrl));
  const bad = results.filter(r => r.status !== 200);
  console.log('Tested', results.length, 'URLs. Bad URLs count:', bad.length);
  if (bad.length > 0) {
    console.log('Bad URLs:', bad);
  }
})();
