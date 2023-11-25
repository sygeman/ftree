import { mkdir, exists } from "node:fs/promises";
import { getDataByLink } from "./get-data-by-link";
import { importAvatar } from "./import-avatar";
import { formatTree } from "./format-tree";

export const importData = async (url: string) => {
  console.log("Start data import");
  const p1 = performance.now();
  const data = await getDataByLink(url);
  const dataFolder = `./data`;
  const dataTreeFolder = `${dataFolder}/${data._id}`;
  const dataTreeAvatarsFolder = `${dataFolder}/${data._id}/avatars`;

  const writeJSON = (name: string, data: any) =>
    Bun.write(`${dataTreeFolder}/${name}.json`, JSON.stringify(data));

  if (!(await exists(dataFolder))) {
    await mkdir(dataFolder);
  }

  if (!(await exists(dataTreeFolder))) {
    await mkdir(dataTreeFolder);
  }

  if (!(await exists(dataTreeAvatarsFolder))) {
    await mkdir(dataTreeAvatarsFolder);
  }

  const importAvatars = data.people.map(async ({ _id, avatar }) =>
    importAvatar(avatar, `${dataTreeAvatarsFolder}/${_id}.png`)
  );

  await Promise.all([
    ...importAvatars,
    writeJSON(
      "people",
      data.people.map(({ _id, firstName, lastName }) => ({
        _id,
        firstName,
        lastName,
      }))
    ),
    writeJSON("metadata", {
      _id: data._id,
      title: data.title.trim(),
      lastPublishDate: data.lastPublishDate,
    }),
    writeJSON("tree", formatTree(data.data)),
  ]);

  const p2 = performance.now();
  console.log("End data import in", ((p2 - p1) / 1000).toFixed(2), "s");
};
