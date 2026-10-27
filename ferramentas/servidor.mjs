// Servidor somente para pré-visualização local. Não expõe arquivos de referência.
import http from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = await realpath(fileURLToPath(new URL('../', import.meta.url)));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const policy = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";
const server = http.createServer(async (request, response) => {
  response.setHeader('Content-Security-Policy', policy);
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.setHeader('Cache-Control', 'no-cache');
  if (request.headers.host !== '127.0.0.1:4173' && request.headers.host !== 'localhost:4173') {
    response.writeHead(403).end('Host não permitido.'); return;
  }
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.setHeader('Allow', 'GET, HEAD'); response.writeHead(405).end(); return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1:4173').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
    if (relative !== 'index.html' && !/^(Css|Js|images|fonts)\/[a-zA-Z0-9_.-]+$/.test(relative)) {
      response.writeHead(404).end('Arquivo não encontrado.'); return;
    }
    const file = await realpath(path.join(root, relative));
    if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
    const mime = types[path.extname(file)];
    if (!mime) { response.writeHead(404).end(); return; }
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type': mime, 'Content-Length': content.length });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch { response.writeHead(404).end('Arquivo não encontrado.'); }
});
server.listen(4173, '127.0.0.1', () => console.log('Prévia ZM: http://127.0.0.1:4173'));
server.on('error', error => { console.error('Não foi possível iniciar a prévia:', error.message); process.exitCode = 1; });
