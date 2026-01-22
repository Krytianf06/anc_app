const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const url = require('url');

const INPUT_FILE = path.resolve(__dirname, 'urls.txt');
const OUTPUT_DIR = path.resolve(__dirname, 'downloaded_every5min');
const CONCURRENT = 3;


// Wyciąga numer edition z URL, np. .../edition/231006 -> 231006
function extractEditionId(pageUrl) {
  try {
    const parsed = url.parse(pageUrl);
    const parts = (parsed.pathname || '').split('/').filter(Boolean);
    const idx = parts.indexOf('edition');
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    // alternatywnie: sprawdź czy ostatni segment jest numerem
    const last = parts[parts.length - 1];
    if (/^\d+$/.test(last)) return last;
    return null;
  } catch {
    return null;
  }
}

function buildDownloadUrl(editionId) {
  return `https://rhus-103.man.poznan.pl/Content/${editionId}/download/`;
}

async function readInputUrls() {
  const txt = await fs.readFile(INPUT_FILE, 'utf8');
  return txt.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
}

function fileNameFromResponseUrl(respUrl, fallbackName) {
  try {
    const p = url.parse(respUrl).pathname || '';
    const base = path.basename(p) || fallbackName;
    return base;
  } catch {
    return fallbackName;
  }
}

async function downloadTo(fileUrl, destPath) {
  const resp = await axios.get(fileUrl, {
    responseType: 'stream',
    headers: { 'User-Agent': 'Mozilla/5.0' },
    timeout: 30_000
  });
  await fs.ensureDir(path.dirname(destPath));
  await new Promise((resolve, reject) => {
    const w = fs.createWriteStream(destPath);
    resp.data.pipe(w);
    w.on('finish', resolve);
    w.on('error', reject);
  });
}

async function processOnce() {
  console.log(new Date().toISOString(), 'Start pobierania - jednorazowe przejście');
  const pages = await readInputUrls();
  const editions = pages.map(extractEditionId).filter(Boolean);
  const unique = Array.from(new Set(editions));
  if (!unique.length) {
    console.log('Brak poprawnych edition id w', INPUT_FILE);
    return;
  }
  console.log('Znalezione edition id:', unique.join(', '));

  const downloadUrls = unique.map(id => ({ id, url: buildDownloadUrl(id) }));

  let idx = 0;

  const queue = downloadUrls.slice();
const workers = new Array(CONCURRENT).fill(null).map(async () => {
  while (queue.length) {
    const item = queue.shift();
    const current = ++idx;
    try {
      const dlUrl = item.url;
      console.log(`[${current}] Pobieram edition ${item.id} -> ${dlUrl}`);
      const resp = await axios.get(dlUrl, {
        responseType: 'stream',
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30_000
      });

      let name = `edition-${item.id}`;
  const cd = resp.headers && resp.headers['content-disposition'];
  if (cd) {
    const m = cd.match(/filename\*?=(?:UTF-8'')?["']?([^;"']+)/i);
    if (m) name = decodeURIComponent(m[1]);
  } else {
    name = fileNameFromResponseUrl(resp.request?.res?.responseUrl || dlUrl, `edition-${item.id}`);
  }

  const destName = `${item.id}_${name}`;
const parts = destName.split('_');
const finalName = parts.length >= 3 ? parts.slice(2).join('_') : destName;
const safeName = path.basename(finalName);
const destPath = path.join(OUTPUT_DIR, safeName);

  await fs.ensureDir(OUTPUT_DIR);
  await new Promise((resolve, reject) => {
    const w = fs.createWriteStream(destPath);
    resp.data.pipe(w);
    w.on('finish', resolve);
    w.on('error', reject);
  });

  console.log(`[${current}] Zapisano -> ${destPath}`);
} catch (err) {
  console.error(`[${current}] Błąd pobierania edition ${item.id}:`, err.message || err);
}

}
});
await Promise.all(workers);
console.log(new Date().toISOString(), 'Zakończono przejście');
}

async function startScheduler() {
  console.log('Uruchamiam jednorazowe pobieranie (po zakończeniu skrypt zakończy działanie)');
  await processOnce();
  console.log('Wszystkie pobrania zakończone — kończę proces.');
  process.exit(0);
}

startScheduler().catch(e => console.error('startScheduler error:', e));