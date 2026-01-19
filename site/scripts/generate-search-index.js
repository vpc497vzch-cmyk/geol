const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const outDir = path.join(__dirname, '..', 'static');
const outFile = path.join(outDir, 'search-index.json');

function walk(dir) {
  const files = [];
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

function buildIndex() {
  const files = walk(docsDir);
  const items = files.map(f => {
    const raw = fs.readFileSync(f, 'utf8');
    const nofm = stripFrontMatter(raw);
    const title = titleFromContent(nofm, f);
    const text = stripMarkdown(nofm);
    // derive route from docs path
    const rel = path.relative(docsDir, f).replace(/\\\\/g, '/').replace(/index\.mdx?$/,'').replace(/\.mdx?$/,'');
    const url = '/docs/' + rel;
    return { title, text, url };
  });
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  fs.writeFileSync(outFile, JSON.stringify(items, null, 2));
  console.log('Wrote', outFile, 'with', items.length, 'entries');
}

try {
  buildIndex();
} catch (e) {
  console.error(e);
  process.exit(1);
}
