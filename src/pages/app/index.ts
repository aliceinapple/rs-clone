import { PagesId } from '../../types/enums';
import { updateURL } from '../../utils';
import Page from '../../components/pageTemplates';
import { MainPage } from '../main';
import { DesignePage } from '../designPage';
import { InfoBusinessPage } from '../questionPages';
import { ColorSelectPage } from '../questionPages';
import { StyleSelectPage } from '../questionPages';

const containerForContent = document.querySelector('.content') as HTMLElement;

export class App {
  private static container: HTMLElement = containerForContent;

  private mainPage: MainPage;

  static renderNewPage(idPage: string) {
    App.container.innerHTML = '';
    let page: Page | null = null;

    if (idPage.includes(PagesId.MainPage)) {
      page = new MainPage(idPage);
    } else if (idPage.includes(PagesId.DesignePage)) {
      page = new DesignePage(idPage);
    } else if (idPage.includes(PagesId.InfoBusinessPage)) {
      page = new InfoBusinessPage(idPage);
    } else if (idPage.includes(PagesId.ColorSelectPage)) {
      page = new ColorSelectPage(idPage);
    } else if (idPage.includes(PagesId.StyleSelectPage)) {
      page = new StyleSelectPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.classList.add(`${idPage}`);
      App.container.append(pageHTML);
    }
  }

  constructor() {
    this.mainPage = new MainPage('main-page');
  }

  renderPage() {
    App.renderNewPage('main-page');
    updateURL('main-page');
  }
}
