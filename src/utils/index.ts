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

export const createInputElement = (type: string, placeholde: string, className: string) => {
  const input: HTMLInputElement = document.createElement('input');
  input.type = type;
  input.placeholder = placeholde;
  input.classList.add(className);

  return input;
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
