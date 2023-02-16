import { createHeader } from '../../components/header';
import Page from '../../components/pageTemplates';
import { createHtmlElement } from '../../utils';


const createAboutAppPageContent = () => {
  const container = createHtmlElement('div', 'page-question-result');
  const question = createHtmlElement('div', 'question');
  question.textContent = 'Наша команда';
  const content = createHtmlElement('div', 'logo-result-content');
  container.append(question, content);
  return container;
};

export class AboutAppPage extends Page {
  private createContent() {
    const header = createHeader('О проекте');
    const main = createAboutAppPageContent();

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