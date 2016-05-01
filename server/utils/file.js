import path from 'path';

export function getPathForNewFile({originalname}, extension='png') {
  // Get the filename without extension.
  // Inaccurate if the filename has multiple dots, but that's fine.
  const [filename] = originalname.split('.');
  const newFilename = `${Date.now()}_${filename}.${extension}`;
  return path.join(__dirname, `../../uploads/${newFilename}`);
}
