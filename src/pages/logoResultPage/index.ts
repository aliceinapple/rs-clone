import { logoParameters, sortLogoTemplates } from '../../components/logoGeneration';
import Page from '../../components/pageTemplates';
import { createButtonElement, createHtmlElement, createImageElement } from '../../utils';
import { createMainHeader } from '../main';

const createLogoResultPageContent = () => {
  const container = createHtmlElement('div', 'logo-result-page');
  const question = createHtmlElement('div', 'question');
  question.textContent = 'Вы можете выбрать понравившийся вам логотип и скачать его';
  const content = createHtmlElement('div', 'logo-result-content');
  const result = sortLogoTemplates();
  result.forEach(item => {
    const card = createHtmlElement('div', 'logo-result-card');
    const img = createImageElement('logo-result-img', item.scope, item.id);
    const text = createHtmlElement('p', 'logo-result-text');
    text.innerHTML = logoParameters.name;
    text.style.color = item.textColor;
    text.style.fontSize = item.textSize;
    card.append(img, text);
    content.append(card);
  });
  const btnNextQuestionBlock = createHtmlElement('div', 'btn-next-question-block');
  const btnNextQuestion = createButtonElement('btn-next-question', 'Выбрать логотип');
  btnNextQuestion.setAttribute('id', 'btn-next__logo-select');
  btnNextQuestionBlock.append(btnNextQuestion);
  container.append(question, content, btnNextQuestionBlock);
  return container;
};

export class LogoResultPage extends Page {
  private createContent() {
    const header = createMainHeader();
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