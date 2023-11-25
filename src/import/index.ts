import { mkdir, exists } from "node:fs/promises";
import { importData } from "./helpers/import-data";
import { CACHE_FOLDER } from "./config";

if (!(await exists(CACHE_FOLDER))) {
  await mkdir(CACHE_FOLDER);
}

await importData(
  "https://www.theplumtreeapp.com/public/641f24449a150cba09f92d5b"
);
