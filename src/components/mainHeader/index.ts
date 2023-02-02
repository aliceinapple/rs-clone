import { createHtmlElement, createButtonElement } from '../../utils';

export const createMainHeader = () => {
  const header = createHtmlElement('div', 'header');
  const headerWrapper = createHtmlElement('div', 'header__wrapper');

  const navBlock = createHtmlElement('div', 'navigation-block');
  const logo = createHtmlElement('div', 'logo');
  
  const navigation = createHtmlElement('ul', 'nav');
  const navItems = ['Главная', 'Шаблоны', 'Обучение'];
  navItems.forEach(item => {
    const navItem = createHtmlElement('li', 'nav__item');
    navItem.textContent = item;
    navigation.append(navItem);
  });
  navBlock.append(logo, navigation);

  const btnBlock = createHtmlElement('div', 'buttons-block');
  const btnCreateDisigne = createButtonElement('btn-create-disign', 'Создать дизайн');
  const btnLog = createButtonElement('btn-log', '');
  const btnLogIco = createHtmlElement('div', 'btn-log__ico');
  btnLog.append(btnLogIco);
  btnBlock.append(btnCreateDisigne, btnLog);

  headerWrapper.append(navBlock, btnBlock);
  header.append(headerWrapper);
  return header;
};
