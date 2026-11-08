import { spawn, spawnSync } from 'node:child_process';
import { createReadStream } from 'node:fs';
import { copyFile, rename, stat, unlink } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pdfPath = path.join(root, 'public', 'documents', 'resume.pdf');
const legacyPdfPath = path.join(root, 'public', 'documents', 'Drew Norman - Resume.pdf');
const temporaryPdf = path.join(root, 'public', 'documents', '.resume-render.pdf');
const contentTypes = {
  '.css': 'text/css',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} exited with status ${result.status}`);
}

function runAsync(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (status) => {
      if (status === 0) resolve();
      else reject(new Error(`${command} exited with status ${status}`));
    });
  });
}

function findChromium() {
  const candidates = [process.env.CHROMIUM_BIN, 'chromium', 'chromium-browser', 'google-chrome'].filter(Boolean);
  for (const candidate of candidates) {
    const result = spawnSync(candidate, ['--version'], { stdio: 'ignore' });
    if (!result.error && result.status === 0) return candidate;
  }
  throw new Error('Chromium is required. Install it or set CHROMIUM_BIN to its executable.');
}

const browser = findChromium();
run('yarn', ['build']);

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://localhost');
    let relativePath = decodeURIComponent(url.pathname);
    if (relativePath.endsWith('/')) relativePath += 'index.html';
    const requestedPath = path.resolve(dist, `.${relativePath}`);
    if (!requestedPath.startsWith(`${dist}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    const file = await stat(requestedPath);
    if (!file.isFile()) throw new Error('Not a file');
    response.writeHead(200, { 'Content-Type': contentTypes[path.extname(requestedPath)] ?? 'application/octet-stream' });
    createReadStream(requestedPath).pipe(response);
  } catch {
    response.writeHead(404).end();
  }
});

try {
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Could not start preview server');

  await runAsync(browser, [
    '--headless',
    '--disable-gpu',
    '--disable-background-networking',
    '--no-first-run',
    '--no-default-browser-check',
    '--no-pdf-header-footer',
    `--print-to-pdf=${temporaryPdf}`,
    `http://127.0.0.1:${address.port}/resume/`,
  ]);

  const output = await stat(temporaryPdf);
  if (output.size < 10_000) throw new Error('Generated PDF is unexpectedly small');
  await rename(temporaryPdf, pdfPath);
  await copyFile(pdfPath, legacyPdfPath);
  await copyFile(pdfPath, path.join(dist, 'documents', path.basename(pdfPath)));
  await copyFile(legacyPdfPath, path.join(dist, 'documents', path.basename(legacyPdfPath)));
  process.stdout.write(`Updated ${path.relative(root, pdfPath)} and ${path.relative(root, legacyPdfPath)}\n`);
} finally {
  server.close();
  await unlink(temporaryPdf).catch(() => {});
}
