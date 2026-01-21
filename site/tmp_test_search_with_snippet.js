const fs = require('fs');
const Fuse = require('fuse.js');
const idx = JSON.parse(fs.readFileSync('static/search-index.json'));
const fuse = new Fuse(idx, { keys: ['title','text'], threshold: 0.4, includeScore: true });
const raw = fuse.search('list').slice(0,200);
const q = 'list';
const qlow = q.toLowerCase();
const direct = idx.filter(i => (i.text || '').toLowerCase().includes(qlow));
const bestByPage = new Map();
for (const r of raw) {
  const it = r.item;
  const score = typeof r.score === 'number' ? r.score : 1;
  const pageUrl = (it.url || '').split('#')[0];
  const existing = bestByPage.get(pageUrl);
  if (!existing || score < existing.score) {
    bestByPage.set(pageUrl, { item: it, score });
  }
}
const directByPage = new Map();
for (const it of direct) {
  const pageUrl = (it.url || '').split('#')[0];
  const existing = directByPage.get(pageUrl);
  if (!existing) { directByPage.set(pageUrl, it); continue; }
  const existingIsFragment = (existing.url || '').includes('#');
  const itIsFragment = (it.url || '').includes('#');
  if (itIsFragment && !existingIsFragment) { directByPage.set(pageUrl, it); continue; }
  if (itIsFragment && existingIsFragment) {
    const exIdx = (existing.text || '').toLowerCase().indexOf(qlow);
    const itIdx = (it.text || '').toLowerCase().indexOf(qlow);
    if (itIdx >= 0 && (exIdx === -1 || itIdx < exIdx)) directByPage.set(pageUrl, it);
  }
}
for (const [pageUrl, it] of directByPage.entries()) {
  bestByPage.set(pageUrl, { item: it, score: 0 });
}
const sorted = Array.from(bestByPage.entries())
  .map(([pageUrl, v]) => ({ pageUrl, item: v.item, score: v.score }))
  .sort((a, b) => a.score - b.score)
  .slice(0, 20);

function makeSnippet(text, q) {
  if (!text) return '';
  const qt = (q || '').toString().toLowerCase();
  const t = text.toString();
  if (!qt) return t.slice(0, 140) + (t.length > 140 ? '…' : '');
  const li = t.toLowerCase().indexOf(qt);
  if (li === -1) return t.slice(0, 140) + (t.length > 140 ? '…' : '');
  const start = Math.max(0, li - 40);
  const end = Math.min(t.length, li + qt.length + 40);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < t.length ? '…' : '';
  return prefix + t.slice(start, end).trim() + suffix;
}

const results = sorted.map(({ pageUrl, item }) => {
  const isFragment = (item.url || '').includes('#');
  const pageEntry = idx.find(e => (e.url || '').split('#')[0] === pageUrl);
  const title = isFragment ? item.title : (pageEntry && pageEntry.title) ? pageEntry.title : item.title;
  const url = isFragment ? item.url : pageUrl;
  const snippet = makeSnippet(item.text || (pageEntry && pageEntry.text) || '', q);
  return { title, url, snippet };
});
console.log(results);
