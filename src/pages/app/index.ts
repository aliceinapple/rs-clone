import { PagesId, TypesDesigne } from '../../types/enums';
import { updateURL } from '../../utils';
import Page from '../../components/pageTemplates';
import { MainPage } from '../main';
import { DesignePage } from '../designPage';
import { InfoBusinessPage } from '../questionPages';
import { ColorSelectPage } from '../questionPages';
import { StyleSelectPage } from '../questionPages';
import { LogoResultPage } from '../logoResultPage';

import { renderLogInModal } from '../../components/modalLogIn';
import { openRegistrationModal, closingModal } from '../../components/modalLogIn';
import { PersonalAccountPage } from '../personalAccountPage';
import { validation } from '../../components/modalLogIn';
import { checkBusinessPage, checkColorPage, checkStylePage } from '../../components/logoGeneration';


const containerForContent = document.querySelector('.content') as HTMLElement;

export class App {
  private static container: HTMLElement = containerForContent;

  private mainPage: MainPage;

  static renderNewPage(idPage: string, typeDesigne?: string) {
    App.container.innerHTML = '';
    let page: Page | null = null;

    if (idPage.includes(PagesId.MainPage)) {
      page = new MainPage(idPage);
    } else if (idPage.includes(PagesId.DesignePage)) {
      page = new DesignePage(idPage, typeDesigne as string);
    } else if (idPage.includes(PagesId.InfoBusinessPage)) {
      page = new InfoBusinessPage(idPage);
    } else if (idPage.includes(PagesId.ColorSelectPage)) {
      page = new ColorSelectPage(idPage);
    } else if (idPage.includes(PagesId.StyleSelectPage)) {
      page = new StyleSelectPage(idPage);
    } else if (idPage.includes(PagesId.LogoResultPage)) {
      page = new LogoResultPage(PagesId.LogoResultPage);
    } else if (idPage.includes(PagesId.PersonalAccountPage)) {
      page = new PersonalAccountPage(PagesId.PersonalAccountPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.classList.add(`${idPage}`);
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.mainPage = new MainPage('main-page');
  }

  renderPage() {
    this.enableRouteChange();
    App.renderNewPage('main-page');
    updateURL('main-page');
  }
}

containerForContent.addEventListener('click', (event) => {
  const item = event.target;
  const clickedItem = item as HTMLElement;

  if (clickedItem.closest('.banner__btn-create-logo')) {
    App.renderNewPage(PagesId.InfoBusinessPage);
    updateURL(PagesId.InfoBusinessPage);
  }
  
  if (clickedItem.className === ('input-name-company') || clickedItem.className === ('type-of-activity')) {
    checkBusinessPage();
  }

  if (clickedItem.closest('#btn-next__about-business')) {
    App.renderNewPage(PagesId.ColorSelectPage);
    updateURL(PagesId.ColorSelectPage);
  }

  if (clickedItem.closest('.color-palette-block')) {
    const parentBlock = clickedItem.closest('.palette') as HTMLDivElement;
    if (parentBlock !== null) checkColorPage(parentBlock.id);
  }

  if (clickedItem.closest('#btn-next__color-select')) {
    App.renderNewPage(PagesId.StyleSelectPage);
    updateURL(PagesId.StyleSelectPage);
  }

  if (clickedItem.closest('.view-style-block')) {
    const parentBlock = clickedItem.closest('.style-item') as HTMLDivElement;
    if (parentBlock !== null) checkStylePage(parentBlock.id);
  }

  if (clickedItem.closest('#btn-next__style-select')) {
    App.renderNewPage(PagesId.LogoResultPage);
    updateURL(PagesId.LogoResultPage);
  }

  if (clickedItem.closest(`#${TypesDesigne.Postcard}`)) {
    App.renderNewPage(PagesId.DesignePage, TypesDesigne.Postcard);
    updateURL(PagesId.DesignePage);
  }

  if (clickedItem.closest(`#${TypesDesigne.Resume}`)) {
    App.renderNewPage(PagesId.DesignePage, TypesDesigne.Resume);
    updateURL(PagesId.DesignePage);
  }

  if (clickedItem.closest(`#${TypesDesigne.VisitCard}`)) {
    App.renderNewPage(PagesId.DesignePage, TypesDesigne.VisitCard);
    updateURL(PagesId.DesignePage);
  }

  if (clickedItem.closest('.btn-log__ico')) {
    renderLogInModal();
    closingModal();
  }

  if (clickedItem.closest('.question-block__question-link-registration')) {
    openRegistrationModal();
  }

  if (clickedItem.closest('.registration__bnt')) {
    event.preventDefault();
    const form = document.querySelector('.modal__registration') as HTMLFormElement;
    if (validation(form) === true) {
      App.renderNewPage(PagesId.PersonalAccountPage);
      updateURL(PagesId.PersonalAccountPage);
    }
  }
});

