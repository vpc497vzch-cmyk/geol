const fs = require('fs');
const Fuse = require('fuse.js');
const idx = JSON.parse(fs.readFileSync('static/search-index.json'));
const fuse = new Fuse(idx, { keys: ['title','text'], threshold: 0.4, includeScore: true });
const raw = fuse.search('list').slice(0,200);
const q = 'list';
const qlow = q.toLowerCase();
const direct = idx.filter(i => (i.text || '').toLowerCase().includes(qlow));
const best = new Map();
for (const r of raw) {
  const it = r.item;
  const score = typeof r.score === 'number' ? r.score : 1;
  const pageUrl = (it.url || '').split('#')[0];
  const existing = best.get(pageUrl);
  if (!existing || score < existing.score) {
    best.set(pageUrl, { item: it, score });
  }
}
for (const it of direct) {
  const pageUrl = (it.url || '').split('#')[0];
  best.set(pageUrl, { item: it, score: 0 });
}
const sorted = Array.from(best.entries())
  .map(([pageUrl, v]) => ({ pageUrl, item: v.item, score: v.score }))
  .sort((a, b) => a.score - b.score)
  .slice(0, 20);
console.log(sorted.map(s => ({ title: s.item.title, url: s.item.url, score: s.score })));
