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

export const createInputElement = (boxClassName: string, type: string, placeholde: string, className: string) => {
  const inputBox: HTMLElement = document.createElement('div');
  inputBox.classList.add(boxClassName);
  const input: HTMLInputElement = document.createElement('input');
  input.type = type;
  input.placeholder = placeholde;
  input.classList.add(className);
  
  inputBox.append(input);
  return inputBox;
};

export const dataRegName = '[а-яА-ЯёЁa-zA-Z]';
export const dataRegEmail = '^([a-z0-9_-]+[.])*[a-z0-9_-]+@[a-z0-9_-]+([.][a-z0-9_-]+)*[.][a-z]{2,6}$''

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
