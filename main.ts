// news-image-20261125: sum up 25 November 2026 world news in one image.
//
// The entry image lives beside this program as entry.png (1024x1024,
// under 1 MiB). This program's only job is to place that exact file at
// the grader's output location, so the judge sees exactly those bytes.
//
// It runs on Node 22 with the standard library only, no network, no
// extra dependencies. Outside the grader, MAKEFUN_OUTPUT_DIR stands
// in for /output, e.g.:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const destination = join(outputDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, destination);

const size = statSync(destination).size;
console.log(`wrote ${destination} (${size} bytes)`);
