import { 
  createHtmlElement,
  createButtonElement,
  createInputElementForModal,
  dataRegEmail,
  dataRegName,
  dataRegLogin,
  dataRegPassword, 
} from '../../utils';

export const createLogInModal = () => {
  const container = createHtmlElement('form', 'modal__autorization');
  const title = createHtmlElement('p', 'modal__title');
  title.textContent = 'Вход';

  const inputLogIn = createInputElementForModal('modal__input-box', 'text', 'Введите логин', 'autorization__login', '');
  const inputPass = createInputElementForModal('modal__input-box', 'password', 'Введите пароль', 'autorization__password', '');

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
  container.setAttribute('action', '/#');
  container.setAttribute('novalidate', 'novalidate');
  const title = createHtmlElement('p', 'modal__title');
  title.textContent = 'Регистрация';

  const inputName = createInputElementForModal('modal__input-box', 'text', 'Введите имя', 'registration__name', dataRegName);
  const inputEmail = createInputElementForModal('modal__input-box', 'email', 'Введите почту', 'registration__email', dataRegEmail);
  const inputLogIn = createInputElementForModal('modal__input-box', 'text', 'Введите логин', 'registration__login', dataRegLogin);
  const inputPass = createInputElementForModal('modal__input-box', 'password', 'Введите пароль', 'registration__password', dataRegPassword);
  const inputRepeatPass = createInputElementForModal('modal__input-box', 'password', 'Повторите пароль', 'registration__password-repeat', '');
  const btnLogIn = createButtonElement('registration__bnt', 'Зарегистрироваться');
  btnLogIn.setAttribute('type', 'submit');

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

export const validation = (form: HTMLFormElement) => {
  let result = true;

  form.querySelectorAll('input').forEach(input => {
    removeErrorStyle(input);
    if (input.value === '') {
      createErrorStyle(input, 'Поле не заполнено!');
      result = false;
    } else if (input.value !== '' && input.classList.contains('registration__name')) {
      const value = input.value;
      const inputReg = input.getAttribute('data-reg');
      const regExp = new RegExp(inputReg as string);
      
      if (!regExp.test(value)) {
        console.log(regExp.test(value));
        createErrorStyle(input, 'Имя содержит только буквы');
        result = false;
      } else {
        removeErrorStyle(input);
      }
    } else if (input.value !== '' && input.classList.contains('registration__login')) {
      const value = input.value;
      const inputReg = input.getAttribute('data-reg');
      const regExp = new RegExp(inputReg as string);
      
      if (!regExp.test(value)) {
        createErrorStyle(input, 'Логин содержит буквы и цифры');
        result = false;
      } else {
        removeErrorStyle(input);
      }
    } else if (input.value !== '' && input.classList.contains('registration__email')) {
      const value = input.value;
      const inputReg = input.getAttribute('data-reg');
      const regExp = new RegExp(inputReg as string);
      
      if (!regExp.test(value)) {
        createErrorStyle(input, 'Не корректное значение');
        result = false;
      } else {
        removeErrorStyle(input);
      }
    } else if (input.value !== '' && input.classList.contains('registration__password')) {
      const value = input.value;
      if (value.length < 6) {
        createErrorStyle(input, 'Пароль не меньше 6 символов!');
        result = false;
      } else {
        removeErrorStyle(input);
      }
    } else if (input.value !== '' && input.classList.contains('registration__password-repeat')) {
      const pass = document.querySelector('.registration__password') as HTMLInputElement;
      if (pass.value !== input.value) {
        createErrorStyle(input, 'Пароль не совпадает!');
        result = false;
      } else {
        removeErrorStyle(input);
      }
    }
  });

  return result;
};

const addEventListenerForForm = () => {
  const form = document.querySelector('.modal__registration') as HTMLFormElement;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validation(form) === true) {
      console.log('ok');
    } else {
      console.log('error');
    }
  });
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

export const openRegistrationModal = () => {
  const modal = document.querySelector('.modal') as HTMLElement;
  modal.innerHTML = '';
  const modalContent = createRegistrationModal();
  
  modal.append(modalContent);
  addEventListenerForForm();
  return modal;
};

export const closingModal = () => {
  const modal = document.querySelector<HTMLElement>('.opasity-container');
  if (!modal) return;
  modal.addEventListener('click', (event) => {
    const item = event.target as HTMLElement;
    if (!item) return;

    const classes = item.classList;
    if (classes.contains('opasity-container')) {
      modal.remove();
    }
  });
};

