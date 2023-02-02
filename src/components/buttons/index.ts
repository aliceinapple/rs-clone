import { createButtonElement, createHtmlElement } from '../../utils';

export const createLogInButton = () => {
  const btnLog = createButtonElement('btn-log', '');
  const btnLogIco = createHtmlElement('div', 'btn-log__ico');
  btnLog.append(btnLogIco);

  return btnLog;
};
