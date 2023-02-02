import { resize } from '../elementsActions';

export const defaultTexsts = {
  title: 'Добавить заголовок',
  info: `123 - 456 - 7890
         hello@reallygreatsite.com
         Добавить заголовок`,
};

export function createTemplateText(
  width: string,
  fontFamily: string,
  fontSize: string,
  color: string,
  x: string,
  y: string,
  textAlign?: string,
): HTMLDivElement {
  const text: HTMLDivElement = document.createElement('div');
  text.setAttribute('contentEditable', 'true');
  text.style.position = 'absolute';
  text.style.width = width;
  text.style.fontFamily = fontFamily;
  text.style.fontSize = fontSize;
  text.style.color = color;
  text.style.left = x;
  text.style.top = y;

  if (textAlign) {
    text.style.textAlign = textAlign;
  }

  return text;
}

export function createTemplateShape(
  width: string,
  height: string,
  x: string,
  y: string,
  border?: string,
  borderRadius?: string,
) {
  const element: HTMLDivElement = document.createElement('div');

  const handle: HTMLDivElement = document.createElement('div');
  handle.style.width = width;
  handle.style.height = height;
  handle.style.border = '2px solid red';
  handle.style.display = 'none';

  element.appendChild(handle);

  element.style.position = 'absolute';
  element.style.width = width;
  element.style.height = height;
  element.style.left = x;
  element.style.top = y;

  if (borderRadius) {
    element.style.borderRadius = borderRadius;
  }

  if (border) {
    element.style.border = border;
  }

  resize(element, handle);
  return element;
}

export function createTemplateImg(width: string, height: string, x: string, y: string, img: string): HTMLDivElement {
  const element: HTMLDivElement = document.createElement('div');

  const handle: HTMLDivElement = document.createElement('div');
  handle.style.width = width;
  handle.style.height = height;
  handle.style.border = '2px solid red';

  element.appendChild(handle);

  element.style.background = img;
  element.style.backgroundSize = 'contain';
  element.style.backgroundRepeat = 'no-repeat';
  element.style.position = 'absolute';
  element.style.width = width;
  element.style.height = height;
  element.style.left = x;
  element.style.top = y;

  resize(element, handle);
  return element;
}
