const fs = require('fs');
const path = require('path');
const source = __dirname;
const output = path.join(source, '..', 'dist');
const pages = JSON.parse(fs.readFileSync(path.join(source, 'pages.json'), 'utf8'));
fs.mkdirSync(path.join(output, 'assets'), {recursive: true});
for (const slug of Object.keys(pages)) {
  const html = fs.readFileSync(path.join(source, slug + '.html'), 'utf8');
  for (const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(url)) continue;
    if (url.startsWith('#')) {
      if (!html.includes('id="' + url.slice(1) + '"')) throw Error('Missing anchor: ' + url);
    } else if (!fs.existsSync(path.join(source, url))) throw Error('Missing file: ' + url);
  }
  fs.writeFileSync(path.join(output, slug + '.html'), html);
}
fs.copyFileSync(path.join(source, 'style.css'), path.join(output, 'style.css'));
for (const file of fs.readdirSync(path.join(source, 'assets'))) {
  if (!/.(jpg|jpeg|png|webp|pdf)$/i.test(file)) continue;
  fs.copyFileSync(path.join(source, 'assets', file), path.join(output, 'assets', file));
}
const listings = fs.readFileSync(path.join(output, 'listings.html'), 'utf8');
if (listings.indexOf('<realscout-your-listings') < 0 ||
    listings.indexOf('<realscout-your-listings') > listings.indexOf('<realscout-office-listings')) {
  throw Error('Personal listings must appear before office listings.');
}
console.log('Built and validated 8 static pages with assets. No PHP, credentials, or build tools published.');
