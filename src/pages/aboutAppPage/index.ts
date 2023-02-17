import { createHeader } from '../../components/header';
import Page from '../../components/pageTemplates';
import { infoAboutApp, infoAboutMembers } from '../../data/aboutApp';
import { createHtmlElement, createImage } from '../../utils';


const createAboutAppPageContent = () => {
  const container = createHtmlElement('div', 'page-about-app');
  const question = createHtmlElement('div', 'question');
  question.textContent = 'О чём наш проект?';
  const teamTitle = createHtmlElement('div', 'question');
  teamTitle.textContent = 'Наша команда';
  const content = createHtmlElement('div', 'about-app-content');
  const aboutCanva = createHtmlElement('p', 'about-app-content_title');
  const linkCanva = createHtmlElement('a', 'about-app-content_link');
  const aboutApp = createHtmlElement('p', 'about-app-content_title');
  linkCanva.setAttribute('href', 'https://www.canva.com/');
  linkCanva.textContent = 'Canva';
  aboutCanva.innerHTML = infoAboutApp.maintitle;
  aboutApp.innerHTML = infoAboutApp.aboutApp;
  const teamContainer = createHtmlElement('div', 'about-app-content_team');
  infoAboutMembers.forEach((item) => {
    const member = createHtmlElement('div', 'about-app-team-member');
    const memberInfo = createHtmlElement('div', 'about-app-team-member-info');
    const memberName = createHtmlElement('p', 'about-app-team-member-name');
    const memberTitle = createHtmlElement('p', 'about-app-team-member-title');
    const memberPhoto = createImage('about-app-team-member-photo'); 
    memberName.innerHTML = item.name;
    memberTitle.innerHTML = item.about;
    memberPhoto.src = item.photo;
    memberInfo.append(memberName, memberTitle);
    member.append(memberPhoto, memberInfo);
    teamContainer.append(member);
  });
  aboutCanva.append(linkCanva);
  content.append(aboutCanva, aboutApp, teamTitle, teamContainer);
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