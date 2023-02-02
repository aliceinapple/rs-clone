import { createHtmlElement, createButtonElement } from '../../utils';
import { createHeader } from '../../components/header';

export const createPageInfoAboutBusiness = () => {
  const container = createHtmlElement('div', 'page-question');

  const question = createHtmlElement('div', 'question');
  question.textContent = 'Предоставьте информацию о вашем бизнесе';

  const nameCompany: HTMLInputElement = document.createElement('input');
  nameCompany.classList.add('input-name-company');
  nameCompany.type = 'text';
  nameCompany.placeholder = 'Введите название компании';

  const typeOfActivity: HTMLSelectElement = document.createElement('select');
  typeOfActivity.classList.add('type-of-activity');
  const options = ['Выберите сферу деятельности', 'Медицина', 'IT', 'Искусство/Дизайн', 'Рестораны/Еда'];
  options.forEach(element => {
    const option: HTMLOptionElement = document.createElement('option');
    option.textContent = element;
    typeOfActivity.append(option);
  });
  const btnNextQuestionBlock = createHtmlElement('div', 'btn-next-question-block');
  const btnNextQuestion = createButtonElement('btn-next-question', 'Продолжить');
  btnNextQuestionBlock.append(btnNextQuestion);


  container.append(question, nameCompany, typeOfActivity, btnNextQuestionBlock);
  return container;
};

const colorsPaletteWhiteBlack = ['#000000', '#C7C7C7', '#545454', '#A7A7A7'];
const colorsPalettePastel = ['#D0ECF5', '#CFEAC0', '#FAEDD3', '#F8D2E3'];
const colorsPaletteBright = ['#31D468', '#00CFD8', '#F57600', '#F3AE21'];
const colorsPaletteDark = ['#2C344A', '#4A5329', '#744037', '#79562D'];

const createPalette = (palette: string[], containerClass: string) => {
  const container = createHtmlElement('div', containerClass);
  container.classList.add('palette');
  palette.forEach(color => {
    const colorItem = createHtmlElement('div', 'color-item');
    colorItem.style.backgroundColor = color;
    container.append(colorItem);
  });

  return container;
};

const createColorSelectionPage = () => {
  const container = createHtmlElement('div', 'page-question');

  const question = createHtmlElement('div', 'question');
  question.textContent = 'Выберите цветовую схему';

  const colorPaletteBlock = createHtmlElement('div', 'color-palette-block');
  const paletteWhiteBlask = createPalette(colorsPaletteWhiteBlack, 'palette-white-black');
  const palettePaste = createPalette(colorsPalettePastel, 'palette-pastel');
  const paletteBright = createPalette(colorsPaletteBright, 'palette-bright');
  const paletteDark = createPalette(colorsPaletteDark, 'palette-Ddrk');
  colorPaletteBlock.append(paletteWhiteBlask, palettePaste, paletteBright, paletteDark);

  const btnNextQuestionBlock = createHtmlElement('div', 'btn-next-question-block');
  const btnNextQuestion = createButtonElement('btn-next-question', 'Продолжить');
  btnNextQuestionBlock.append(btnNextQuestion);

  container.append(question, colorPaletteBlock, btnNextQuestionBlock);
  return container;
};

const createViewStyle = (styleBlocClass: string, styleItemClass: string, styleName: string) => {
  const styleBlock = createHtmlElement('div', styleBlocClass);
  styleBlock.classList.add('style-block');
  const styleItem = createHtmlElement('div', styleItemClass);
  styleItem.classList.add('style-item');
  const styleTitle = createHtmlElement('p', 'style-name');
  styleTitle.textContent = styleName;

  styleBlock.append(styleItem, styleTitle);
  return styleBlock;
};

const createStyleLogoPage = () => {
  const container = createHtmlElement('div', 'page-question');

  const question = createHtmlElement('div', 'question');
  question.textContent = 'Выберите стиль логотипа';

  const styleBlock = createHtmlElement('div', 'view-style-block');
  const style1 = createViewStyle('style-block-1', 'style-1', 'Минимализм');
  const style2 = createViewStyle('style-block-2', 'style-2', 'Строгий');
  const style3 = createViewStyle('style-block-3', 'style-3', 'Лёгкий');
  const style4 = createViewStyle('style-block-4', 'style-4', 'Броский');
  styleBlock.append(style1, style2, style3, style4);

  const btnNextQuestionBlock = createHtmlElement('div', 'btn-next-question-block');
  const btnNextQuestion = createButtonElement('btn-next-question', 'Получить результат');
  btnNextQuestionBlock.append(btnNextQuestion);

  container.append(question, styleBlock, btnNextQuestionBlock);
  return container;
};

export const renderPageInfoAboutBusiness = () => {
  const container = document.querySelector('.content');
  const header = createHeader('Создание индивидуального логотипа');
  const main = createPageInfoAboutBusiness();

  container?.append(header, main);
  return container;
};

export const renderColorSelectionPage = () => {
  const container = document.querySelector('.content');
  const header = createHeader('Создание индивидуального логотипа');
  const main = createColorSelectionPage();

  container?.append(header, main);
  return container;
};

export const renderStyleLogoPage = () => {
  const container = document.querySelector('.content');
  const header = createHeader('Создание индивидуального логотипа');
  const main = createStyleLogoPage();

  container?.append(header, main);
  return container;
};
