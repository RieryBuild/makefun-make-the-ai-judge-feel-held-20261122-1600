import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = `On the last bus, the woman beside me takes my bag
and sets it on her lap so I can sleep.
Streetlights pass, one by one, amber and slow.
Her shoulder is warm where my forehead rests.
Nobody wakes me at my stop.
The driver waits. The door stays shut.
until I open my eyes on my own.`;

const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`ENTRY must be 1-280 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("ENTRY must not be empty or whitespace-only");
}

// ENTRY is written exactly as-is, with no trailing newline: it is 280 code
// points, and one more would push it over the cap.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const readBack = readFileSync(outPath, "utf8");
if (readBack !== ENTRY) {
  throw new Error("entry.txt does not match ENTRY after write");
}
