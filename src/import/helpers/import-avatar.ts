import { spawn } from "node:child_process";
import { CACHE_FOLDER } from "../config";
import { unlink } from "node:fs/promises";

export const importAvatar = async (
  url: string,
  name: string,
  inputType: string,
  outputType: string
) => {
  const path = `./data/${name}`;
  const cacheKey = `avatar-${name}`;
  const cache = Bun.file(`${CACHE_FOLDER}/${cacheKey}.json`);

  if (cache.size === 0) {
    const inputPath = `${path}.${inputType}`;
    const outputPath = `${path}.${outputType}`;

    const image = await fetch(url);
    const blob = await image.blob();
    await Bun.write(inputPath, blob);
    const inputSize = Bun.file(inputPath).size;

    const proc = spawn("ffmpeg", ["-i", inputPath, outputPath], {
      shell: true,
    });

    await new Promise((resolve, reject) => {
      proc.on("exit", (code) => {
        if (code === 0) return resolve(true);
        reject(code);
      });
    });

    await unlink(inputPath);

    const webpFile = Bun.file(outputPath);
    const outputSize = webpFile.size;

    const base64 = Buffer.from(await webpFile.arrayBuffer()).toString("base64");

    await unlink(outputPath);

    await Bun.write(
      `${CACHE_FOLDER}/${cacheKey}.json`,
      JSON.stringify({
        base64,
        inputSize,
        outputSize,
      })
    );

    return { base64, inputSize, outputSize };
  }

  return await cache.json();
};
