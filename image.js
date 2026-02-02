const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs-extra");
const path = require("path");
const url = require("url");

const PAGE_URL = 'https://rhus-103.man.poznan.pl/dlibra/results?q=POZ-V&action=SimpleSearchAction&type=-6&p=7&ipp=5000';
const OUT_FILE = path.resolve(__dirname, 'urls.txt');


async function fetchHtml(pageUrl) {
	const resp = await axios.get(pageUrl, {
		headers: { "User-Agent": "Mozilla/5.0" },
	});
	return resp.data;
}

async function extractUrls(pageUrl) {
	const html = await fetchHtml(pageUrl);
	const $ = cheerio.load(html);
	const set = new Set();
	$("div.objectbox__photo").each((i, div) => {
		const a = $(div).find("a").first();
		if (!a) return;
		const href = (a.attr("href") || "").trim();
		if (!href) return;
		const full = url.resolve(pageUrl, href);
		if (full.startsWith("https://")) set.add(full);
	});

	return Array.from(set);
}

async function main() {
	try {
		const urls = await extractUrls(PAGE_URL);
		if (!urls.length) {
			console.log("Brak znalezionych URLi.");
			return;
		}
		// wypisz na konsolę
		urls.forEach((u) => console.log(u));
		// zapisz do pliku
		await fs.writeFile(OUT_FILE, urls.join("\n"), "utf8");
		console.log(`Zapisano ${urls.length} URLi do ${OUT_FILE}`);
	} catch (err) {
		console.error("Błąd:", err.message || err);
	}
}

main();
