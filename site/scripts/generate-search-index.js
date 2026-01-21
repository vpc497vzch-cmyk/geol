const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const blogDir = path.join(__dirname, '..', 'blog');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const outDir = path.join(__dirname, '..', 'static');
const outFile = path.join(outDir, 'search-index.json');

function walk(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      files.push(...walk(p));
    } else if (/\.mdx?$/.test(name)) {
      files.push(p);
    }
  }
  return files;
}

function stripFrontMatter(content) {
  // remove YAML frontmatter at the top
  return content.replace(/^---[\s\S]*?---\s*/,'');
}

function frontMatterTitle(content) {
  const m = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!m) return null;
  const fm = m[1];
  const t = fm.match(/^[ \t]*title:\s*(?:"|')?(.+?)(?:"|')?\s*$/m);
  if (t) return t[1].trim();
  return null;
}

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[(.*?)\]\([^)]*\)/g, '$1')
    .replace(/[#>*`~\-]{1,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleFromContent(content, file) {
  const m = content.match(/^#\s+(.*)/m);
  if (m) return m[1].trim();
  return path.basename(file, path.extname(file));
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function buildIndex() {
  const sources = [
    { dir: docsDir, prefix: '/docs/' },
    { dir: blogDir, prefix: '/blog/' },
    { dir: pagesDir, prefix: '/' },
  ];

  const items = [];

  // Index only one item per file: the primary title (frontmatter title or first H1).
  for (const src of sources) {
    const files = walk(src.dir);
    for (const f of files) {
      const raw = fs.readFileSync(f, 'utf8');
      const nofm = stripFrontMatter(raw);
      // Skip pages explicitly marked as removed
      if (/This page has been removed\.|Removed: the Markdown page/.test(raw)) {
        continue;
      }
      let rel = path.relative(src.dir, f).replace(/\\\\/g, '/').replace(/index\.mdx?$/,'').replace(/\.mdx?$/,'');
      let baseUrl = path.posix.join(src.prefix, rel || '/');
      if (!baseUrl.startsWith('/')) baseUrl = '/' + baseUrl;

      // Determine primary title: frontmatter title > first H1 > filename
      const fmTitle = frontMatterTitle(raw);
      const contentTitle = titleFromContent(nofm, f);
      const title = fmTitle || contentTitle || path.basename(f, path.extname(f));
      // Leave `text` empty so the search UI shows only the bold title
      const text = '';
      // Use the page URL (no fragment) so search highlights the top-level entry (the bold one in the UI)
      const pageUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
      // Exclude specific pages from the index (e.g. the default Welcome blog post)
      const excludePaths = ['/blog/2021-08-26-welcome', '/blog/welcome'];
      if (excludePaths.some(p => pageUrl.startsWith(p))) {
        continue;
      }
      items.push({ title, text, url: pageUrl });

      // Also index H2+ headings as separate entries with fragments (these show the '#' in the UI)
      const lines = nofm.split(/\r?\n/);
      for (const line of lines) {
        const m = line.match(/^(#{1,6})\s+(.*)$/);
        if (m) {
          const level = m[1].length;
          const heading = m[2].trim();
          // skip H1 since it's the page title
          if (level <= 1) continue;
          const slug = slugify(heading);
          const headingUrl = pageUrl.endsWith('/') ? pageUrl + '#' + slug : pageUrl + '/#' + slug;
          items.push({ title: heading, text: '', url: headingUrl });
        }
      }
    }
  }
  // Deduplicate by normalized title, preferring docs > blog > pages
  const priority = (url) => {
    if (!url) return 3;
    if (url.startsWith('/docs/')) return 1;
    if (url.startsWith('/blog/')) return 2;
    return 3;
  };
  const map = new Map();
  for (const it of items) {
    const key = (it.title || '').toString().toLowerCase().trim();
    const existing = map.get(key);
    if (!existing) {
      map.set(key, it);
      continue;
    }
    const pNew = priority(it.url);
    const pOld = priority(existing.url);
    if (pNew < pOld) {
      map.set(key, it);
    }
  }
  const dedup = Array.from(map.values());

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  fs.writeFileSync(outFile, JSON.stringify(dedup, null, 2));
  console.log('Wrote', outFile, 'with', items.length, 'entries');
}

try {
  buildIndex();
} catch (e) {
  console.error(e);
  process.exit(1);
}
