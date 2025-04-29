import fs from 'fs/promises';
import path from 'path';

export const loadJsonFromFile = async <T = any>(absolutePath: string): Promise<T> => {
  const filePath = path.resolve(__dirname, absolutePath);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
};