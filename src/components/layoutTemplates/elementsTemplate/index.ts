import { addElementToolsActions, makeResizable, showHandles } from '../elementsActions';

let idNumber = 0;

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

export function createElementTools(element: HTMLDivElement): HTMLDivElement {
  const tools = document.createElement('div');
  tools.classList.add('element-tools');

  const copy = document.createElement('div');
  copy.classList.add('element-tools_copy');
  copy.setAttribute('data-tooltip-elem', 'дублировать');

  const del = document.createElement('div');
  del.classList.add('element-tools_delete');
  del.setAttribute('data-tooltip-elem', 'удалить');

  const color = document.createElement('input');
  color.setAttribute('type', 'color');
  color.classList.add('element-tools_color');
  color.setAttribute('data-tooltip-elem', 'цвет');

  const bgColor = document.createElement('input');
  bgColor.setAttribute('type', 'color');
  bgColor.classList.add('element-tools_bgColor');
  bgColor.setAttribute('data-tooltip-elem', 'заливка');
  bgColor.value = '#FFFFFF';

  const front = document.createElement('div');
  front.classList.add('element-tools_front');
  front.setAttribute('data-tooltip-elem', 'переместить вперед');
  const back = document.createElement('div');
  back.classList.add('element-tools_back');
  back.setAttribute('data-tooltip-elem', 'переместить назад');

  addElementToolsActions(element, copy, del, color, bgColor, front, back);

  if (element.className.includes('template-img')) {
    tools.append(copy, del, front, back);
  } else if (element.className.includes('template-shape')) {
    tools.append(copy, del, color, bgColor, front, back);
  } else {
    tools.append(copy, del, color, front, back);
  }

  return tools;
}

export function createTemplateText(
  textContent: string,
  fontFamily: string,
  fontSize: string,
  color: string,
  textAlign?: string,
) {
  const text = document.createElement('div');
  text.style.height = '100%';
  text.innerHTML = textContent;
  text.setAttribute('contentEditable', 'true');

  text.style.fontFamily = fontFamily;
  text.style.fontSize = fontSize;
  text.style.color = color;

  if (textAlign) {
    text.style.textAlign = textAlign;
  }

  return text;
}

export function createTemplateTextArea(width: string, x: string, y: string): HTMLDivElement {
  const text: HTMLDivElement = document.createElement('div');
  text.classList.add('template-text');

  const handles: HTMLDivElement[] = createResizeHandle();
  const elementTools = createElementTools(text);

  text.append(...handles, elementTools);

  text.style.width = width;
  text.style.left = x;
  text.style.top = y;
  text.style.zIndex = '2';

  makeResizable(text, handles);
  showHandles(text, handles, elementTools);

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
  element.classList.add('template-element', 'template-shape');

  element.id = String(idNumber);
  idNumber++;

  const handles: HTMLDivElement[] = createResizeHandle();
  const elementTools = createElementTools(element);

  element.append(...handles, elementTools);

  element.style.width = width;
  element.style.height = height;
  element.style.left = x;
  element.style.top = y;
  element.style.zIndex = '2';

  if (borderRadius) {
    element.style.borderRadius = borderRadius;
  }

  if (border) {
    element.style.border = border;
  }

  makeResizable(element, handles);
  showHandles(element, handles, elementTools);

  return element;
}

export function createTemplateImg(width: string, height: string, x: string, y: string, img: string): HTMLDivElement {
  const element: HTMLDivElement = document.createElement('div');
  element.classList.add('template-element', 'template-img');

  const handles: HTMLDivElement[] = createResizeHandle();
  const elementTools = createElementTools(element);

  element.append(...handles, elementTools);

  element.style.background = img;
  element.style.backgroundSize = '100% 100%';
  element.style.backgroundRepeat = 'no-repeat';

  element.style.width = width;
  element.style.height = height;
  element.style.left = x;
  element.style.top = y;
  element.style.zIndex = '2';

  makeResizable(element, handles);
  showHandles(element, handles, elementTools);

  return element;
}
