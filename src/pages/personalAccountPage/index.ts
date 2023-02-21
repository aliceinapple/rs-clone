import Page from '../../components/pageTemplates';
import { createHtmlElement, updateURL } from '../../utils';
import { createMainHeader } from '../main';
import { User } from '../../types/interfaces';
import { App } from '../app';
import { PagesId } from '../../types/enums';
import html2canvas from 'html2canvas';
import { imageSaveSrc, saveImage, getImage } from '../../components/saveImages';
import { dragNdrop } from '../../components/layoutTemplates/elementsActions';
import { createElementTools } from '../../components/layoutTemplates/elementsTemplate';
import { makeResizable } from '../../components/layoutTemplates/elementsActions';
import { showHandles } from '../../components/layoutTemplates/elementsActions';


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

    const layoutId = layoutContent.getAttribute('id');
    const index = layoutContent.dataset.index as string;
    const opasity = createHtmlElement('div', 'layout-block__opacity-wrapper');
    opasity.setAttribute('data-type', `${typeDesigne}`);
    opasity.setAttribute('id', `${layoutId}`);
    opasity.setAttribute('data-index', index);
    layoutWrapper.append(opasity);
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
    const layout = layoutData[2];
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
    const index = currentUserFromLocal.templates.length;
    
    const layout = document.querySelector('.layout-canvas') as HTMLElement;
    const content = document.querySelector('.container') as HTMLDivElement;
    content.setAttribute('data-index', `${index}`);
    const tools = layout.querySelectorAll('.element-tools');
    const handles = layout.querySelectorAll('.resize-handle');
    tools.forEach(tool => (tool as HTMLElement).style.display = 'none');
    handles.forEach(handl => (handl as HTMLElement).style.display = 'none');

    const parser = layout.innerHTML;
    const typeDedigne = window.location.hash.slice(14, window.location.hash.length - 1);
    const id = content.getAttribute('id') as string;
    layoutData.push(typeDedigne, id, parser, `${index}`);

    currentUserFromLocal.templates.push(layoutData);
    usersDataFromLocal[currentUserIndex].templates.push(layoutData);

    localStorage.setItem('currentUser', JSON.stringify(currentUserFromLocal));
    localStorage.setItem('usersData', JSON.stringify(usersDataFromLocal));
  }
};

const showLayoutsModal = (typeDesigne: string, id: string) => {
  const wrapper =  createHtmlElement('div', 'layouts-modal__opasity');
  const container =  createHtmlElement('div', 'layouts-modal__container');
  
  const content = createHtmlElement('div', 'layouts-modal__content');
  content.classList.add(`content-${typeDesigne}`);
  const currentUserFromLocal: User = JSON.parse(localStorage.getItem('currentUser') as string);
  const layout = currentUserFromLocal.templates.filter(item => item[0] === typeDesigne && item[3] === id);
  content.innerHTML = layout[0][2];
  
  const tools = createHtmlElement('div', 'layouts-modal__tools');
  const btnEdit = createHtmlElement('div', 'layouts-modal__btn-edit');
  btnEdit.setAttribute('data-type', typeDesigne);
  btnEdit.setAttribute('data-index', id);
  const btnSave = createHtmlElement('div', 'layouts-modal__btn-save');
  const btnRemove = createHtmlElement('div', 'layouts-modal__btn-remove');
  btnRemove.setAttribute('data-type', typeDesigne);
  btnRemove.setAttribute('data-index', id);
  tools.append(btnEdit, btnSave, btnRemove);
  container.append(content, tools);

  wrapper.append(container);
  return wrapper;
};

const closingLayoutsModal = () => {
  const modal = document.querySelector<HTMLElement>('.layouts-modal__opasity');
  if (!modal) return;
  modal.addEventListener('click', (event) => {
    const item = event.target as HTMLElement;
    if (!item) return;

    const classes = item.classList;
    if (classes.contains('layouts-modal__opasity')) {
      modal.remove();
    }
  });
};

const removeLayoutsFromAccount = (typeDesigne: string, id: string) => {
  const usersDataFromLocal: User[] = JSON.parse(localStorage.getItem('usersData') as string);
  const currentUserFromLocal: User = JSON.parse(localStorage.getItem('currentUser') as string);
  const login = currentUserFromLocal.login;
 
  const index = currentUserFromLocal.templates.findIndex(item => item[0] === typeDesigne && item[3] === id);
 
  currentUserFromLocal.templates.splice(index, 1);

  const user = usersDataFromLocal.find(users => users.login === login);
  user?.templates.splice(index, 1);

  localStorage.setItem('currentUser', JSON.stringify(currentUserFromLocal));
  localStorage.setItem('usersData', JSON.stringify(usersDataFromLocal));

  App.renderNewPage(PagesId.PersonalAccountPage);
  updateURL(PagesId.PersonalAccountPage);
};

const editLayout = (typeDesigne: string, id: string) => {
  const currentUserFromLocal: User = JSON.parse(localStorage.getItem('currentUser') as string);
  
  const layoutArray = currentUserFromLocal.templates.filter(item => item[0] === typeDesigne && item[3] === id);

  const layout = layoutArray[0][2];

  App.renderNewPage(`${PagesId.DesignePage}/${typeDesigne}`);
  updateURL(`${PagesId.DesignePage}/${typeDesigne}`);

  const container = document.querySelector('.layout-canvas') as HTMLDivElement;
  container.innerHTML = layout;
  
  const allElements: HTMLDivElement[] = [];
  const templateText = container.querySelectorAll('.template-text');
  templateText.forEach(text => allElements.push(text as HTMLDivElement));
  const templateElements = container.querySelectorAll('.template-element');
  templateElements.forEach(element => allElements.push(element as HTMLDivElement));
  
  allElements.forEach(element => {
    const handleHode = element.querySelectorAll('.resize-handle');
    const handle: HTMLDivElement[] = [];
    const tools = createElementTools(element as HTMLDivElement);
    handleHode.forEach(elem => handle.push(elem as HTMLDivElement));

    makeResizable(element as HTMLDivElement, handle);
    showHandles(element as HTMLDivElement, handle, tools);
  });

  dragNdrop(container);

};
  
const saveLayoutCanvasAsImageFile = (file: HTMLCanvasElement) => {
  const image = getImage(file);
  imageSaveSrc.image = image;
  saveImage(image);
};

const saveLayoutToDevice = () => {
  html2canvas(document.querySelector('.layouts-modal__content') as HTMLElement).then(canvas => {
    saveLayoutCanvasAsImageFile(canvas);
  });

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

const mainContainer = document.querySelector('.content');
mainContainer?.addEventListener('click', (event) => {
  const item = event.target;
  const clickedItem = item as HTMLElement;

  if (clickedItem.closest('.layout-block__opacity-wrapper')) {
    const typeDedigne = clickedItem.dataset.type as string;
    const id = clickedItem.dataset.index as string;
    const modal = showLayoutsModal(typeDedigne, id);
    mainContainer?.append(modal);
  }

  if (clickedItem.closest('.layouts-modal__btn-remove')) {
    const typeDedigne = clickedItem.dataset.type as string;
    const id = clickedItem.dataset.index as string;
    removeLayoutsFromAccount(typeDedigne, id);
  }

  if (clickedItem.closest('.layouts-modal__btn-edit')) {
    const typeDedigne = clickedItem.dataset.type as string;
    const id = clickedItem.dataset.index as string;
    editLayout(typeDedigne, id);
  }

  if (clickedItem.closest('.layouts-modal__btn-save')) {
    saveLayoutToDevice();
  }

  closingLayoutsModal();
});
