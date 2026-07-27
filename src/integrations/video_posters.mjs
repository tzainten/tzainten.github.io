import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import ffmpegPath from 'ffmpeg-static';

const run = promisify(execFile);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function isStale(video, poster) {
  try {
    const [v, p] = await Promise.all([stat(video), stat(poster)]);
    return v.mtimeMs > p.mtimeMs;
  } catch {
    return true;
  }
}

export default function videoPosters({ dir = 'public', seek = '00:00:00' } = {}) {
  return {
    name: 'video-posters',
    hooks: {
      'astro:config:setup': async ({ logger }) => {
        for await (const file of walk(dir)) {
          if (!/\.(mp4|webm|mov)$/i.test(file)) continue;
          const poster = file.replace(/\.\w+$/, '.jpg');
          if (!(await isStale(file, poster))) continue;

          logger.info(`generating poster for ${path.basename(file)}`);
          await run(ffmpegPath, [
            '-y', '-ss', seek, '-i', file,
            '-frames:v', '1', '-q:v', '3',
            poster,
          ]);
        }
      },
    },
  };
}