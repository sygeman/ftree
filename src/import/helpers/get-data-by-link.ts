import { ImportDataRaw } from "../types/import-data.type";
import { CACHE_FOLDER, SOURCE_APP_URL } from "../config";

export const getDataByLink = async (
  url: string
): Promise<{ data: ImportDataRaw; size: number }> => {
  const id = url.match(/public\/([^/]+)/)?.[1];

  if (!id) {
    throw new Error("Id not found");
  }

  const cacheKey = `data-${id}`;
  const cache = Bun.file(`${CACHE_FOLDER}/${cacheKey}.json`);

  if (cache.size === 0) {
    const dataURL = `${SOURCE_APP_URL}api/published/${id}`;
    const query = await fetch(dataURL);
    const data = await query.json();
    await Bun.write(`${CACHE_FOLDER}/${cacheKey}.json`, JSON.stringify(data));
    return data;
  }

  const data = await cache.json();

  return { data, size: cache.size };
};
