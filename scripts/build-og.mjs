import sharp from 'sharp';

const portrait = sharp('src/img-source/DSC02789.JPG');
await portrait
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
  .composite([{
    input: Buffer.from(`
      <svg width="1200" height="630">
        <rect width="100%" height="100%" fill="rgba(43,42,38,0.4)"/>
        <text x="600" y="380" text-anchor="middle" font-family="Georgia, serif"
              font-size="120" font-weight="500" fill="#F5EFE4" font-style="italic">
          Tabitha Brown
        </text>
        <text x="600" y="460" text-anchor="middle" font-family="cursive"
              font-size="60" fill="#F5EFE4">
          hey there, friend.
        </text>
      </svg>`),
    top: 0, left: 0,
  }])
  .png()
  .toFile('public/og-image.png');
console.log('OG image built.');
