import { mkdir, exists } from "node:fs/promises";
import { getDataByLink } from "./get-data-by-link";
import { importAvatar } from "./import-avatar";
import { formatTree } from "./format-tree";
import { filesize } from "filesize";
import { SOURCE_AVATARS_URL } from "../config";

export const importData = async (url: string) => {
  console.log("Start data import");
  const p1 = performance.now();
  const { data, size: dataSize } = await getDataByLink(url);
  const dataFolder = `./data`;
  const outputPath = `${dataFolder}/${data._id}.json`;

  if (!(await exists(dataFolder))) {
    await mkdir(dataFolder);
  }

  let inputAvatarsSize = 0;

  const importPeople = await Promise.all(
    data.people.map(async (people) => {
      const avatar = await importAvatar(
        `${SOURCE_AVATARS_URL}${people.avatar}`,
        people._id,
        "png",
        "webp"
      );

      inputAvatarsSize += avatar.inputSize;

      return {
        id: people._id,
        firstName: people.firstName.trim(),
        lastName: people.lastName.trim(),
        avatar: avatar.base64,
      };
    })
  );

  const outputData = {
    _id: data._id,
    title: data.title.trim(),
    lastPublishDate: data.lastPublishDate,
    tree: formatTree(data.data),
    people: importPeople,
  };

  await Bun.write(outputPath, JSON.stringify(outputData));

  const inputSize = dataSize + inputAvatarsSize;
  const outputSize = Bun.file(outputPath).size;

  const p2 = performance.now();
  const duration = ((p2 - p1) / 1000).toFixed(2);

  console.log(
    `End data import in ${duration}s`,
    `[${filesize(inputSize)} -> ${filesize(outputSize)}]`,
    `(${(inputSize / outputSize).toFixed(0)}x smaller)`
  );

  return outputData;
};
