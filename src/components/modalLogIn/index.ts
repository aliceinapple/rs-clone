import { createHtmlElement } from '../../utils';
import { createButtonElement } from '../../utils';
import { createInputElement } from '../../utils';

const createLogInModal = () => {
  const container = createHtmlElement('div', 'modal__autorization');
  const title = createHtmlElement('p', 'autorization__title');
  title.textContent = 'Вход';

  const inputLogIn = createInputElement('text', 'Введите логин', 'autorization__login');
  const inputPass = createInputElement('password', 'Введите пароль', 'autorization__password');

  const btnLogIn = createButtonElement('autorization__bnt', 'Войти');

  const questionBlock = createHtmlElement('div', 'autorization__question-block');
  const aboutAccount = createHtmlElement('p', 'question-block__question-about-account');
  aboutAccount.textContent = 'Нет аккаунта?';
  const linkForRegistration = createHtmlElement('p', 'question-block__question-link-registration');
  linkForRegistration.textContent = 'Зарегистрироваться';
  questionBlock.append(aboutAccount, linkForRegistration);

  container.append(
    title, 
    inputLogIn, 
    inputPass, 
    btnLogIn, 
    questionBlock,
  );
  return container;
};

export const createRegistrationModal = () => {
  const container = createHtmlElement('div', 'modal__registration');
  const title = createHtmlElement('p', 'registration__title');
  title.textContent = 'Регистрация';

  const inputName = createInputElement('text', 'Введите имя', 'registration__name');
  const inputEmail = createInputElement('email', 'Введите почту', 'registration__email');
  const inputLogIn = createInputElement('text', 'Введите логин', 'registration__login');
  const inputPass = createInputElement('password', 'Введите пароль', 'registration__password');
  const inputRepeatPass = createInputElement('password', 'Повторите пароль', 'registration__password');
  const btnLogIn = createButtonElement('registration__bnt', 'Зарегистрироваться');

  container.append(
    title,
    inputName,
    inputEmail,
    inputLogIn,
    inputPass,
    inputRepeatPass,
    btnLogIn,
  );
  return container;
};

export const renderLogInModal = () => {
  const container = document.querySelector('.content') as HTMLElement;

  const opasity = createHtmlElement('div', 'opasity-container');
  const modal = createHtmlElement('div', 'modal');
  const modalContent = createLogInModal();
  modal.append(modalContent);
  opasity.append(modal);

  container.append(opasity);
  return container;
};
