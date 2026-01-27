import React, {useEffect, useState} from 'react';

function Toc({headings}){
  if (!headings || headings.length === 0) return null;
  return (
    <nav className="tableOfContents_bqdL thin-scrollbar theme-doc-toc-desktop" aria-label="Table of contents">
      <div>
        <ul className="table-of-contents table-of-contents__left-border">
          {headings.map((h) => (
            <li key={h.id} className="table-of-contents__item">
              <a className="table-of-contents__link" href={`#${h.id}`}>{h.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function ReleasesLayout({children}){
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // collect headings inside the article/markdown area
    const container = document.querySelector('main article') || document.querySelector('main');
    if (!container) return;
    const hNodes = Array.from(container.querySelectorAll('h2'));
    hNodes.forEach((h) => {
      if (!h.id) {
        h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      // If neither default Docusaurus anchor nor our hash-link exists, add one
      const hasDefaultAnchor = !!h.querySelector('.hash-link, a.anchor');
      if (!hasDefaultAnchor) {
        const a = document.createElement('a');
        a.className = 'hash-link';
        a.href = `#${h.id}`;
        a.setAttribute('aria-hidden', 'true');
        a.innerHTML = '<span aria-hidden="true">#</span>';
        a.style.marginLeft = '0.25rem';
        a.style.textDecoration = 'none';
        h.appendChild(a);
      }
    });
    const hs = hNodes.map((h) => {
      // Build heading text from text nodes only, ignore anchor elements
      const textNodes = Array.from(h.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE);
      const text = textNodes.map((n) => n.textContent.trim()).join(' ').trim();
      return {id: h.id, text: text || h.textContent || h.innerText};
    });
    setHeadings(hs);
  }, []);

  return (
    <div className="container margin-vert--lg">
      <div className="row">
        <main className="col col--9 col--offset-1">
          {children}
        </main>
        <aside className="col col--2">
          <Toc headings={headings} />
        </aside>
      </div>
    </div>
  );
}
