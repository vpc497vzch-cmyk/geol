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
    const fuse = new Fuse(index, { keys: ['title', 'text'], threshold: 0.4 });
    const res = fuse.search(query).slice(0, 20).map(r => r.item);
    setResults(res);
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
              <p>{r.text.slice(0, 240)}{r.text.length>240?'…':''}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
