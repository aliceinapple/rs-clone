import { createHtmlElement } from '../../utils';
import { createButtonElement } from '../../utils';
import { createInputElement } from '../../utils';

export const createLogInModal = () => {
  const container = createHtmlElement('form', 'modal__autorization');
  const title = createHtmlElement('p', 'modal__title');
  title.textContent = 'Вход';

  const inputLogIn = createInputElement('modal__input-box', 'text', 'Введите логин', 'autorization__login');
  const inputPass = createInputElement('modal__input-box', 'password', 'Введите пароль', 'autorization__password');

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
  const container = createHtmlElement('form', 'modal__registration');
  const title = createHtmlElement('p', 'modal__title');
  title.textContent = 'Регистрация';

  const inputName = createInputElement('modal__input-box', 'text', 'Введите имя', 'registration__name');
  const inputEmail = createInputElement('modal__input-box', 'email', 'Введите почту', 'registration__email');
  const inputLogIn = createInputElement('modal__input-box', 'text', 'Введите логин', 'registration__login');
  const inputPass = createInputElement('modal__input-box', 'password', 'Введите пароль', 'registration__password');
  const inputRepeatPass = createInputElement('modal__input-box', 'password', 'Повторите пароль', 'registration__password');
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
  const modalContent = createRegistrationModal();
  modal.append(modalContent);
  opasity.append(modal);

  container.append(opasity);
  return container;
};

const createErrorStyle = (input: HTMLInputElement, text: string) => {
  const inputBox = input.parentNode as HTMLElement; 
  inputBox.classList.add('input_error');

  const errorText: HTMLElement = document.createElement('p');
  errorText.classList.add('input_error-text');
  errorText.textContent = `${text}`;
  
  inputBox.append(errorText);
};

const removeErrorStyle = (input: HTMLInputElement) => {
  const inputBox = input.parentNode as HTMLElement;

  if (inputBox.classList.contains('input_error')) {
    inputBox.querySelector('.input_error-text')?.remove();
    inputBox.classList.remove('input_error');
  }
};

