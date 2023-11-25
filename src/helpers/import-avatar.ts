import { SOURCE_AVATARS_URL } from "../config";

export const importAvatar = async (avatar: string, path: string) => {
  const file = Bun.file(path);
  if (file.size > 0) return;

  const image = await fetch(`${SOURCE_AVATARS_URL}${avatar}`);
  const blob = await image.blob();

  await Bun.write(path, blob);
};
