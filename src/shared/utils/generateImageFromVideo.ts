import { v4 as uuid } from 'uuid';

const convertDataURLToFile = (url: string) => {
  const byteString = atob(url.split(',')[1]);
  const mimeString = url.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });

  const fileName = `video_thumbnail-${uuid()}.png`;

  return new File([blob], fileName, { type: 'image/png' });
};

export const generateThumbnailFromVideo = (video: HTMLVideoElement): File => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  ctx?.drawImage(video, 0, 0, width, height);

  return convertDataURLToFile(canvas.toDataURL());
};
