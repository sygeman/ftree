import { spawn } from "node:child_process";
import { SOURCE_AVATARS_URL } from "../config";
import { unlink } from "node:fs/promises";

export const importAvatar = async (
  avatar: string,
  path: string,
  inputType: string,
  outputType: string
) => {
  const inputPath = `${path}.${inputType}`;
  const outputPath = `${path}.${outputType}`;

  const image = await fetch(`${SOURCE_AVATARS_URL}${avatar}`);
  const blob = await image.blob();
  await Bun.write(inputPath, blob);
  const inputSize = Bun.file(inputPath).size;

  const proc = spawn("ffmpeg", ["-i", inputPath, outputPath], {
    shell: true,
    env: { ...process.env },
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

  return { base64, inputSize, outputSize };
};
