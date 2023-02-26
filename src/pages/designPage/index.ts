import { createHtmlElement } from '../../utils';
import { createLogInButton } from '../../components/buttons/index';
import { createlinkForBackOnMainPage } from '../../components/header/index';
import Page from '../../components/pageTemplates';
import { TypesDesigne } from '../../types/enums';
import { elementPanelTemplates, textPanelTemplates } from '../../components/layoutTemplates';
import {
  fontFamilyList,
  businessCardSize,
  postCardSize,
  resumeCardSize,
  logoCardSize,
} from '../../data/layoutTemplateData';
import { businessCardsPanelTemplates } from '../../components/layoutTemplates/businessCard';
import { postCardsPanelTemplates } from '../../components/layoutTemplates/postCard';
import { resumePanelTemplates } from '../../components/layoutTemplates/resume';
import { logoPanelTemplates } from '../../components/layoutTemplates/logotype';
import { CreateTemplates } from '../../components/layoutTemplates/mainTemplate';
import { targetTextElement } from '../../components/layoutTemplates/targetElement';
import {
  checkTextStyle,
  fontAlignBtnsActions,
  fontSizeBtnsActions,
  fontStyleBtnsActions,
} from '../../components/layoutTemplates/buttonActions';
import { redo, undo } from '../../components/layoutTemplates/layoutHistory/layoutHistory';
import { convertationLayoutToCanvas } from '../../components/saveImages';
import { setProps } from '../../components/layoutTemplates/elementsTemplate';

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

  saveIco.addEventListener('click', () => {
    convertationLayoutToCanvas('.container');
  });

  arrowBack.addEventListener('click', undo);
  arrowForward.addEventListener('click', redo);

  removeIco.addEventListener('click', () => {
    const canvas = document.querySelector('.layout-canvas');
    if (canvas) canvas.innerHTML = '';
    let template;

    const layout = new CreateTemplates();
    if (window.location.hash.includes(TypesDesigne.VisitCard)) {
      template = layout.createEmptyTemplate(businessCardSize);
    } else if (window.location.hash.includes(TypesDesigne.Postcard)) {
      template = layout.createEmptyTemplate(postCardSize);
    } else if (window.location.hash.includes(TypesDesigne.Resume)) {
      template = layout.createEmptyTemplate(resumeCardSize);
    } else if (window.location.hash.includes(TypesDesigne.Logo)) {
      template = layout.createEmptyTemplate(logoCardSize);
    }

    if (canvas && template) canvas.append(template);
  });

  removeBlock.append(removeIco);

  controlBlock.append(link, arrowBlock, saveBlock, removeBlock);

  const title = createHtmlElement('p', 'header__title');

  setTimeout(() => {
    if (window.location.hash.includes(TypesDesigne.VisitCard)) {
      title.textContent = 'Дизайн - Business card';
    } else if (window.location.hash.includes(TypesDesigne.Postcard)) {
      title.textContent = 'Дизайн - Post card';
    } else if (window.location.hash.includes(TypesDesigne.Resume)) {
      title.textContent = 'Дизайн - Resume';
    } else if (window.location.hash.includes(TypesDesigne.Logo)) {
      title.textContent = 'Дизайн - Logotype';
    }
  }, 0);

  const btnBlock = createHtmlElement('div', 'header__btn-block');
  const btnSaveInAccount = createHtmlElement('div', 'btn-block__btn-save-in-account');
  const btn = createLogInButton();
  btnBlock.append(btnSaveInAccount, btn);

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

let mainMenuContainer: HTMLDivElement;

function checkContainer(container: HTMLDivElement) {
  if (container.classList.contains('hiding-panel__visit-card-block')) {
    container.append(businessCardsPanelTemplates);
  } else if (container.classList.contains('hiding-panel__postcard-block')) {
    container.append(postCardsPanelTemplates);
  } else if (container.classList.contains('hiding-panel__resume-block')) {
    container.append(resumePanelTemplates);
  } else if (container.classList.contains('hiding-panel__logo-block')) {
    container.append(logoPanelTemplates);
  }
  return container;
}

function getMenu(container: HTMLDivElement) {
  container.innerHTML = '';
  checkContainer(container);
  return container;
}

const createSideMenu = () => {
  const container = createHtmlElement('div', 'designe-page__side-menu');

  const designBlock = createSideMenuElement('designe-block', 'ico-designe', 'designe-block-title', 'Дизайн');
  designBlock.classList.add('active-block');
  const elementBlock = createSideMenuElement('element-block', 'ico-element', 'element-block-title', 'Элемент');
  const textBlock = createSideMenuElement('text-block', 'ico-text', 'text-block-title', 'Текст');

  designBlock.addEventListener('click', () => {
    designBlock.classList.add('active-block');
    elementBlock.classList.remove('active-block');
    textBlock.classList.remove('active-block');

    if (mainMenuContainer) {
      mainMenuContainer.innerHTML = '';
      mainMenuContainer = getMenu(mainMenuContainer);
    }
  });

  elementBlock.addEventListener('click', () => {
    elementBlock.classList.add('active-block');
    designBlock.classList.remove('active-block');
    textBlock.classList.remove('active-block');

    if (mainMenuContainer) {
      mainMenuContainer.innerHTML = '';
      mainMenuContainer.append(elementPanelTemplates);
    }
  });

  textBlock.addEventListener('click', () => {
    textBlock.classList.add('active-block');
    elementBlock.classList.remove('active-block');
    designBlock.classList.remove('active-block');

    if (mainMenuContainer) {
      mainMenuContainer.innerHTML = '';
      mainMenuContainer.append(textPanelTemplates);
    }
  });

  container.append(designBlock, elementBlock, textBlock);
  return container;
};

const createHidingPanelForPostcard = () => {
  const container = createHtmlElement('div', 'hiding-panel__postcard-block') as HTMLDivElement;

  mainMenuContainer = getMenu(container);

  return container;
};

const createHidingPanelForVisitCars = () => {
  const container = createHtmlElement('div', 'hiding-panel__visit-card-block') as HTMLDivElement;

  mainMenuContainer = getMenu(container);

  return container;
};

const createHidingPanelForResume = () => {
  const container = createHtmlElement('div', 'hiding-panel__resume-block') as HTMLDivElement;

  mainMenuContainer = getMenu(container);

  return container;
};

const createHidingPanelForLogo = () => {
  const container = createHtmlElement('div', 'hiding-panel__logo-block') as HTMLDivElement;

  mainMenuContainer = getMenu(container);

  return container;
};

const createHidingPanel = (typeDesigne: string) => {
  const container = createHtmlElement('div', 'designe-page__hiding-panel');

  container.addEventListener('click', () => {
    const layout = document.querySelector('.container') as HTMLDivElement;
    setProps(layout);
  });

  if (typeDesigne === TypesDesigne.Postcard) {
    const content = createHidingPanelForPostcard();
    container.append(content);
  } else if (typeDesigne === TypesDesigne.VisitCard) {
    const content = createHidingPanelForVisitCars();
    container.append(content);
  } else if (typeDesigne === TypesDesigne.Resume) {
    const content = createHidingPanelForResume();
    container.append(content);
  } else if (typeDesigne === TypesDesigne.Logo) {
    const content = createHidingPanelForLogo();
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
  colorInput.value = '#4f4f4f';

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target === targetTextElement) {
      checkTextStyle(targetTextElement, underlined, bold, italic, fontSizeInput, select);
    } else if (target instanceof HTMLDivElement && !container.contains(target)) {
      underlined.classList.remove('selected');
      bold.classList.remove('selected');
      italic.classList.remove('selected');
    }
  });

  colorInput.addEventListener('change', () => {
    const background = document.querySelector('.container') as HTMLDivElement;
    if (background && background instanceof HTMLDivElement) background.style.background = colorInput.value;
    setProps(background);
  });

  container.addEventListener('click', () => {
    const layout = document.querySelector('.container') as HTMLDivElement;
    setProps(layout);
  });

  fontSizeBtnsActions(fontSizePlus, fontSizeMinus, fontSizeInput);
  fontStyleBtnsActions(underlined, bold, italic);
  fontAlignBtnsActions(left, right, center);

  backgroundColor.appendChild(colorInput);

  textAlidnBlock.append(left, center, right);

  container.append(select, fontSizeBlock, fontStyleBlock, line, textAlidnBlock, backgroundColor);
  return container;
};

const createPaintBlock = (typeDesigne: string) => {
  const container = createHtmlElement('div', 'designe-page__paint-block');
  const controlPanel = createPainControlPanel();
  const btnForHiding = createButtonForHiding();
  const wrapper = createHtmlElement('div', 'paint-block__wrapper');
  const canvas: HTMLDivElement = document.createElement('div');
  canvas.classList.add('layout-canvas');

  let template;
  const layout = new CreateTemplates();
  if (typeDesigne === TypesDesigne.VisitCard) {
    template = layout.createEmptyTemplate(businessCardSize);
  } else if (typeDesigne === TypesDesigne.Postcard) {
    template = layout.createEmptyTemplate(postCardSize);
  } else if (typeDesigne === TypesDesigne.Resume) {
    template = layout.createEmptyTemplate(resumeCardSize);
  } else if (typeDesigne === TypesDesigne.Logo) {
    template = layout.createEmptyTemplate(logoCardSize);
  }

  if (template) canvas.append(template);

  wrapper.append(btnForHiding, canvas);

  container.append(controlPanel, wrapper);
  return container;
};

const createDesignePageMainContent = (typeDesigne: string) => {
  const container = createHtmlElement('div', 'designe-page__contetn');
  const sideMenu = createSideMenu();
  const hidingPanel = createHidingPanel(typeDesigne);
  const paintBlock = createPaintBlock(typeDesigne);

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
