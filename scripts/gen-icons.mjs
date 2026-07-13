import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

// Simple padlock icon drawn with basic shapes (no emoji font dependency)
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5b9dff"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="110" fill="url(#g)"/>
  <g>
    <path d="M186 220 v-40 a70 70 0 0 1 140 0 v40" fill="none" stroke="#ffffff" stroke-width="26" stroke-linecap="round"/>
    <rect x="156" y="210" width="200" height="160" rx="24" fill="#ffffff"/>
    <circle cx="256" cy="270" r="18" fill="#2563eb"/>
    <rect x="246" y="280" width="20" height="46" rx="8" fill="#2563eb"/>
  </g>
</svg>
`;

mkdirSync('public', { recursive: true });

await sharp(Buffer.from(svg)).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(Buffer.from(svg)).resize(512, 512).png().toFile('public/icon-512.png');
await sharp(Buffer.from(svg)).resize(180, 180).png().toFile('public/apple-touch-icon.png');

console.log('Icons generated.');
