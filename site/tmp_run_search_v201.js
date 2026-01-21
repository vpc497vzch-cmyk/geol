const fs = require('fs');
const Fuse = require('fuse.js');
const idx = JSON.parse(fs.readFileSync('static/search-index.json'));
const fuse = new Fuse(idx, { keys: ['title','text'], threshold: 0.4, includeScore: true });
const res = fuse.search('v2.0.1').slice(0,200).map(r=>r.item);
console.log('fuse items:', res.map(i=>({title:i.title,url:i.url})));
const raw = fuse.search('v2.0.1').slice(0,400);
const direct = idx.filter(i => (i.text || '').toLowerCase().includes('v2.0.1'));
const byUrl = new Map();
for (const r of raw) {
  const it = r.item;
  const score = typeof r.score === 'number' ? r.score : 1;
  const url = it.url || '';
  const existing = byUrl.get(url);
  if (!existing || score < existing.score) {
    byUrl.set(url, { item: it, score });
  }
}
for (const it of direct) {
  const url = it.url || '';
  byUrl.set(url, { item: it, score: 0 });
}
const sorted = Array.from(byUrl.entries()).map(([url, v])=>({url, item: v.item, score: v.score})).sort((a,b)=>a.score-b.score).slice(0,50);
console.log('final sorted:', sorted.map(s=>({title:s.item.title,url:s.url,score:s.score})));