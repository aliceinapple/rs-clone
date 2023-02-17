import { 
  createHtmlElement,
  createButtonElement,
  createInputElementForModal,
  createPasswordInput,
  dataRegEmail,
  dataRegName,
  dataRegLogin,
  dataRegPassword,
  updateURL,
} from '../../utils';
import { User } from '../../types/interfaces';
import { App } from '../../pages/app';
import { PagesId } from '../../types/enums';

export const createLogInModal = () => {
  const container = createHtmlElement('form', 'modal__autorization');
  container.setAttribute('action', '/#');
  container.setAttribute('novalidate', 'novalidate');
  const title = createHtmlElement('p', 'modal__title');
  title.textContent = 'Вход';

  const inputLogIn = createInputElementForModal('modal__input-box', 'text', 'Введите логин', 'autorization__login', '');
  const inputPass = createPasswordInput('modal__input-box', 'autorization__password', 'autorization__password-ico', '');

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
  container.setAttribute('name', 'registration');
  container.setAttribute('action', '/#');
  container.setAttribute('novalidate', 'novalidate');
  const title = createHtmlElement('p', 'modal__title');
  title.textContent = 'Регистрация';

  const inputName = createInputElementForModal('modal__input-box', 'text', 'Введите имя', 'registration__name', dataRegName);
  const inputEmail = createInputElementForModal('modal__input-box', 'email', 'Введите почту', 'registration__email', dataRegEmail);
  const inputLogIn = createInputElementForModal('modal__input-box', 'text', 'Введите логин', 'registration__login', dataRegLogin);
  const inputPass = createPasswordInput('modal__input-box', 'registration__password', 'registration__password-ico', dataRegPassword);
  const inputRepeatPass = createPasswordInput('modal__input-box', 'registration__password-repeat', 'registration__password-repeat-ico', '');
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

export const validationOfregistration = (form: HTMLFormElement, usersData: User[]) => {
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
        createErrorStyle(input, 'Имя содержит только буквы');
        result = false;
      } else {
        removeErrorStyle(input);
      }
    } else if (input.value !== '' && input.classList.contains('registration__login')) {
      const value = input.value;
      const inputReg = input.getAttribute('data-reg');
      const regExp = new RegExp(inputReg as string);

      if (localStorage.getItem('usersData')) {
        usersData = JSON.parse(localStorage.getItem('usersData') as string);
      }
      const login = usersData.filter(user => user.login === value);
      
      if (!regExp.test(value)) {
        createErrorStyle(input, 'Логин содержит буквы и цифры');
        result = false;
      } else if (login.length > 0) {
        createErrorStyle(input, 'Логин уже занят');
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

export const changeIcoInBtnLogIn = () => {
  let currentUserFromLocal: User;
  const btnIco = document.querySelector('.btn-log__ico') as HTMLElement;

  if (localStorage.getItem('currentUser')) {
    currentUserFromLocal = JSON.parse(localStorage.getItem('currentUser') as string);

    btnIco.classList.remove('btn-log__ico');
    btnIco.classList.add('btn-log__ico_user-ico');
    btnIco.textContent = `${currentUserFromLocal.name[0]}`;
  }
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

export const registrationUser = (form: HTMLFormElement, usersData: User[]) => {
  const userName = form.querySelector('.registration__name') as HTMLInputElement;
  const userLogin = form.querySelector('.registration__login') as HTMLInputElement;
  const userEmail = form.querySelector('.registration__email') as HTMLInputElement;
  const userPassword = form.querySelector('.registration__password') as HTMLInputElement;
  
  if (localStorage.getItem('usersData')) {
    usersData = JSON.parse(localStorage.getItem('usersData') as string);
  }
  let newId: number;
  
  if (usersData.length === 0) {
    newId = usersData.length + 1;
  } else {
    const usersId = usersData.map(user => user.id);
    newId = Math.max(...usersId) + 1;
  }

  const user: User = {
    authorization: true,
    id: newId,
    name: `${userName.value}`,
    login: `${userLogin.value}`,
    email: `${userEmail.value}`,
    password: `${userPassword.value}`,
    templates: [],
  };
  usersData.push(user);
  localStorage.setItem('usersData', JSON.stringify(usersData));
  localStorage.setItem('currentUser', JSON.stringify(user));
};

const createUserDataModal = (user: User) => {
  const modal = createHtmlElement('div', 'user-data-modal');

  const titleBlok = createHtmlElement('div', 'user-data-modal__title-block');
  const userIco = createHtmlElement('div', 'title-block__user-ico');
  userIco.textContent = `${user.name[0]}`;
  const userName = createHtmlElement('p', 'title-block__user-name');
  userName.textContent = `${user.name}`;
  titleBlok.append(userIco, userName);

  const dataBlock = createHtmlElement('div', 'user-data-modal__data-block');
  const userLogin = createHtmlElement('p', 'data-block__user-login');
  userLogin.textContent = `Логин: ${user.login}`;
  const userEmail = createHtmlElement('p', 'data-block__user-email');
  userEmail.textContent = `Email: ${user.email}`;
  dataBlock.append(userLogin, userEmail);

  const linkPerconaiAccount: HTMLAnchorElement = document.createElement('a');
  linkPerconaiAccount.setAttribute('href', '#personal-account-page');
  linkPerconaiAccount.classList.add('user-data-modal__link-personal-account');
  linkPerconaiAccount.textContent = 'Личный кабинет';

  const logOutBlock = createHtmlElement('div', 'user-data-modal__log-out-block');
  const logOutIco = createHtmlElement('div', 'log-out-block__ico');
  const logOut = createHtmlElement('div', 'log-out-block__log-out');
  logOut.textContent = 'Выход';
  logOutBlock.append(logOutIco, logOut);

  modal.append(titleBlok, linkPerconaiAccount, dataBlock, logOutBlock);
  return modal;
};

const renderUserDataModal = (user: User) => {
  const btn = document.querySelector('.btn-log') as HTMLElement;
  const contaiter = document.querySelector('.content');
  const modal = createUserDataModal(user);

  if (btn.closest('.btn-log_active')) {
    btn.classList.remove('btn-log_active');
    const modalUser = document.querySelector('.user-data-modal');
    modalUser?.remove();
  } else {
    btn.classList.add('btn-log_active');
    contaiter?.append(modal);
  }
};

export const openModalWindow = (usersData: User[]) => {
  if (localStorage.getItem('usersData')) {
    usersData = JSON.parse(localStorage.getItem('usersData') as string);
  }

  const autorization = usersData.filter(user => user.authorization === true);
  const currentUser = autorization[0];

  if (autorization.length === 0) {
    renderLogInModal();
    closingModal();
  } else {
    renderUserDataModal(currentUser);
  }
};

export const logOutAccount = (usersData: User[]) => {
  if (localStorage.getItem('usersData')) {
    usersData = JSON.parse(localStorage.getItem('usersData') as string);
  }

  const autorization = usersData.filter(user => user.authorization === true);
  const currentUser = autorization[0];

  currentUser.authorization = false;
  localStorage.setItem('usersData', JSON.stringify(usersData));

  const user: User = {
    authorization: false,
    id: 0,
    name: '',
    login: '',
    email: '',
    password: '',
    templates: [],
  };
  localStorage.setItem('currentUser', JSON.stringify(user));

  const modalUser = document.querySelector('.user-data-modal');
  modalUser?.remove();
  App.renderNewPage(PagesId.MainPage);
  updateURL(PagesId.MainPage);
};

export const validationOfLogIn = (usersData: User[]) => {
  if (localStorage.getItem('usersData')) {
    usersData = JSON.parse(localStorage.getItem('usersData') as string);
  }

  let result = true;
  const form = document.querySelector('.modal__autorization') as HTMLFormElement;
  const login = form.querySelector('.autorization__login') as HTMLInputElement;
  const password = form.querySelector('.autorization__password') as HTMLInputElement;

  const userLoginValue = login.value;
  const userPassordValue = password.value;
  const userIndex = usersData.findIndex(item => item.login === userLoginValue);

  if (userIndex >= 0) {
    const userLogin = usersData[userIndex].login;
    const userPassword = usersData[userIndex].password;

    form.querySelectorAll('input').forEach(input => {
      removeErrorStyle(input);
      if (input.value === '') {
        createErrorStyle(input, 'Поле не заполнено!');
        result = false;
      } else if (input.value === userLoginValue && input.value !== userLogin) {
        createErrorStyle(input, 'Пользователь не найден!');
        result = false;
      } else if (input.value === userPassordValue
                && userLoginValue === userLogin
                && input.value !== userPassword) {
        createErrorStyle(input, 'Неверный пароль!');
        result = false;
      } else if (userLoginValue === userLogin 
                && userPassordValue === userPassword) {
        result = true;
        usersData[userIndex].authorization = true;
        localStorage.setItem('currentUser', JSON.stringify(usersData[userIndex]));
        localStorage.setItem('usersData', JSON.stringify(usersData));
      }
    });
  } else {
    createErrorStyle(login, 'Пользователь не найден!');
    result = false;
  }
  
  return result;
};
