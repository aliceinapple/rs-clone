import { PagesId, TypesDesigne } from '../../types/enums';
import { User } from '../../types/interfaces';
import { updateURL } from '../../utils';
import Page from '../../components/pageTemplates';
import { MainPage } from '../main';
import { DesignePage } from '../designPage';
import { InfoBusinessPage, ColorSelectPage, StyleSelectPage } from '../questionPages';
import { LogoResultPage } from '../logoResultPage';
import { PersonalAccountPage } from '../personalAccountPage';
import { 
  openModalWindow, 
  logOutAccount, 
  validationOfLogIn, 
  changeIcoInBtnLogIn, 
  openRegistrationModal, 
  validationOfregistration, 
  registrationUser, 
} from '../../components/modalLogIn';
import { checkColorPage, checkLogo, checkStylePage } from '../../components/logoGeneration';
import { convertationToCanvas, imageSaveSrc, saveImage } from '../../components/saveImages';
import { savinglayoutsInAccount } from '../personalAccountPage';
import { PaintPage } from '../paintPage';
import { renderPaintTools } from '../../components/paintTools';
import { AboutAppPage } from '../aboutAppPage';


const usersData: User[] = [];

const containerForContent = document.querySelector('.content') as HTMLElement;

export class App {
  private static container: HTMLElement = containerForContent;

  private mainPage: MainPage;

  static renderNewPage(idPage: string) {
    App.container.innerHTML = '';
    let page: Page | null = null;

    if (idPage.includes(PagesId.MainPage)) {
      page = new MainPage(idPage);
    } else if (idPage.includes(`${PagesId.DesignePage}/${TypesDesigne.VisitCard}`)) {
      page = new DesignePage(idPage, TypesDesigne.VisitCard);
    } else if (idPage.includes(`${PagesId.DesignePage}/${TypesDesigne.Postcard}`)) {
      page = new DesignePage(idPage, TypesDesigne.Postcard);
    } else if (idPage.includes(`${PagesId.DesignePage}/${TypesDesigne.Resume}`)) {
      page = new DesignePage(idPage, TypesDesigne.Resume);
    } else if (idPage.includes(`${PagesId.DesignePage}/${TypesDesigne.Logo}`)) {
      page = new DesignePage(idPage, TypesDesigne.Logo);
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
    } else if (idPage.includes(PagesId.PaintPage)) {
      page = new PaintPage(idPage);
    } else if (idPage.includes(PagesId.AboutApp)) {
      page = new AboutAppPage(idPage);
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

  if (clickedItem.closest('#btn-next__about-business')) {
    App.renderNewPage(PagesId.ColorSelectPage);
    updateURL(PagesId.ColorSelectPage);
  }

  if (clickedItem.closest('.color-palette-block')) {
    const parentBlock = clickedItem.closest('.palette') as HTMLDivElement;
    if (parentBlock !== null) checkColorPage(parentBlock.id, parentBlock);
  }

  if (clickedItem.closest('#btn-next__color-select')) {
    App.renderNewPage(PagesId.StyleSelectPage);
    updateURL(PagesId.StyleSelectPage);
  }

  if (clickedItem.closest('.view-style-block')) {
    const parentBlock = clickedItem.closest('.style-item') as HTMLDivElement;
    if (parentBlock !== null) checkStylePage(parentBlock.id, parentBlock);
  }

  if (clickedItem.closest('#btn-next__style-select')) {
    App.renderNewPage(PagesId.LogoResultPage);
    updateURL(PagesId.LogoResultPage);
  }

  if (clickedItem.closest('.logo-result-card')) {
    const parentBlock = clickedItem.closest('.logo-result-card') as HTMLDivElement;
    if (parentBlock !== null) checkLogo(parentBlock);
    convertationToCanvas(parentBlock.id); //
  }

  if (clickedItem.closest(`#${TypesDesigne.Postcard}`)) {
    App.renderNewPage(`${PagesId.DesignePage}/${TypesDesigne.Postcard}`);
    updateURL(`${PagesId.DesignePage}/${TypesDesigne.Postcard}`);
  }

  if (clickedItem.closest('#btn-next__logo-select')) {
    saveImage(imageSaveSrc.image); //
  }

  if (clickedItem.closest(`#${TypesDesigne.Resume}`)) {
    App.renderNewPage(`${PagesId.DesignePage}/${TypesDesigne.Resume}`);
    updateURL(`${PagesId.DesignePage}/${TypesDesigne.Resume}`);
  }

  if (clickedItem.closest(`#${TypesDesigne.VisitCard}`)) {
    App.renderNewPage(`${PagesId.DesignePage}/${TypesDesigne.VisitCard}`);
    updateURL(`${PagesId.DesignePage}/${TypesDesigne.VisitCard}`);
  }

  if (clickedItem.closest(`#${TypesDesigne.Logo}`)) {
    App.renderNewPage(`${PagesId.DesignePage}/${TypesDesigne.Logo}`);
    updateURL(`${PagesId.DesignePage}/${TypesDesigne.Logo}`);
  }
  
  if (clickedItem.closest('.btn-log')) {
    openModalWindow(usersData);
  }

  if (clickedItem.closest('.user-data-modal__log-out-block')) {
    logOutAccount(usersData);
  }

  if (clickedItem.closest('.autorization__bnt')) {
    event.preventDefault();
    if (validationOfLogIn(usersData) === true) {
      const modal = document.querySelector('.opasity-container');
      modal?.remove();
      changeIcoInBtnLogIn();
    }
  }

  if (clickedItem.closest('.question-block__question-link-registration')) {
    openRegistrationModal();
  }

  if (clickedItem.closest('.registration__bnt')) {
    event.preventDefault();
    const form = document.querySelector('.modal__registration') as HTMLFormElement;
    if (validationOfregistration(form, usersData) === true) {
      registrationUser(form, usersData);
      const modal = document.querySelector('.opasity-container');
      modal?.remove();
      changeIcoInBtnLogIn();
    }
  }

  if (clickedItem.closest('.user-data-modal__link-personal-account')) {
    const modal = document.querySelector('.user-data-modal');
    modal?.remove();
  }

  if (clickedItem.closest('.btn-block__btn-save-in-account')) {
    let currentUserFromLocal: User;
    if (localStorage.getItem('currentUser')) {
      currentUserFromLocal = JSON.parse(localStorage.getItem('currentUser') as string);

      if (currentUserFromLocal.authorization === true) {
        savinglayoutsInAccount();
      } else {
        openModalWindow(usersData);
      }
    } else {
      openModalWindow(usersData);
    }
  }

  if (clickedItem.closest('.link-paint')) {
    App.renderNewPage(PagesId.PaintPage);
    updateURL(PagesId.PaintPage);
    renderPaintTools();
  }

  if (clickedItem.closest('.btn-about-app')) {
    App.renderNewPage(PagesId.AboutApp);
    updateURL(PagesId.AboutApp);
  }

});
