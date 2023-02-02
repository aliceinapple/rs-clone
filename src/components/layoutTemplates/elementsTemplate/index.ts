import { makeResizable, showHandles } from '../elementsActions';

export const defaultTexsts = {
  title: 'Добавить заголовок',
  info: `123 - 456 - 7890
         hello@reallygreatsite.com
         Добавить заголовок`,
};

function createResizeHandle(): HTMLDivElement[] {
  const handleNw: HTMLDivElement = document.createElement('div');
  handleNw.classList.add('resize-handle', 'resize-handle-nw');

  const handleNe: HTMLDivElement = document.createElement('div');
  handleNe.classList.add('resize-handle', 'resize-handle-ne');

  const handleSw: HTMLDivElement = document.createElement('div');
  handleSw.classList.add('resize-handle', 'resize-handle-sw');

  const handleSe: HTMLDivElement = document.createElement('div');
  handleSe.classList.add('resize-handle', 'resize-handle-se');

  const handles = [handleNe, handleNw, handleSe, handleSw];

  return handles;
}

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
  text.classList.add('template-text');

  text.setAttribute('contentEditable', 'true');

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
  element.classList.add('template-element');

  const handles: HTMLDivElement[] = createResizeHandle();

  element.append(...handles);

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

  makeResizable(element, handles);
  showHandles(element, handles);

  return element;
}

export function createTemplateImg(width: string, height: string, x: string, y: string, img: string): HTMLDivElement {
  const element: HTMLDivElement = document.createElement('div');
  element.classList.add('template-element');

  const handles: HTMLDivElement[] = createResizeHandle();

  element.append(...handles);

  element.style.background = img;
  element.style.backgroundSize = 'contain';
  element.style.backgroundRepeat = 'no-repeat';

  element.style.width = width;
  element.style.height = height;
  element.style.left = x;
  element.style.top = y;

  makeResizable(element, handles);
  showHandles(element, handles);

  return element;
}
