import './index.html';
import './main.scss';
import 'normalize.css';

import { createMainHeader } from './components/mainHeader';

const header = createMainHeader();
const container = document.querySelector('.content');
container?.append(header);
