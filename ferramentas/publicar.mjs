// Gera somente os arquivos públicos; documentos de estudo ficam fora do site.
import { mkdir, copyFile, rm, lstat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== 'dist') {
  throw new Error('Diretório de publicação inválido.');
}
try {
  const existing = await lstat(output);
  if (existing.isSymbolicLink()) throw new Error('A pasta dist não pode ser um link.');
  await rm(output, { recursive: true });
} catch (error) { if (error.code !== 'ENOENT') throw error; }

const files = [
  'index.html', 'Css/estilos.css', 'Css/icones.css', 'Js/script.js',
  'images/logo_zm.webp', 'images/logo_caixa.webp', 'images/mulher_trabalho.webp',
  'fonts/fa-solid-900.woff2', 'fonts/fa-brands-400.woff2'
];
for (const file of files) {
  const destination = path.join(output, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(root, file), destination);
}
console.log(`Publicação preparada: ${files.length} arquivos em dist/.`);
