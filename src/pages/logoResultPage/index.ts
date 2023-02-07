import { createHeader } from '../../components/header';
import { checkFontFamily, logoParameters, sortLogoTemplates } from '../../components/logoGeneration';
import Page from '../../components/pageTemplates';
import { createButtonElement, createHtmlElement, createImageElement } from '../../utils';


const createLogoResultPageContent = () => {
  const container = createHtmlElement('div', 'page-question-result');
  const question = createHtmlElement('div', 'question');
  question.textContent = 'Вы можете выбрать понравившийся вам логотип и скачать его';
  const content = createHtmlElement('div', 'logo-result-content');
  const result = sortLogoTemplates();
  result.forEach((item, index) => {
    const card = createHtmlElement('div', 'logo-result-card');
    const img = createImageElement('logo-result-img', item.scope, item.id);
    const text = createHtmlElement('p', 'logo-result-text');
    text.innerHTML = logoParameters.name;
    text.style.color = item.textColor;
    text.style.fontFamily = `${checkFontFamily(item.scope)}`;
    card.setAttribute('id', `logo-${index + 1}`);
    card.append(img, text);
    content.append(card);
  });
  const btnNextQuestionBlock = createHtmlElement('div', 'btn-next-question-block');
  const btnNextQuestion = createButtonElement('btn-next-question', 'Скачать логотип');
  btnNextQuestion.setAttribute('id', 'btn-next__logo-select');
  btnNextQuestion.disabled = true;
  btnNextQuestionBlock.append(btnNextQuestion);
  container.append(question, content, btnNextQuestionBlock);
  return container;
};

export class LogoResultPage extends Page {
  private createContent() {
    const header = createHeader('Создание индивидуального логотипа');
    const main = createLogoResultPageContent();

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