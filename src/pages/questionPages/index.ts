import { createHtmlElement, createButtonElement } from '../../utils';
import { createHeader } from '../../components/header';
import Page from '../../components/pageTemplates';
import { checkBusinessPage } from '../../components/logoGeneration';


const createPageInfoAboutBusiness = () => {
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
  options.forEach((element) => {
    const option: HTMLOptionElement = document.createElement('option');
    option.textContent = element;
    typeOfActivity.append(option);
  });
  const btnNextQuestionBlock = createHtmlElement('div', 'btn-next-question-block');
  const btnNextQuestion = createButtonElement('btn-next-question', 'Продолжить');
  btnNextQuestion.setAttribute('id', 'btn-next__about-business');
  btnNextQuestion.disabled = true;
  btnNextQuestionBlock.append(btnNextQuestion);
  container.addEventListener('input', checkBusinessPage);
  container.append(question, nameCompany, typeOfActivity, btnNextQuestionBlock);

  return container;
};

const colorsPaletteWhiteBlack = ['#000000', '#C7C7C7', '#545454', '#A7A7A7'];
const colorsPalettePastel = ['#D0ECF5', '#CFEAC0', '#FAEDD3', '#F8D2E3'];
const colorsPaletteBright = ['#31D468', '#00CFD8', '#F57600', '#F3AE21'];
const colorsPaletteDark = ['#2C344A', '#4A5329', '#744037', '#79562D'];

const createPalette = (palette: string[], containerClass: string, id: string) => {
  const container = createHtmlElement('div', containerClass);
  container.setAttribute('id', id);
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
  const paletteWhiteBlack = createPalette(colorsPaletteWhiteBlack, 'palette-white-black', 'blackWhite');
  const palettePaste = createPalette(colorsPalettePastel, 'palette-pastel', 'white');
  const paletteBright = createPalette(colorsPaletteBright, 'palette-bright', 'bright');
  const paletteDark = createPalette(colorsPaletteDark, 'palette-Ddrk', 'black');

  colorPaletteBlock.append(paletteWhiteBlack, palettePaste, paletteBright, paletteDark);

  const btnNextQuestionBlock = createHtmlElement('div', 'btn-next-question-block');
  const btnNextQuestion = createButtonElement('btn-next-question', 'Продолжить');
  btnNextQuestion.setAttribute('id', 'btn-next__color-select');
  btnNextQuestion.disabled = true;
  btnNextQuestionBlock.append(btnNextQuestion);

  container.append(question, colorPaletteBlock, btnNextQuestionBlock);
  return container;
};

const renderStyleIcons = (id: string) => {
  let icons: string;
  switch (id) {
    case 'minimalism': 
      icons = require('../../assets/ico/ico_style-minimalism.png');
      break;
    case 'strong':
      icons = require('../../assets/ico/ico_style-strong.png');
      break;
    case 'light':
      icons = require('../../assets/ico/ico_style-light.png');
      break;
    case 'catchy':
      icons = require('../../assets/ico/ico_style-catchy.png');
      break;
    default:
      return;
  }
  return icons;
};

const createViewStyle = (styleBlocClass: string, styleItemClass: string, styleName: string, id: string) => {
  const styleBlock = createHtmlElement('div', styleBlocClass);
  styleBlock.classList.add('style-block');
  const styleItem = createHtmlElement('div', styleItemClass);
  styleItem.classList.add('style-item');
  styleItem.style.backgroundImage = `url(${renderStyleIcons(id)})`;
  styleItem.style.backgroundSize = 'cover';
  styleItem.setAttribute('id', id);
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
  const style1 = createViewStyle('style-block-1', 'style-1', 'Минимализм', 'minimalism');
  const style2 = createViewStyle('style-block-2', 'style-2', 'Серьёзный', 'strong');
  const style3 = createViewStyle('style-block-3', 'style-3', 'Лёгкий', 'light');
  const style4 = createViewStyle('style-block-4', 'style-4', 'Броский', 'catchy');
  styleBlock.append(style1, style2, style3, style4);

  const btnNextQuestionBlock = createHtmlElement('div', 'btn-next-question-block');
  const btnNextQuestion = createButtonElement('btn-next-question', 'Получить результат');
  btnNextQuestion.setAttribute('id', 'btn-next__style-select');
  btnNextQuestion.disabled = true;
  btnNextQuestionBlock.append(btnNextQuestion);

  container.append(question, styleBlock, btnNextQuestionBlock);
  return container;
};
export class InfoBusinessPage extends Page {
  private createContent() {
    const header = createHeader('Создание индивидуального логотипа');
    const main = createPageInfoAboutBusiness();

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
export class ColorSelectPage extends Page {
  private createContent() {
    const header = createHeader('Создание индивидуального логотипа');
    const main = createColorSelectionPage();
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
export class StyleSelectPage extends Page {
  private createContent() {
    const header = createHeader('Создание индивидуального логотипа');
    const main = createStyleLogoPage();
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

