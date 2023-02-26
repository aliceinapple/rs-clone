import { createHtmlElement } from '../../utils';
import { createLogInButton } from '../../components/buttons/index';
import { createlinkForBackOnMainPage } from '../../components/header/index';
import Page from '../../components/pageTemplates';

const createDesignPageHeader = () => {
  const header = createHtmlElement('header', 'header');
  const headerWrapper = createHtmlElement('div', 'header__wrapper');
  const controlBlock = createHtmlElement('div', 'header__control-block');
  const link = createlinkForBackOnMainPage();
  const saveBlock = createHtmlElement('div', 'paint-header__save-block');
  const saveIco = createHtmlElement('div', 'save-block__ico');
  saveBlock.append(saveIco);
  const removeBlock = createHtmlElement('div', 'paint-header__remove-block');
  const removeIco = createHtmlElement('div', 'remove-block__ico');
  removeBlock.append(removeIco);

  controlBlock.append(link, saveBlock, removeBlock);

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

const createToolsPanel = () => {
  const container = createHtmlElement('div', 'paint-block__tools-container');
  const containerOptions = createHtmlElement('div', 'paint-block__tools');
  const containerTop = createHtmlElement('div', 'paint-block__tools-top');
  const containerBottom = createHtmlElement('div', 'paint-block__tools-bottom');

  const pencil = createHtmlElement('div', 'paint-block__tools-pencil');
  pencil.classList.add('paint-block__toolset');
  pencil.setAttribute('id', 'brush');

  const eraser = createHtmlElement('div', 'paint-block__tools-eraser');
  eraser.classList.add('paint-block__toolset');
  eraser.setAttribute('id', 'eraser');

  const spray = createHtmlElement('div', 'paint-block__tools-spray');
  spray.classList.add('paint-block__toolset');
  spray.setAttribute('id', 'spray');

  const pouring = createHtmlElement('div', 'paint-block__tools-pouring');
  pouring.classList.add('paint-block__toolset');
  pouring.setAttribute('id', 'pouring');

  const circle = createHtmlElement('div', 'paint-block__tools-circle');
  circle.classList.add('paint-block__toolset');
  circle.setAttribute('id', 'circle');

  const square = createHtmlElement('div', 'paint-block__tools-square');
  square.classList.add('paint-block__toolset');
  square.setAttribute('id', 'rectangle');

  const line = createHtmlElement('div', 'paint-block__tools-line');
  line.classList.add('paint-block__toolset');
  line.setAttribute('id', 'line');

  const polygon = createHtmlElement('div', 'paint-block__tools-polygon');
  polygon.classList.add('paint-block__toolset');
  polygon.setAttribute('id', 'polygon');

  const colorContainer = createHtmlElement('div', 'paint-block__tools-color-container');
  const titleColorCont = createHtmlElement('p', 'paint-block__tools-title');
  titleColorCont.innerHTML = 'Цвет';
  const backgroundColor = document.createElement('div');
  backgroundColor.classList.add('brush-color-block');
  const colorInput = document.createElement('input');
  colorInput.setAttribute('type', 'color');
  colorInput.setAttribute('id', 'allcolor');
  colorInput.classList.add('paint-block__tools-allColor');
  colorInput.value = 'black';
  backgroundColor.append(colorInput);
  colorContainer.append(titleColorCont, backgroundColor);
  
  const titleFigure = createHtmlElement('p', 'paint-block__tools-title');
  titleFigure.innerHTML = 'Фигуры';
  const titleTools = createHtmlElement('p', 'paint-block__tools-title');
  titleTools.innerHTML = 'Инструменты';
  const titleWidth = createHtmlElement('p', 'paint-block__tools-title');
  titleWidth.innerHTML = 'Кисть';
  const widthContainer = createHtmlElement('div', 'paint-block__tools-width-container');
  const titleWidthCont = createHtmlElement('p', 'paint-block__tools-title');
  titleWidthCont.innerHTML = 'Толщина';
  const widthPencil = createHtmlElement('select', 'paint-block__tools-width');
  widthPencil.setAttribute('id', 'width');
  const widthOptions = [2, 4, 8, 12, 16, 20, 25, 40, 60, 100];
  widthOptions.forEach((width => {
    const item = createHtmlElement('option', 'bruches-item');
    item.innerHTML = `${width} px`;
    item.setAttribute('value', `${width}`);
    widthPencil.append(item);
  }));
  widthContainer.append(titleWidthCont, widthPencil);
  containerTop.append(pencil, spray, pouring, eraser);
  containerBottom.append(line, square, circle, polygon);

  containerOptions.append(containerTop, titleFigure, containerBottom);
  container.append(titleTools, containerOptions, titleWidth, widthContainer, colorContainer);
  return container;
};

const createPaintBlock = () => {
  const container = createHtmlElement('div', 'paint-page__paint-block');
  const wrapper = createHtmlElement('div', 'draw-block__wrapper');

  const toolsPanel = createToolsPanel();

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.classList.add('paint-canvas');
  canvas.setAttribute('id', 'canvas');
  if (window.innerWidth < window.innerHeight) {
    canvas.width = Number(`${window.innerWidth / 2 + 100}`);
    canvas.height = Number(`${window.innerHeight / 2 + 50}`);
  } else if (window.innerWidth > window.innerHeight && window.innerWidth - window.innerHeight < 200) {
    canvas.width = Number(`${window.innerWidth / 2 + 200}`);
    canvas.height = Number(`${window.innerHeight / 2 + 50}`);
  } else {
    canvas.width = Number(`${window.innerWidth / 2 + 150}`);
    canvas.height = Number(`${window.innerHeight / 2 + 50}`);
  }
  wrapper.append(toolsPanel, canvas);

  container.append(wrapper);
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

