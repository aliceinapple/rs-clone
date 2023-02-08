import { createButtonElement } from '../../utils';
import { User } from '../../types/interfaces';

export const createLogInButton = () => {
  let currentUserFromLocal: User;
  const btnLog = createButtonElement('btn-log', '');
  const btnLogIco: HTMLElement = document.createElement('div');

  if (localStorage.getItem('currentUser')) {
    currentUserFromLocal = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUserFromLocal.name.length > 0) {
      btnLogIco.classList.add('btn-log__ico_user-ico');
      btnLogIco.textContent = `${currentUserFromLocal.name[0]}`;
    } else {
      btnLogIco.classList.add('btn-log__ico');
    }

  } else {
    btnLogIco.classList.add('btn-log__ico');
  }

  btnLog.append(btnLogIco);

  return btnLog;
};
