import { templatesArt } from '../../data/templatesArt';
import { templatesFood } from '../../data/templatesFood';
import { templatesIt } from '../../data/templatesIt';
import { templatesMidecal } from '../../data/templatesMedical';
import { ILogoParameters, ITemplates } from '../../types/interfaces';
import { getRandomInt } from '../../utils';

export const logoParameters = {} as ILogoParameters;

export function sortLogoByScope() {
  let resultArray: ITemplates[] = [];
  switch (logoParameters.scope) {
    case 'Искусство/Дизайн': 
      resultArray = templatesArt;
      break;
    case 'Рестораны/Еда':
      resultArray = templatesFood;
      break;
    case 'IT':
      resultArray = templatesIt;
      break;
    case 'Медицина':
      resultArray = templatesMidecal;
      break;
    default:
      return;
  }
  return resultArray;
}

export function sortLogoTemplates() {
  const result = sortLogoByScope();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const filterStyle = result!.filter(item => item.style === logoParameters.style && item.color === logoParameters.color);
  let resultArray: ITemplates[] = [];
  while (resultArray.length != 2) {
    const index = getRandomInt(filterStyle.length);    
    resultArray.push(filterStyle[index]);    
    resultArray = resultArray.filter((v, i, arr) => arr.indexOf(v) == i);
  }
  return resultArray;
}

export function checkColorPage(id: string, target: HTMLDivElement) {
  const items = document.querySelectorAll('.palette');
  Array.from(items).forEach(item => {
    item.classList.remove('highlight');
  });
  target.classList.add('highlight');
  logoParameters.color = id;
  (document.querySelector('#btn-next__color-select') as HTMLButtonElement).disabled = false;
}
  
export function checkStylePage(id: string, target: HTMLDivElement ) {
  const items = document.querySelectorAll('.style-item');
  Array.from(items).forEach(item => {
    item.classList.remove('highlight');
  });
  target.classList.add('highlight');
  logoParameters.style = id;
  (document.querySelector('#btn-next__style-select') as HTMLButtonElement).disabled = false;  
}

export function checkBusinessPage() {
  if ((document.querySelector('.input-name-company') as HTMLInputElement).value !== '' && 
    (document.querySelector('.type-of-activity') as HTMLSelectElement).value !== 'Выберите сферу деятельности') {
    (document.querySelector('#btn-next__about-business') as HTMLButtonElement).disabled = false;
    logoParameters.name = (document.querySelector('.input-name-company') as HTMLInputElement).value;
    logoParameters.scope = (document.querySelector('.type-of-activity') as HTMLSelectElement).value;
  }
}

export function checkFontFamily(scope: string) {
  let resultFont: string[] = [];
  let fontsScope: string[] = [];
  const fontsArt = ['Aboreto', 'Dancing Script', 'Kaushan Script', 'Tangerine'];
  const fontsIt = ['Changa', 'Maven Pro', 'Quantico', 'Wallpoet'];
  const fontsFood = ['Cabin Sketch', 'Caveat Brush', 'Merienda One', 'Trirong'];
  const fontsMedical = ['Bellota', 'IM Fell English SC', 'Italiana', 'Jacques Francois Shadow'];
  switch (scope) {
    case 'art': 
      fontsScope = fontsArt;
      break;
    case 'food':
      fontsScope = fontsFood;
      break;
    case 'it':
      fontsScope = fontsIt;
      break;
    case 'medical':
      fontsScope = fontsMedical;
      break;
    default:
      return;
  }

  while (resultFont.length != 1) {
    const index = getRandomInt(4);    
    resultFont.push(fontsScope[index]);    
    resultFont = resultFont.filter((v, i, arr) => arr.indexOf(v) == i);
  }
  return resultFont;
}

export function checkLogo(logo: HTMLDivElement) {
  (document.querySelector('#btn-next__logo-select') as HTMLButtonElement).disabled = false;  
  const items = document.querySelectorAll('.logo-result-card');
  Array.from(items).forEach(item => {
    item.classList.remove('highlightLogo');
  });
  logo.classList.add('highlightLogo');
}
