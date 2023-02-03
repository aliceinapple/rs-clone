import Page from '../../components/pageTemplates';
import { createHtmlElement } from '../../utils';
import { createMainHeader } from '../main';

const createLogoResultPageContent = () => {
  const container = createHtmlElement('div', 'logo-result-page');

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
