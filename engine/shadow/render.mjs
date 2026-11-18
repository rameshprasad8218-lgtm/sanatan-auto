// node render.mjs <name> test <t1> <t2> ...   -> out/<name>_<t>.png
// FPS=60 node render.mjs <name> render        -> out/<name>_silent.mp4   (needs `npm i puppeteer-core`, Chrome at /usr/bin/google-chrome or CHROME=...)
import { createRequire } from 'module'; import { writeFileSync } from 'fs'; import path from 'path'; import { fileURLToPath } from 'url'; import { spawn } from 'child_process';
const require = createRequire(import.meta.url); const puppeteer = require('puppeteer-core'); const HERE = path.dirname(fileURLToPath(import.meta.url));
const [name, mode, ...rest] = process.argv.slice(2); const FPS = +(process.env.FPS || 60);
const b = await puppeteer.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', headless: 'new', args: ['--no-sandbox', '--allow-file-access-from-files', '--window-size=1280,800'] });
const pg = await b.newPage(); await pg.setViewport({ width: 1280, height: 800 }); const errs = [];
pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await pg.goto('file://' + path.join(HERE, `out/${name}.html`), { waitUntil: 'load' });
try { await pg.waitForFunction('window.READY===true', { timeout: 60000 }); } catch (e) { console.log('NOT READY', errs); process.exit(1); }
const grab = (t) => pg.evaluate((t) => { window.seek(t); return document.getElementById('cv').toDataURL('image/png').split(',')[1]; }, t);
if (mode === 'events') { writeFileSync(path.join(HERE, `data/${name}.events.json`), JSON.stringify(await pg.evaluate(() => window.EVENTS))); console.log('events written', await pg.evaluate(() => window.DURATION)); }
else if (mode === 'test') { for (const t of rest.map(Number)) writeFileSync(path.join(HERE, `out/${name}_${t}.png`), Buffer.from(await grab(t), 'base64')); console.log('errors', JSON.stringify(errs)); }
else { const D = process.env.TMAX ? +process.env.TMAX : await pg.evaluate(() => window.DURATION), n = Math.round(D * FPS);
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-', '-c:v', 'libx264', '-crf', '17', '-pix_fmt', 'yuv420p', path.join(HERE, `out/${name}${process.env.TMAX ? '_head' : '_silent'}.mp4`)], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) { ff.stdin.write(Buffer.from(await grab(i / FPS), 'base64')); } ff.stdin.end(); await new Promise((r) => ff.on('close', r)); console.log('rendered', n, 'frames at', FPS, 'fps; errors', JSON.stringify(errs)); }
await b.close();
