import { createHtmlElement } from '../../utils';
import { createLogInButton } from '../../components/buttons/index';
import { createlinkForBackOnMainPage } from '../../components/header/index';
import Page from '../../components/pageTemplates';
import { TypesDesigne } from '../../types/enums';
import { businessCardsPanelTemplates } from '../../components/layoutTemplates';
import { targetTextElement } from '../../components/layoutTemplates/elementsActions';

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
  title.textContent = 'Дизайн - Business card';

  const btnBlock = createHtmlElement('div', 'header__btn-block');
  const btn = createLogInButton();
  btnBlock.append(btn);

  headerWrapper.append(controlBlock, title, btnBlock);
  header.append(headerWrapper);
  return header;
};

const createSideMenuElement = (classBlock: string, classIco: string, classTest: string, text: string) => {
  const block = createHtmlElement('div', `side-menu__${classBlock}`);
  const ico = createHtmlElement('div', `side-menu__${classIco}`);
  const title = createHtmlElement('p', `side-menu__${classTest}`);
  title.textContent = text;

  block.append(ico, title);
  return block;
};

const createSideMenu = () => {
  const container = createHtmlElement('div', 'designe-page__side-menu');

  const designBlock = createSideMenuElement('designe-block', 'ico-designe', 'designe-block-title', 'Дизайн');
  const elementBlock = createSideMenuElement('element-block', 'ico-element', 'element-block-title', 'Элемент');
  const textBlock = createSideMenuElement('text-block', 'ico-text', 'text-block-title', 'Текст');

  container.append(designBlock, elementBlock, textBlock);
  return container;
};

const createHidingPanelForPostcard = () => {
  const container = createHtmlElement('div', 'hiding-panel__postcard-block');

  return container;
};

const createHidingPanelForVisitCars = () => {
  const container = createHtmlElement('div', 'hiding-panel__visit-card-block');

  container.append(businessCardsPanelTemplates);

  return container;
};

const createHidingPanelForResume = () => {
  const container = createHtmlElement('div', 'hiding-panel__resume-block');

  return container;
};

const createHidingPanel = (typeDesigne: string) => {
  const container = createHtmlElement('div', 'designe-page__hiding-panel');

  if (typeDesigne === TypesDesigne.Postcard) {
    const content = createHidingPanelForPostcard();
    container.append(content);
  } else if (typeDesigne === TypesDesigne.VisitCard) {
    const content = createHidingPanelForVisitCars();
    container.append(content);
  } else if (typeDesigne === TypesDesigne.Resume) {
    const content = createHidingPanelForResume();
    container.append(content);
  }

  return container;
};

const createButtonForHiding = () => {
  const container = createHtmlElement('div', 'designe-page__btn-for-hiding');
  const btn = createHtmlElement('div', 'btn-for-hiding');

  container.append(btn);
  return container;
};

const createPainControlPanel = () => {
  const container = createHtmlElement('div', 'paint-block__control-panel');

  const select: HTMLSelectElement = document.createElement('select');
  select.classList.add('select');
  const option: HTMLOptionElement = document.createElement('option');
  option.textContent = 'Open Sans';
  select.append(option);

  const fontSizeBlock = createHtmlElement('div', 'font-size-block');
  const fontSizeInput = createHtmlElement('input', 'font-size-block__input') as HTMLInputElement;
  fontSizeInput.value = '16';
  const fontSizePlus = createHtmlElement('div', 'font-size-block__plus');
  fontSizePlus.textContent = '+';
  const fontSizeMinus = createHtmlElement('div', 'font-size-block__minus');
  fontSizeMinus.textContent = '-';

  fontSizePlus.addEventListener('click', () => {
    fontSizeInput.value = String(Number(fontSizeInput.value) + 1);
    if (targetTextElement) targetTextElement.style.fontSize = `${fontSizeInput.value}px`;
  });

  fontSizeMinus.addEventListener('click', () => {
    fontSizeInput.value = String(Number(fontSizeInput.value) - 1);
    if (Number(fontSizeInput.value) < 2) fontSizeInput.value = '1';
    if (targetTextElement) targetTextElement.style.fontSize = `${fontSizeInput.value}px`;
  });

  fontSizeInput.addEventListener('input', () => {
    if (targetTextElement) targetTextElement.style.fontSize = `${fontSizeInput.value}px`;
  });

  fontSizeBlock.append(fontSizeMinus, fontSizeInput, fontSizePlus);

  const fontStyleBlock = createHtmlElement('div', 'font-style-block');
  const underlined = createHtmlElement('div', 'font-style-block__underlined');
  const bold = createHtmlElement('div', 'font-style-block__bold');
  const italic = createHtmlElement('div', 'font-style-block__italic');
  fontStyleBlock.append(underlined, bold, italic);

  const line = createHtmlElement('div', 'vertical-line');

  const textAlidnBlock = createHtmlElement('div', 'text-align-block');
  const right = createHtmlElement('div', 'text-align-block__right');
  const center = createHtmlElement('div', 'text-align-block__center');
  const left = createHtmlElement('div', 'text-align-block__left');

  underlined.addEventListener('click', () => {
    underlined.classList.toggle('selected');
    if (targetTextElement) {
      if (underlined.classList.contains('selected')) {
        targetTextElement.style.textDecoration = 'underline';
      } else {
        targetTextElement.style.textDecoration = 'none';
      }
    }
  });

  bold.addEventListener('click', () => {
    bold.classList.toggle('selected');
    if (targetTextElement) {
      if (bold.classList.contains('selected')) {
        targetTextElement.style.fontWeight = '900';
      } else {
        targetTextElement.style.fontWeight = '100';
      }
    }
  });

  italic.addEventListener('click', () => {
    italic.classList.toggle('selected');
    if (targetTextElement) {
      if (italic.classList.contains('selected')) {
        targetTextElement.style.fontStyle = 'italic';
      } else {
        targetTextElement.style.fontStyle = 'normal';
      }
    }
  });

  left.addEventListener('click', () => {
    if (targetTextElement) targetTextElement.style.textAlign = 'left';
  });

  right.addEventListener('click', () => {
    if (targetTextElement) targetTextElement.style.textAlign = 'right';
  });

  center.addEventListener('click', () => {
    if (targetTextElement) targetTextElement.style.textAlign = 'center';
  });

  textAlidnBlock.append(left, center, right);

  container.append(select, fontSizeBlock, fontStyleBlock, line, textAlidnBlock);
  return container;
};

const createPaintBlock = () => {
  const container = createHtmlElement('div', 'designe-page__paint-block');
  const controlPanel = createPainControlPanel();
  const btnForHiding = createButtonForHiding();
  const wrapper = createHtmlElement('div', 'paint-block__wrapper');
  // const canvasElement: HTMLCanvasElement = document.createElement('canvas');
  const canvas: HTMLDivElement = document.createElement('div');
  canvas.classList.add('layout-canvas');
  wrapper.append(btnForHiding, canvas);

  container.append(controlPanel, wrapper);
  return container;
};

const createDesignePageMainContent = (typeDesigne: string) => {
  const container = createHtmlElement('div', 'designe-page__contetn');
  const sideMenu = createSideMenu();
  const hidingPanel = createHidingPanel(typeDesigne);
  const paintBlock = createPaintBlock();

  container.append(sideMenu, hidingPanel, paintBlock);
  return container;
};
export class DesignePage extends Page {
  typeDesigne: string;

  constructor(id: string, typeDesigne: string) {
    super(id);
    this.typeDesigne = typeDesigne;
  }

  private createContent() {
    const header = createDesignPageHeader();
    const main = createDesignePageMainContent(this.typeDesigne);

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

const container = document.querySelector('.content');
container?.addEventListener('click', (event) => {
  const item = event.target;
  const clickedItem = item as HTMLElement;

  if (clickedItem.closest('.btn-for-hiding')) {
    const hidingPanel = document.querySelector('.designe-page__hiding-panel');
    hidingPanel?.classList.toggle('hiding-panel_hidden');
  }
});
