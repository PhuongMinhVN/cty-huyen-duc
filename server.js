const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3009;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml; charset=UTF-8',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  // Normalize and parse URL
  let parsedUrl = req.url.split('?')[0];
  if (parsedUrl === '/') {
    parsedUrl = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, decodeURIComponent(parsedUrl));
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Fallback to index.html for SPA if not found
        fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err, fallbackContent) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(fallbackContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff'
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 CÔNG TY TNHH MTV HUYỀN ĐỨC - WEBSITE SERVER`);
  console.log(`🌐 Website đang chạy thành công tại: http://localhost:${PORT}`);
  console.log(`📍 KCN Trung Sơn, TP. Tam Điệp, Tỉnh Ninh Bình`);
  console.log(`📞 Hotline: 0945 116 567`);
  console.log(`====================================================`);
});
