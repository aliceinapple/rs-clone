import { createHtmlElement } from '../../utils';
import { createLogInButton } from '../../components/buttons';

export const createlinkForBackOnMainPage = () => {
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = '#main-page';
  link.classList.add('control-block__link');
  const linkArrow = createHtmlElement('span', 'link__arrow');
  const linkText = createHtmlElement('span', 'link__text');
  linkText.textContent = 'Главная';
  link.append(linkArrow, linkText);

  return link;
};

export const createHeader = (titleText: string) => {
  const header = createHtmlElement('header', 'header');
  const headerWrapper = createHtmlElement('div', 'header__wrapper');

  const controlBlock = createHtmlElement('div', 'header__control-block');
  const link = createlinkForBackOnMainPage();
  controlBlock.append(link);

  const title = createHtmlElement('p', 'header__title');
  title.textContent = titleText;
  const btnBlock = createHtmlElement('div', 'header__btn-block');
  const btn = createLogInButton();
  btnBlock.append(btn);

  headerWrapper.append(controlBlock, title, btnBlock);
  header.append(headerWrapper);
  
  return header;
};
