const createHtmlElement = (tegName: string, className: string) => {
  const element: HTMLElement = document.createElement(tegName);
  element.classList.add(className);

  return element;
};

const createButtonElement = (className: string, content: string) => {
  const btn: HTMLButtonElement = document.createElement('button');
  btn.classList.add(className);
  btn.textContent = content;

  return btn;
};

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
