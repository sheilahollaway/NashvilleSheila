const fs=require('fs'),path=require('path');
const root=__dirname;
const pages=JSON.parse(fs.readFileSync(path.join(root,'pages.json'),'utf8'));
const out=path.join(root,'package','nashville-sheila');
fs.mkdirSync(path.join(out,'assets'),{recursive:true});
for(const [slug,title] of Object.entries(pages)){
 const html=fs.readFileSync(path.join(root,slug+'.html'),'utf8');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=match[1];
  if(url.startsWith('#')){if(!html.includes('id="'+url.slice(1)+'"'))throw Error('Missing anchor '+url);}
  else if(!/^(https?:|mailto:|tel:)/.test(url)&&!fs.existsSync(path.join(root,url)))throw Error('Missing file '+url);
 }
 let php=html.replace('<html lang="en">','<html <?php language_attributes(); ?>>')
 .replace('<meta charset="utf-8">','<meta charset="<?php bloginfo(\'charset\'); ?>">')
 .replace(/<title>.*?<\/title>/,'')
 .replace('<link rel="stylesheet" href="style.css">','<?php wp_head(); ?>')
 .replace('<body>','<body <?php body_class(); ?>><?php wp_body_open(); ?>')
 .replaceAll('src="assets/','src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/')
 .replaceAll('href="assets/','href="<?php echo esc_url(get_template_directory_uri()); ?>/assets/')
 .replace(/href="([a-z-]+)\.html"/g,(_,page)=>'href="<?php echo esc_url(nashville_sheila_page_url(\''+page+'\')); ?>"')
 .replace('</body>','<?php wp_footer(); ?></body>');
 const name=slug==='index'?'index.php':'page-'+slug+'.php';
 if(slug!=='index')php='<?php /* Template Name: '+title+' */ ?>\n'+php;
 fs.writeFileSync(path.join(root,name),php);
 fs.writeFileSync(path.join(out,name),php);
 if(slug==='index'){fs.writeFileSync(path.join(root,'front-page.php'),php);fs.writeFileSync(path.join(out,'front-page.php'),php);}
}
for(const f of ['style.css','functions.php'])fs.copyFileSync(path.join(root,f),path.join(out,f));
for(const asset of fs.readdirSync(path.join(root,'assets')))fs.copyFileSync(path.join(root,'assets',asset),path.join(out,'assets',asset));
console.log('Verified links and assets for '+Object.keys(pages).length+' pages. Prepared WordPress templates.');
