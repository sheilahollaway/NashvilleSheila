const http=require('http'),fs=require('fs'),path=require('path');
const base=__dirname;
http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=path.resolve(base,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(base+path.sep)||!['.html','.css','.jpg','.png','.webp','.pdf'].includes(path.extname(file))){res.writeHead(404);return res.end('Not found');}
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.pdf':'application/pdf'})[path.extname(file)]);res.end(data);});
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
