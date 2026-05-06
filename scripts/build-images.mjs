import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const SRC = 'src/img-source';
const OUT = 'src/assets/img';
const WIDTHS = [640, 1280, 1920];
const FORMATS = [
  { ext: 'avif', opts: { quality: 60, effort: 6 } },
  { ext: 'webp', opts: { quality: 75 } },
  { ext: 'jpg',  opts: { quality: 80, mozjpeg: true } },
];

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function processOne(file) {
  const { name } = parse(file);
  const base = slug(name);
  const input = sharp(join(SRC, file));
  const meta = await input.metadata();
  console.log(`→ ${file} (${meta.width}×${meta.height})`);

  for (const w of WIDTHS) {
    if (w > meta.width) continue;
    for (const { ext, opts } of FORMATS) {
      const out = join(OUT, `${base}-${w}.${ext}`);
      await sharp(join(SRC, file))
        .resize({ width: w, withoutEnlargement: true })
        .toFormat(ext, opts)
        .toFile(out);
    }
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(SRC)).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  console.log(`Processing ${files.length} files...`);
  for (const f of files) await processOne(f);
  console.log('Done.');
}

main().catch(e => { console.error(e); process.exit(1); });
