import { elemStyleTemplates } from '../../../data/layoutTemplateData';
import { LayoutProps } from '../../../types/types';
import { addElementToolsActions, borderStyleBtnsActions, loadPhoto } from '../buttonActions';
import { makeResizable, showHandles } from '../elementsActions';
import { saveLayoutProperties } from '../layoutHistory/layoutHistory';

export function setProps(element: HTMLDivElement | null) {
  let container: string;
  if (element?.classList.contains('container')) {
    container = element.innerHTML;
    container = container.replace(/cursor: grabbing/g, 'cursor: grab');
    container = container.replace(/display: block/g, 'display: none');
    const props: LayoutProps = {
      bgColor: element.style.backgroundColor,
      content: container,
    };
    saveLayoutProperties(props);
  } else {
    const parent = element?.parentElement;
    if (parent && parent.classList.contains('container')) {
      container = parent?.innerHTML;
      container = container.replace(/cursor: grabbing/g, 'cursor: grab');
      container = container.replace(/display: block/g, 'display: none');
      const props: LayoutProps = {
        bgColor: parent.style.backgroundColor,
        content: container,
      };
      saveLayoutProperties(props);
    }
  }
}

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

  const handleR: HTMLDivElement = document.createElement('div');
  handleR.classList.add('resize-handle', 'resize-handle-r');

  const handles = [handleNe, handleNw, handleSe, handleSw, handleN, handleE, handleS, handleW, handleR];

  return handles;
}

function createBorderStyleTools(element: HTMLDivElement) {
  const borderTools = document.createElement('div');
  borderTools.classList.add('border-tools');

  const borderStyles = document.createElement('div');
  borderStyles.classList.add('border-tools_styles');
  const none = document.createElement('div');
  none.classList.add('border-tools_style_none');
  const solid = document.createElement('div');
  solid.classList.add('border-tools_style_solid');
  const dashed = document.createElement('div');
  dashed.classList.add('border-tools_style_dashed');
  const dotted = document.createElement('div');
  dotted.classList.add('border-tools_style_dotted');
  const color = document.createElement('input');
  color.setAttribute('type', 'color');
  color.classList.add('border-tools_color');
  color.setAttribute('data-tooltip-border', 'цвет границы');

  borderStyles.append(none, solid, dashed, dotted, color);

  const borderWidth = document.createElement('div');
  borderWidth.classList.add('border-tools_width');
  const borderWidthTitle = document.createElement('div');
  borderWidthTitle.classList.add('border-tools_width_title');
  borderWidthTitle.innerHTML = 'Толщина границы';
  const borderWidthInput = document.createElement('input');
  borderWidthInput.classList.add('border-tools_width_input');

  borderWidth.append(borderWidthTitle, borderWidthInput);

  const borderRound = document.createElement('div');
  borderRound.classList.add('border-tools_round');
  const borderRoundTitle = document.createElement('div');
  borderRoundTitle.classList.add('border-tools_round_title');
  borderRoundTitle.innerHTML = 'Скругленность';
  const borderRoundInput = document.createElement('input');
  borderRoundInput.classList.add('border-tools_round_input');

  setTimeout(() => {
    if (element.style.borderWidth) {
      borderWidthInput.value = `${parseInt(element.style.borderWidth)}`;
    } else {
      borderWidthInput.value = '0';
    }

    if (element.style.borderRadius) {
      borderRoundInput.value = `${parseInt(element.style.borderRadius)}`;
    } else {
      borderRoundInput.value = '0';
    }
  }, 0);

  borderRound.append(borderRoundTitle, borderRoundInput);

  borderTools.append(borderStyles, borderWidth, borderRound);

  borderStyleBtnsActions(element, none, solid, dashed, dotted, color, borderWidthInput, borderRoundInput);

  return borderTools;
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

  const front = document.createElement('div');
  front.classList.add('element-tools_front');
  front.setAttribute('data-tooltip-elem', 'переместить вперед');
  const back = document.createElement('div');
  back.classList.add('element-tools_back');
  back.setAttribute('data-tooltip-elem', 'переместить назад');

  const reflect = document.createElement('div');
  reflect.classList.add('element-tools_reflect');
  reflect.setAttribute('data-tooltip-elem', 'отразить');

  const borderStyle = document.createElement('div');
  borderStyle.classList.add('border-styles_btn');

  const borderTools = createBorderStyleTools(element);
  borderStyle.appendChild(borderTools);

  borderStyle.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLDivElement) {
      if (!target.className.includes('border') || target === borderStyle) {
        borderStyle.classList.toggle('border-selected');
      }
    }

    if (borderStyle.classList.contains('border-selected')) {
      borderTools.style.display = 'flex';
    } else {
      borderTools.style.display = 'none';
    }
  });

  addElementToolsActions(element, copy, del, color, bgColor, front, back, reflect);

  if (element?.className.includes('template-img')) {
    tools.append(copy, del, front, back, reflect);
  } else if (element?.className.includes('template-shape')) {
    tools.append(copy, del, bgColor, front, back, reflect, borderStyle);
  } else {
    tools.append(copy, del, color, front, back, reflect);
  }

  setTimeout(() => {
    const container = document.querySelector('.layout-canvas');
    container?.append(tools);
  }, 0);

  tools.addEventListener('click', () => setProps(element));
  tools.addEventListener('input', () => setProps(element));
  tools.addEventListener('change', () => setProps(element));

  return tools;
}

export function createTemplateText(
  textContent: string,
  fontFamily: string,
  fontSize: string,
  color: string,
  textAlign = 'left',
) {
  const text = document.createElement('div');
  text.innerHTML = textContent;
  text.setAttribute('contentEditable', 'true');

  text.style.fontFamily = fontFamily;
  text.style.fontSize = fontSize;
  text.style.color = color;
  text.style.textAlign = textAlign;

  text.style.textDecoration = elemStyleTemplates.textDecoration;
  text.style.fontWeight = elemStyleTemplates.fontWeight;
  text.style.fontStyle = elemStyleTemplates.fontStyle;

  return text;
}

export function createTemplateTextArea(width: string, x: string, y: string): HTMLDivElement {
  const element: HTMLDivElement = document.createElement('div');
  element.classList.add('template-text');

  const handles: HTMLDivElement[] = createResizeHandle();
  const elementTools = createElementTools(element);

  element.append(...handles);

  element.style.width = width;
  element.style.left = x;
  element.style.top = y;
  element.style.zIndex = elemStyleTemplates.zIndex;
  element.style.cursor = elemStyleTemplates.cursor;
  element.style.transform = elemStyleTemplates.transform;

  makeResizable(element, handles);
  showHandles(element, handles, elementTools);

  return element;
}

export function createTemplateShape(
  width: string,
  height: string,
  x: string,
  y: string,
  border = 'none',
  borderRadius = '0',
  fill = 'transparent',
) {
  const element: HTMLDivElement = document.createElement('div');
  element.classList.add('template-element', 'template-shape');

  const handles: HTMLDivElement[] = createResizeHandle();
  const elementTools = createElementTools(element);

  element.append(...handles);

  element.style.width = width;
  element.style.height = height;
  element.style.left = x;
  element.style.top = y;
  element.style.zIndex = elemStyleTemplates.zIndex;
  element.style.cursor = elemStyleTemplates.cursor;

  element.style.borderRadius = borderRadius;

  element.style.borderColor = border;

  if (border !== 'none') {
    element.style.borderStyle = elemStyleTemplates.borderStyle;
    element.style.borderWidth = elemStyleTemplates.borderWidth;
  }

  element.style.background = fill;
  element.style.transform = elemStyleTemplates.transform;

  makeResizable(element, handles);
  showHandles(element, handles, elementTools);

  return element;
}

export function createTemplateImg(width: string, height: string, x: string, y: string, img: string): HTMLDivElement {
  let element: HTMLDivElement = document.createElement('div');
  element.classList.add('template-element', 'template-img');

  const handles: HTMLDivElement[] = createResizeHandle();
  const elementTools = createElementTools(element);

  element.append(...handles);

  if (img === elemStyleTemplates.isLoad) {
    element = loadPhoto(element);
  } else {
    element.style.background = `url(${img})`;
  }

  element.style.backgroundSize = elemStyleTemplates.bgSize;
  element.style.backgroundPosition = elemStyleTemplates.bgPosition;
  element.style.backgroundRepeat = elemStyleTemplates.bgRepeat;

  element.style.width = width;
  element.style.height = height;
  element.style.left = x;
  element.style.top = y;
  element.style.zIndex = elemStyleTemplates.zIndex;
  element.style.cursor = elemStyleTemplates.cursor;

  element.style.transform = elemStyleTemplates.transform;

  makeResizable(element, handles);
  showHandles(element, handles, elementTools);

  return element;
}
