// Regenerate the Open Graph social-card JPGs from the designed source card.
// Source: src/img-source/og-social-card.png  (16:9 designed card)
// Outputs:
//   public/og-1200x630.jpg  — landscape, cover-cropped center (the one used in meta tags)
//   public/og-1200x1200.jpg — square, full card letterboxed on matching gold padding
// Usage: node scripts/regenerate-og.mjs
import sharp from 'sharp';

const SRC = 'src/img-source/og-social-card.png';

// Sample the gold background color from a top-left corner pixel for seamless padding.
const { data } = await sharp(SRC).extract({ left: 6, top: 6, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
const gold = { r: data[0], g: data[1], b: data[2] };
console.log(`Gold background sampled: rgb(${gold.r}, ${gold.g}, ${gold.b})`);

// 1) Landscape 1200x630 — cover crop, centered (trims a hair off top/bottom)
await sharp(SRC)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'center' })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og-1200x630.jpg');
console.log('✓ public/og-1200x630.jpg');

// 2) Square 1200x1200 — full card at 1200 wide, letterboxed on gold padding
const card = await sharp(SRC).resize({ width: 1200 }).toBuffer();
const meta = await sharp(card).metadata();
const padV = Math.round((1200 - meta.height) / 2);
await sharp({ create: { width: 1200, height: 1200, channels: 3, background: gold } })
  .composite([{ input: card, top: padV, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og-1200x1200.jpg');
console.log(`✓ public/og-1200x1200.jpg (card ${meta.width}x${meta.height}, pad ${padV}px top/bottom)`);
