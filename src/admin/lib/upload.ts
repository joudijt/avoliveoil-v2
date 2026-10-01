/**
 * Browser-side image preparation before upload (spec §13.6): apply EXIF orientation,
 * cap the long side at 2400 px, keep PNG only when the picture really has transparency
 * (cut-out bottles), otherwise JPEG q 0.9. Phones produce 12–48 MP photos; shrinking
 * here keeps uploads fast on mobile data and well under the server's 15 MB / 40 MP caps.
 */
import { api, type MediaItem } from '../api';

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const MAX_SIDE = 2400;
export const MAX_BYTES = 15 * 1024 * 1024;

export class UploadProblem extends Error {}

export interface PreparedImage {
  blob: Blob;
  name: string;
  hasAlpha: boolean;
  width: number;
  height: number;
}

function baseName(name: string) {
  return (name.replace(/\.[^.]+$/, '') || 'photo').slice(0, 80);
}

export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new UploadProblem(`“${file.name}” is not a photo we can use. Please choose a JPG, PNG or WebP file.`);
  }
  let bmp: ImageBitmap;
  try {
    bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new UploadProblem(`“${file.name}” could not be opened. It may be damaged — try exporting it again as JPG or PNG.`);
  }
  const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
  const width = Math.max(1, Math.round(bmp.width * scale));
  const height = Math.max(1, Math.round(bmp.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new UploadProblem('Your browser could not prepare the photo. Please try another browser.');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bmp, 0, 0, width, height);
  bmp.close();

  let hasAlpha = false;
  if (file.type !== 'image/jpeg') {
    const data = ctx.getImageData(0, 0, width, height).data;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 250) {
        hasAlpha = true;
        break;
      }
    }
  }
  const type = hasAlpha ? 'image/png' : 'image/jpeg';
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, type, 0.9));
  if (!blob) throw new UploadProblem('Your browser could not prepare the photo. Please try another browser.');
  if (blob.size > MAX_BYTES) throw new UploadProblem(`“${file.name}” is still larger than 15 MB after resizing. Please choose a smaller picture.`);
  return { blob, name: baseName(file.name) + (hasAlpha ? '.png' : '.jpg'), hasAlpha, width, height };
}

export async function uploadImage(file: File, onProgress?: (pct: number) => void): Promise<MediaItem> {
  const prepared = await prepareImage(file);
  const item = await api.uploadMedia(prepared.blob, prepared.name, onProgress);
  return { ...item, hasAlpha: item.hasAlpha ?? prepared.hasAlpha };
}
