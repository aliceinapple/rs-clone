import html2canvas from '../../../node_modules/html2canvas';
import { IImage } from '../../types/interfaces';

export const imageSaveSrc = {} as IImage; //

export function saveImage(image: HTMLImageElement) {
  const link = document.createElement('a');

  link.setAttribute('href', image.src);
  link.setAttribute('download', 'canvasImage');
  link.click();
}
  
export function getImage(canvas: HTMLCanvasElement) {
  const imageData = canvas.toDataURL();
  const image = new Image();
  image.src = imageData;
  return image;
}

export function saveCanvasAsImageFile(file: HTMLCanvasElement) {
  const image = getImage(file);
  imageSaveSrc.image = image;
  //saveImage(image);
}

export function convertationToCanvas(container: string) {
  html2canvas(document.querySelector(`#${container}`) as HTMLDivElement).then((canvas) => {
    saveCanvasAsImageFile(canvas);
  });
}

function saveLayoutAsImageFile(file: HTMLCanvasElement) {
  const image = getImage(file);
  imageSaveSrc.image = image;
  saveImage(image);
}

export function convertationLayoutToCanvas(container: string) {
  html2canvas(document.querySelector(container) as HTMLDivElement).then((canvas) => {
    saveLayoutAsImageFile(canvas);
  });
}
