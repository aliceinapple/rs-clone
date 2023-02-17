export const createHtmlElement = (tegName: string, className: string) => {
  const element: HTMLElement = document.createElement(tegName);
  element.classList.add(className);

  return element;
};

export const createButtonElement = (className: string, content: string) => {
  const btn: HTMLButtonElement = document.createElement('button');
  btn.classList.add(className);
  btn.textContent = content;

  return btn;
};

export const createInputElementForModal = (boxClassName: string, type: string, placeholde: string, className: string, dataReg: string) => {
  const inputBox: HTMLElement = document.createElement('div');
  inputBox.classList.add(boxClassName);
  const input: HTMLInputElement = document.createElement('input');
  input.type = type;
  input.placeholder = placeholde;
  input.classList.add(className);
  input.setAttribute('data-reg', dataReg);
  
  inputBox.append(input);
  return inputBox;
};

export const createPasswordInput = (boxClassName: string, className: string, icoClassName: string, dataReg: string) => {
  const inputPassBox = createHtmlElement('div', boxClassName);
  const inputPass: HTMLInputElement = document.createElement('input');
  inputPass.type = 'password';
  inputPass.placeholder = 'Введите пароль';
  inputPass.setAttribute('data-reg', dataReg);
  inputPass.classList.add(className);
  inputPassBox.append(inputPass);
  const icoPass = createHtmlElement('div', icoClassName);
  icoPass.classList.add('password__ico-hidden');
  inputPassBox.append(icoPass);

  icoPass.addEventListener('mousemove', () => {
    inputPass.type = 'text';
    icoPass.classList.remove('password__ico-hidden');
    icoPass.classList.add('password__ico-show');
  });

  icoPass.addEventListener('mouseout', () => {
    inputPass.type = 'password';
    icoPass.classList.remove('password__ico-show');
    icoPass.classList.add('password__ico-hidden');
  });

  return inputPassBox;
};

export const dataRegName = '^[а-яА-ЯёЁa-zA-Z]';
export const dataRegEmail = '^([a-z0-9_-]+[.])*[a-z0-9_-]+@[a-z0-9_-]+([.][a-z0-9_-]+)*[.][a-z]{2,6}$';
export const dataRegLogin = '^[а-яА-ЯёЁa-zA-Z0-9]';
export const dataRegPassword = '^.{6,}$';

export const createImageElement = (className: string, scope: string, id: number) => {
  const img: HTMLImageElement = document.createElement('img');
  img.classList.add(className);
  img.src = require(`../assets/templates/${scope}/${id}.png`);

  return img;
};


export function updateURL(pageId: string, URL = '') {
  if (history.pushState) {
    if (history.state && history.state.url === `#${pageId}/${URL}`) {
      return;
    } else {
      const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      const newUrl = `${baseUrl}#${pageId}/${URL}`;
      history.pushState({ url: `#${pageId}/${URL}` }, '', `${newUrl}`);
    }
  } else {
    console.warn('History API не поддерживается');
  }
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const createImage = (className: string) => {
  const img: HTMLImageElement = document.createElement('img');
  img.classList.add(className);

  return img;
};