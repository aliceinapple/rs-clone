import './index.html';
import './main.scss';
import 'normalize.css';

import { createMainHeader } from './components/mainHeader';
import { createMainContent } from './components/mainContent';

const header = createMainHeader();
const main = createMainContent();
const container = document.querySelector('.content');
container?.append(header, main);
