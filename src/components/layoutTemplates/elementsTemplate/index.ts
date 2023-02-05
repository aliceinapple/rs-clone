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

  const handleN: HTMLDivElement = document.createElement('div');
  handleN.classList.add('resize-handle', 'resize-handle-n');

  const handleE: HTMLDivElement = document.createElement('div');
  handleE.classList.add('resize-handle', 'resize-handle-e');

  const handleS: HTMLDivElement = document.createElement('div');
  handleS.classList.add('resize-handle', 'resize-handle-s');

  const handleW: HTMLDivElement = document.createElement('div');
  handleW.classList.add('resize-handle', 'resize-handle-w');

  const handles = [handleNe, handleNw, handleSe, handleSw, handleN, handleE, handleS, handleW];

  return handles;
}

export function createTemplateText(textContent: string) {
  const text = document.createElement('div');
  text.style.height = '100%';
  text.innerHTML = textContent;
  text.setAttribute('contentEditable', 'true');

  return text;
}

export function createTemplateTextArea(
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

  const handles: HTMLDivElement[] = createResizeHandle();

  text.append(...handles);

  text.style.width = width;
  text.style.fontFamily = fontFamily;
  text.style.fontSize = fontSize;
  text.style.color = color;
  text.style.left = x;
  text.style.top = y;

  if (textAlign) {
    text.style.textAlign = textAlign;
  }

  makeResizable(text, handles);
  showHandles(text, handles);

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
  element.style.backgroundSize = '100% 100%';
  element.style.backgroundRepeat = 'no-repeat';

  element.style.width = width;
  element.style.height = height;
  element.style.left = x;
  element.style.top = y;

  makeResizable(element, handles);
  showHandles(element, handles);

  return element;
}
