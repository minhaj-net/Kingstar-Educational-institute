import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Our logo SVG — navy circle + gold book (same as Navbar)
const svgContent = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" width="64" height="64">
  <circle cx="32" cy="32" r="32" fill="#1a2e5a"/>
  <path
    d="M18 46V26a1.5 1.5 0 011.5-1.5h9a5 5 0 015 5V46M18 46h15.5M33.5 46V29.5"
    stroke="#c8a84b"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M33.5 29.5H40a1.5 1.5 0 011.5 1.5V46"
    stroke="#c8a84b"
    stroke-width="3"
    stroke-linecap="round"
  />
  <path d="M18 46h24" stroke="#c8a84b" stroke-width="3" stroke-linecap="round"/>
</svg>`;

const svgBuffer = Buffer.from(svgContent);

// Generate 32x32 PNG (used inside ICO)
const png32 = await sharp(svgBuffer, { density: 300 })
  .resize(32, 32)
  .png()
  .toBuffer();

// Generate 16x16 PNG
const png16 = await sharp(svgBuffer, { density: 300 })
  .resize(16, 16)
  .png()
  .toBuffer();

// Generate 48x48 PNG
const png48 = await sharp(svgBuffer, { density: 300 })
  .resize(48, 48)
  .png()
  .toBuffer();

// ── Build a proper ICO file (multi-size: 16, 32, 48) ──
// ICO format: ICONDIR + ICONDIRENTRYs + image data
function buildIco(images) {
  const count = images.length;
  // Header: 6 bytes
  // Each entry: 16 bytes
  // Total header size: 6 + count * 16
  const headerSize = 6 + count * 16;

  // Calculate offsets
  let offset = headerSize;
  const entries = images.map((img) => {
    const entry = { data: img.data, size: img.size, offset };
    offset += img.data.length;
    return entry;
  });

  const totalSize = offset;
  const buf = Buffer.alloc(totalSize);

  // ICONDIR header
  buf.writeUInt16LE(0, 0);      // Reserved
  buf.writeUInt16LE(1, 2);      // Type: 1 = ICO
  buf.writeUInt16LE(count, 4);  // Count

  // ICONDIRENTRY for each image
  entries.forEach((entry, i) => {
    const base = 6 + i * 16;
    const s = entry.size;
    buf.writeUInt8(s >= 256 ? 0 : s, base);      // Width (0 = 256)
    buf.writeUInt8(s >= 256 ? 0 : s, base + 1);  // Height
    buf.writeUInt8(0, base + 2);                  // Color count
    buf.writeUInt8(0, base + 3);                  // Reserved
    buf.writeUInt16LE(1, base + 4);               // Planes
    buf.writeUInt16LE(32, base + 6);              // Bit count
    buf.writeUInt32LE(entry.data.length, base + 8);  // Size of image data
    buf.writeUInt32LE(entry.offset, base + 12);       // Offset
  });

  // Write image data
  entries.forEach((entry) => {
    entry.data.copy(buf, entry.offset);
  });

  return buf;
}

const icoBuffer = buildIco([
  { data: png16, size: 16 },
  { data: png32, size: 32 },
  { data: png48, size: 48 },
]);

// Write to app/favicon.ico (Next.js App Router picks this up automatically)
writeFileSync(join(root, "app", "favicon.ico"), icoBuffer);

// Also write the SVG for modern browsers
writeFileSync(join(root, "app", "favicon.svg"), svgContent);

// Write a 192x192 PNG for apple-touch-icon / PWA
const png192 = await sharp(svgBuffer, { density: 300 })
  .resize(192, 192)
  .png()
  .toBuffer();
writeFileSync(join(root, "public", "icon-192.png"), png192);

console.log("✓ favicon.ico (16/32/48px), favicon.svg, icon-192.png generated");
