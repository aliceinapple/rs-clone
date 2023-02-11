import { createHtmlElement } from '../../utils';
import { createLogInButton } from '../../components/buttons/index';
import { createlinkForBackOnMainPage } from '../../components/header/index';
import Page from '../../components/pageTemplates';
import {
  checkTextStyle,
  fontAlignBtnsActions,
  fontSizeBtnsActions,
  fontStyleBtnsActions,
  targetTextElement,
} from '../../components/layoutTemplates/elementsActions';
import { fontFamilyList } from '../../data/layoutTemplateData';

const createDesignPageHeader = () => {
  const header = createHtmlElement('header', 'header');
  const headerWrapper = createHtmlElement('div', 'header__wrapper');

  const controlBlock = createHtmlElement('div', 'header__control-block');
  const link = createlinkForBackOnMainPage();
  const arrowBlock = createHtmlElement('div', 'design-header__arrow-block');
  const arrowBack = createHtmlElement('div', 'arrow-block__arrow-back');
  const arrowForward = createHtmlElement('div', 'arrow-block__arrow-forward');
  arrowBlock.append(arrowBack, arrowForward);
  const saveBlock = createHtmlElement('div', 'design-header__save-block');
  const saveIco = createHtmlElement('div', 'save-block__ico');
  saveBlock.append(saveIco);
  const removeBlock = createHtmlElement('div', 'design-header__remove-block');
  const removeIco = createHtmlElement('div', 'remove-block__ico');
  removeBlock.append(removeIco);

  controlBlock.append(link, arrowBlock, saveBlock, removeBlock);

  const title = createHtmlElement('p', 'header__title');
  title.textContent = 'Рисование';

  const btnBlock = createHtmlElement('div', 'header__btn-block');
  const btn = createLogInButton();
  btnBlock.append(btn);

  headerWrapper.append(controlBlock, title, btnBlock);
  header.append(headerWrapper);
  return header;
};

export function createFontFamilyOptions(select: HTMLSelectElement, fontFamily: string[]) {
  for (let i = 0; i < fontFamily.length; i++) {
    const option: HTMLOptionElement = document.createElement('option');
    option.textContent = fontFamily[i];
    select.append(option);
  }
}

const createPainControlPanel = () => {
  const container = createHtmlElement('div', 'paint-block__control-panel');

  const select: HTMLSelectElement = document.createElement('select');
  select.classList.add('select');

  createFontFamilyOptions(select, fontFamilyList);

  select.addEventListener('change', () => {
    if (targetTextElement) targetTextElement.style.fontFamily = select.value;
  });

  const fontSizeBlock = createHtmlElement('div', 'font-size-block');
  const fontSizeInput = createHtmlElement('input', 'font-size-block__input') as HTMLInputElement;
  fontSizeInput.value = '16';
  const fontSizePlus = createHtmlElement('div', 'font-size-block__plus') as HTMLDivElement;
  fontSizePlus.setAttribute('data-tooltip', 'увеличить размер шрифта');
  fontSizePlus.textContent = '+';
  const fontSizeMinus = createHtmlElement('div', 'font-size-block__minus') as HTMLDivElement;
  fontSizeMinus.setAttribute('data-tooltip', 'уменьшить размер шрифта');
  fontSizeMinus.textContent = '-';

  fontSizeBlock.append(fontSizeMinus, fontSizeInput, fontSizePlus);

  const fontStyleBlock = createHtmlElement('div', 'font-style-block');
  const underlined = createHtmlElement('div', 'font-style-block__underlined') as HTMLDivElement;
  underlined.setAttribute('data-tooltip', 'подчеркнутый');
  const bold = createHtmlElement('div', 'font-style-block__bold') as HTMLDivElement;
  bold.setAttribute('data-tooltip', 'жирный');
  const italic = createHtmlElement('div', 'font-style-block__italic') as HTMLDivElement;
  italic.setAttribute('data-tooltip', 'курсив');
  fontStyleBlock.append(underlined, bold, italic);

  const line = createHtmlElement('div', 'vertical-line');

  const textAlidnBlock = createHtmlElement('div', 'text-align-block');
  const right = createHtmlElement('div', 'text-align-block__right') as HTMLDivElement;
  right.setAttribute('data-tooltip', 'выровнять по правому краю');
  const center = createHtmlElement('div', 'text-align-block__center') as HTMLDivElement;
  center.setAttribute('data-tooltip', 'выровнять по центру');
  const left = createHtmlElement('div', 'text-align-block__left') as HTMLDivElement;
  left.setAttribute('data-tooltip', 'выровнять по левому краю');
  
  const backgroundColor = document.createElement('div');
  backgroundColor.classList.add('background-color-block');
  const colorInput = document.createElement('input');
  colorInput.setAttribute('data-tooltip', 'цвет фона');
  colorInput.setAttribute('type', 'color');
  colorInput.classList.add('background-color-block-input');
  colorInput.value = '#ffffff';

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target === targetTextElement) {
      checkTextStyle(targetTextElement, underlined, bold, italic, fontSizeInput, select);
    }
  });

  colorInput.addEventListener('input', () => {
    const background = document.querySelector('.container');
    if (background && background instanceof HTMLDivElement) background.style.background = colorInput.value;
  });

  fontSizeBtnsActions(fontSizePlus, fontSizeMinus, fontSizeInput);
  fontStyleBtnsActions(underlined, bold, italic);
  fontAlignBtnsActions(left, right, center);

  backgroundColor.appendChild(colorInput);

  textAlidnBlock.append(left, center, right);

  container.append(select, fontSizeBlock, fontStyleBlock, line, textAlidnBlock, backgroundColor);
  return container;
};


const createToolsPanel = () => {
  const container = createHtmlElement('div', 'paint-block__tools');

  const pencil = createHtmlElement('div', 'paint-block__tools-pencil');
  pencil.setAttribute('data-tooltip', 'карандаш');

  const eraser = createHtmlElement('div', 'paint-block__tools-eraser');
  eraser.setAttribute('data-tooltip', 'ластик');

  const spray = createHtmlElement('div', 'paint-block__tools-spray');
  spray.setAttribute('data-tooltip', 'спрей');

  const pouring = createHtmlElement('div', 'paint-block__tools-pouring');
  pouring.setAttribute('data-tooltip', 'заливка');

  const allcolor = createHtmlElement('input', 'paint-block__tools-allColor');
  allcolor.setAttribute('data-tooltip', 'цвет кисти');
  allcolor.setAttribute('type', 'color');

  const widthPencil = createHtmlElement('select', 'paint-block__tools-width');
  const width = [2, 4, 8, 12, 16, 20, 25, 40, 60, 100];
  width.forEach((element => {
    const item = createHtmlElement('option', 'bruches-item');
    item.innerHTML = String(element);
    widthPencil.append(item);
  }));

  container.append(pencil, eraser, spray, pouring, widthPencil, allcolor);
  return container;
};

const createPaintBlock = () => {
  const container = createHtmlElement('div', 'paint-page__paint-block');
  const controlPanel = createPainControlPanel();
  const wrapper = createHtmlElement('div', 'draw-block__wrapper');

  const toolsPanel = createToolsPanel();

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.classList.add('paint-canvas');
  canvas.setAttribute('id', 'canvas');
  canvas.width = 700;
  canvas.height = 500;

  wrapper.append(toolsPanel, canvas);

  container.append(controlPanel, wrapper);
  return container;
};

const createDesignePageMainContent = () => {
  const container = createHtmlElement('div', 'designe-page__contetn');
  const paintBlock = createPaintBlock();

  container.append(paintBlock);
  return container;
};

export class PaintPage extends Page {

  private createContent() {
    const header = createDesignPageHeader();
    const main = createDesignePageMainContent();

    return {
      header,
      main,
    };
  }

  render() {
    const content = this.createContent();
    this.container.append(content.header, content.main);
    return this.container;
  }
}

