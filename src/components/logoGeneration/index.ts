import { templatesArt } from '../../data/templatesArt';
import { templatesFood } from '../../data/templatesFood';
import { templatesIt } from '../../data/templatesIt';
import { templatesMidecal } from '../../data/templatesMedical';
import { ILogoParameters, ITemplates } from '../../types/interfaces';
import { getRandomInt } from '../../utils';

export const parametSort = {} as ILogoParameters;

export function sortLogoByScope() {
  let resultArray: ITemplates[] = [];
  switch (parametSort.scope) {
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
      console.log('default');
  }
  return resultArray;
}

export function sortLogoTemplates() {
  const result = sortLogoByScope();
  const filterStyle = result.filter(item => item.style === parametSort.style && item.color === parametSort.color);
  let resultArray: ITemplates[] = [];
  while (resultArray.length != 2) {
    const index = getRandomInt(filterStyle.length);    
    resultArray.push(filterStyle[index]);    
    resultArray = resultArray.filter((v, i, arr) => arr.indexOf(v) == i);
  }
  return resultArray;
}

export function checkColorPage(id: string) {
  parametSort.color = id;
  console.log(id);
  
}
  
export function checkStylePage(id: string) {
  parametSort.style = id;
  console.log(id);
  
}

export function checkBusinessPage() {
  let nextQuestion = false;
  if ((document.querySelector('.input-name-company') as HTMLInputElement).value !== '' && 
    (document.querySelector('.type-of-activity') as HTMLSelectElement).value !== 'Выберите сферу деятельности') {
    nextQuestion = true;
    parametSort.name = (document.querySelector('.input-name-company') as HTMLInputElement).value;
    parametSort.scope = (document.querySelector('.type-of-activity') as HTMLSelectElement).value;
  } else {
    nextQuestion = false;
  }
  return nextQuestion;
}
  