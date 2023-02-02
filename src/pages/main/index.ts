import { createMainHeader } from '../../components/mainHeader';
import { createMainContent } from '../../components/mainContent';

export const renderMainPage = () => {
  const container = document.querySelector('.content');
  const header = createMainHeader();
  const main = createMainContent();

  container?.append(header, main);
  return container;
};
