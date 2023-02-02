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
