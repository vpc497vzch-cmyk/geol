import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Fuse from 'fuse.js';
import './search.css';

export default function SearchPage() {
  const [index, setIndex] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/search-index.json')
      .then(r => r.json())
      .then(data => setIndex(data))
      .catch(() => setIndex([]));
  }, []);

  useEffect(() => {
    if (!query || index.length === 0) { setResults([]); return; }

    // Exclude release version fragments (they look like `/releases/#v...`)
    const filteredIndex = index.filter(i => !((i.url || '').includes('/releases/#')));

    const fuse = new Fuse(filteredIndex, { keys: ['title', 'text'], threshold: 0.4, includeScore: true });
    const raw = fuse.search(query).slice(0, 400);
    const qlow = query.toLowerCase();
    // Also find direct substring matches in `text` to boost exact content matches
    const direct = filteredIndex.filter(i => (i.text || '').toLowerCase().includes(qlow));

    // Merge Fuse + direct into candidates list with scores
    const candidates = [];
    for (const r of raw) candidates.push({ item: r.item, score: typeof r.score === 'number' ? r.score : 1 });
    for (const it of direct) candidates.push({ item: it, score: 0 });

    // Group by base page URL (before '#')
    const groups = new Map();
    for (const c of candidates) {
      const url = (c.item.url || '');
      const base = (url.split('#')[0]) || '/';
      if (!groups.has(base)) groups.set(base, []);
      groups.get(base).push(c);
    }

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

    const resultsArr = [];
    for (const [base, items] of groups.entries()) {
      // For each page, pick the best candidate
      let best = null;
      for (const it of items) if (!best || it.score < best.score) best = it;
      const pageEntry = index.find(e => (e.url || '').split('#')[0] === base) || {};
      // prefer a fragment candidate if present
      const fragItem = items.find(i => (i.item.url || '').includes('#')) || null;
      const chosen = fragItem || best;
      if (!chosen) continue;
      const isFragment = (chosen.item.url || '').includes('#');
      let outUrl = isFragment ? chosen.item.url : (pageEntry.url || base);
      if (isFragment) {
        const parts = outUrl.split('#');
        const frag = parts[1] || '';
        const baseOnly = parts[0] || outUrl || '/';
        outUrl = `${baseOnly}${baseOnly.includes('?') ? '&' : '?'}anchorTitle=${encodeURIComponent(chosen.item.title)}#${frag}`;
      }
      const title = pageEntry.title || chosen.item.title || '';
      const subtitle = (isFragment && chosen.item.title && chosen.item.title !== title) ? chosen.item.title : '';
      const snippet = makeSnippet(chosen.item.text || pageEntry.text || '', query);
      resultsArr.push({ title, subtitle, url: outUrl, snippet, score: chosen.score });
    }

    // sort by score and limit
    resultsArr.sort((a, b) => (a.score || 1) - (b.score || 1));
    setResults(resultsArr.slice(0, 50));
  }, [query, index]);

  return (
    <Layout title="Search">
      <main className="container margin-vert--lg">
        <h1>Search</h1>
        <div className="search-box">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search docs..." />
        </div>
        <div className="search-results">
          {results.length === 0 && query && <p>No results</p>}
          {results.map((r, i) => (
            <div key={i} className="search-result-item">
              <h3><Link to={r.url}>{r.title}</Link></h3>
              {r.snippet && <p className="search-snippet">{r.snippet}</p>}
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
