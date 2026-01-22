// download-image.js
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');
const url = require('url');

const PAGE_URL = 'https://www.przychodnianovet.pl/jak-dbac-o-higiene-jamy-ustnej-psa-i-kota-w-domu/';
const OUTPUT_DIR = path.resolve(__dirname, 'downloaded_images');

async function ensureDir(dir) {
  await fs.ensureDir(dir);
}

async function fetchHtml(pageUrl) {
  const resp = await axios.get(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  return resp.data;
}

function resolveSrc(pageUrl, src) {
  return url.resolve(pageUrl, src);
}

async function downloadFile(fileUrl, destPath) {
  const writer = fs.createWriteStream(destPath);
  const response = await axios.get(fileUrl, { responseType: 'stream', headers: { 'User-Agent': 'Mozilla/5.0' } });
  return new Promise((resolve, reject) => {
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function main() {
  try {
    await ensureDir(OUTPUT_DIR);
    const html = await fetchHtml(PAGE_URL);
    const $ = cheerio.load(html);

    // Znajdź pierwszy obrazek w dokumencie (możesz zmienić selektor)
    const img = $('img').first();
    if (!img || !img.attr('src')) {
      console.error('Nie znaleziono img lub src na stronie.');
      return;
    }

    const src = img.attr('src').trim();

    // Pomijaj data URI
    if (src.startsWith('data:')) {
      console.error('Pierwszy obrazek to data URI, pomijam.');
      return;
    }

    // Rozwiąż względny URL do pełnego
    const imgUrl = resolveSrc(PAGE_URL, src);

    // Wyznacz nazwę pliku
    const parsed = url.parse(imgUrl);
    const fileName = path.basename(parsed.pathname) || 'image.jpg';
    const destPath = path.join(OUTPUT_DIR, fileName);

    // Pobierz i zapisz plik
    console.log('Pobieram:', imgUrl);
    await downloadFile(imgUrl, destPath);
    console.log('Zapisano do:', destPath);
  } catch (err) {
    console.error('Błąd:', err.message || err);
  }
}

main();