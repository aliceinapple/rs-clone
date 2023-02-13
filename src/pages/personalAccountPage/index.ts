import Page from '../../components/pageTemplates';
import { createHtmlElement } from '../../utils';
import { createMainHeader } from '../main';
import { User } from '../../types/interfaces';

const createDefaultBlock = () => {
  const container = createHtmlElement('div', 'account__default-wrapper');
  const defaultBlock = createHtmlElement('div', 'account__default-block');
  const defaultImg = createHtmlElement('div', 'default-block__default-img');
  const defaultMessage = createHtmlElement('p', 'default-block__default-message');
  defaultMessage.textContent = 'Здесь будут отображаться дизайны которые вы сохранили.';
  defaultBlock.append(defaultImg, defaultMessage);

  container.append(defaultBlock);
  return container;
};

const createLayoutsBlock = (typeDesigne: string, titleText: string, collection: string[]) => {
  const block = createHtmlElement('div', 'layout-block');
  block.classList.add(`layout-block-${typeDesigne}`);
  const title = createHtmlElement('p', 'layout-block__title');
  title.textContent = titleText;
  const content = createHtmlElement('div', 'layout-block__content');
  content.classList.add(`layout-block__content-${typeDesigne}`);
  
  collection.forEach(layout => {
    const layoutWrapper = createHtmlElement('div', `layout-block__${typeDesigne}-wrapper`);
    layoutWrapper.classList.add('layout-block__wrapper');
    layoutWrapper.innerHTML = `${layout}`;
    content.append(layoutWrapper);

    const layoutContent = layoutWrapper.querySelector('.container') as HTMLElement;
    layoutContent.style.transform = 'scale(0.4)';
    layoutContent.style.transformOrigin = 'top left';
  });
  
  block.append(title, content);
  return block;
};

const createLayoutsContent = (templates: string[][]) => {
  const container = createHtmlElement('div', 'account__wrapper'); 
  const postcardCollection: string[] = [];
  const logotypeCollection: string[] = [];
  const visitcardCollection: string[] = [];
  const resumeCollection: string[] = [];
  
  templates.forEach(layoutData => {
    const typeDedigne = layoutData[0];
    const layout = layoutData[1];
    if (typeDedigne === 'postcard') {
      postcardCollection.push(layout);
    } else if (typeDedigne === 'logotype') {
      logotypeCollection.push(layout);
    } else if (typeDedigne === 'visit-card') {
      visitcardCollection.push(layout);
    } else if (typeDedigne === 'resume') {
      resumeCollection.push(layout);
    }
  });

  if (postcardCollection.length > 0) {
    const postcardBlock = createLayoutsBlock('postcard', 'Открытки', postcardCollection);
    container.append(postcardBlock);
  }
  if (logotypeCollection.length > 0) {
    const logotypeBlock = createLayoutsBlock('logotype', 'Логотипы', logotypeCollection);
    container.append(logotypeBlock);
  }
  if (visitcardCollection.length > 0) {
    const visitcardBlock = createLayoutsBlock('visit-card', 'Визитки', visitcardCollection);
    container.append(visitcardBlock);
  }
  if (resumeCollection.length > 0) {
    const resumeBlock = createLayoutsBlock('resume', 'Резюме', resumeCollection);
    container.append(resumeBlock);
  }

  return container;
};

const createAccountContent = () => {
  const container = createHtmlElement('div', 'account__wrapper');

  let currentUserFromLocal: User;
  if (localStorage.getItem('currentUser')) {
    currentUserFromLocal = JSON.parse(localStorage.getItem('currentUser') as string);

    if (currentUserFromLocal.templates.length > 0) {
      const content = createLayoutsContent(currentUserFromLocal.templates);
      container.append(content);
    } else {
      const content = createDefaultBlock();
      container.append(content);
    }
  }
  return container;
};

export const savinglayoutsInAccount = () => {
  let currentUserFromLocal: User;
  let usersDataFromLocal: User[];
  if (localStorage.getItem('currentUser')) {
    currentUserFromLocal = JSON.parse(localStorage.getItem('currentUser') as string);
    usersDataFromLocal = JSON.parse(localStorage.getItem('usersData') as string);
    
    const currentUserIndex = usersDataFromLocal.findIndex(user => user.login === currentUserFromLocal.login);

    const layoutData: string[] = [];

    const layout = document.querySelector('.layout-canvas') as HTMLElement;
    const parser = layout.innerHTML;
    const typeDedigne = window.location.hash.slice(14, window.location.hash.length - 1);

    layoutData.push(typeDedigne, parser);
    currentUserFromLocal.templates.push(layoutData);
    usersDataFromLocal[currentUserIndex].templates.push(layoutData);

    localStorage.setItem('currentUser', JSON.stringify(currentUserFromLocal));
    localStorage.setItem('usersData', JSON.stringify(usersDataFromLocal));
  }
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
