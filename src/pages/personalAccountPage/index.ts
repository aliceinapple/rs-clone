import Page from '../../components/pageTemplates';
import { createHtmlElement } from '../../utils';
import { createMainHeader } from '../main';

const createAccountContent = () => {
  const container = createHtmlElement('div', 'account__wrapper');
  const personalDataBlock = createHtmlElement('div', 'account__personal-data-block');

  container.append(personalDataBlock);
  return container;
};

export class PersonalAccountPage extends Page {
  private createContent() {
    const header = createMainHeader();
    const main = createAccountContent();

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
