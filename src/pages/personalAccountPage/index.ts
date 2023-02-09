import Page from '../../components/pageTemplates';
import { createHtmlElement } from '../../utils';
import { createMainHeader } from '../main';
import { User } from '../../types/interfaces';

const createDefaultBlock = () => {
  const defaulBlock = createHtmlElement('div', 'account__default-block');
  const defaultImg = createHtmlElement('div', 'default-block__default-img');
  const defaulTMessage = createHtmlElement('p', 'default-block__default-message');
  defaulTMessage.textContent = 'Здесь будут отображаться дизайны которые вы сохранили.';
  defaulBlock.append(defaultImg, defaulTMessage);

  return defaulBlock;
};

const createAccountContent = () => {
  let currentUserFromLocal: User;
  const container = createHtmlElement('div', 'account__wrapper');
  const personalDataBlock = createHtmlElement('div', 'account__personal-layouts');

  if (localStorage.getItem('currentUser')) {
    currentUserFromLocal = JSON.parse(localStorage.getItem('currentUser') as string);

    if (currentUserFromLocal.templates.length > 0) {
      personalDataBlock.classList.remove('personal-layouts_empty');
    } else {
      personalDataBlock.classList.add('personal-layouts_empty');
      const content = createDefaultBlock();
      personalDataBlock.append(content);
    }
  } else {
    personalDataBlock.classList.add('personal-layouts_empty');
    const content = createDefaultBlock();
    personalDataBlock.append(content);
  }
  
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
