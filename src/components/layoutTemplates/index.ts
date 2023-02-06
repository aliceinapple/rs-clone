import businessCard_1 from '../../assets/templateImages/businessCard_1.png';
import businessCard_2 from '../../assets/templateImages/businessCard_2.png';
import businessCard_3 from '../../assets/templateImages/businessCard_3.png';
import businessCard_4 from '../../assets/templateImages/businessCard_4.png';
import cats from '../../assets/templateImages/cats.png';
import circle from '../../assets/templateImages/circle.png';
import cruassan from '../../assets/templateImages/cruassan.png';
import heart from '../../assets/templateImages/heart.png';
import leave_1 from '../../assets/templateImages/leave_1.png';
import leave from '../../assets/templateImages/leave.png';
import pizza from '../../assets/templateImages/pizza.png';
import yellow_flower from '../../assets/templateImages/yellow_flower.png';
import girl from '../../assets/templateImages/girl.png';
import girl_2 from '../../assets/templateImages/girl_2.png';
import heart_2 from '../../assets/templateImages/heart_2.png';
import leaves_2 from '../../assets/templateImages/leaves_2.png';
import phone from '../../assets/templateImages/phone.png';
import photo_cards from '../../assets/templateImages/photo_cards.png';
import rainbow from '../../assets/templateImages/rainbow.png';
import tabasco from '../../assets/templateImages/tabasco.png';

import { BusinessCardTemplates } from './businessCard';
import { createTemplateImg, createTemplateText, createTemplateTextArea } from './elementsTemplate';
import { defaultTexsts } from '../../data/layoutTemplateData';

const tempElementsArr = [
  girl,
  girl_2,
  cats,
  circle,
  tabasco,
  heart,
  heart_2,
  rainbow,
  leave_1,
  leave,
  leaves_2,
  pizza,
  cruassan,
  yellow_flower,
  phone,
  photo_cards,
];

function createPanelTemplates(img1: string, img2: string, img3: string, img4: string) {
  const templates = document.createElement('div');

  const image1 = document.createElement('img');
  image1.setAttribute('src', img1);
  image1.id = '1';

  const image2 = document.createElement('img');
  image2.setAttribute('src', img2);
  image2.id = '2';

  const image3 = document.createElement('img');
  image3.setAttribute('src', img3);
  image3.id = '3';

  const image4 = document.createElement('img');
  image4.setAttribute('src', img4);
  image4.id = '4';

  templates.classList.add('layout-templates');

  templates.append(image1, image2, image3, image4);

  return templates;
}

function createTemplateElementsPanel(elements: string[]) {
  const templates = document.createElement('div');
  templates.classList.add('template-elements-block');
  for (let i = 0; i < elements.length; i++) {
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('template-elements-block__element');

    imgDiv.style.background = `url(${elements[i]})`;
    imgDiv.style.backgroundSize = 'contain';
    imgDiv.style.backgroundRepeat = 'no-repeat';

    imgDiv.addEventListener('click', () => {
      const container = document.querySelector('.container');
      container?.appendChild(
        createTemplateImg('150px', '150px', 'calc(50% - 75px)', 'calc(50% - 75px)', `url(${elements[i]})`),
      );
    });

    templates.appendChild(imgDiv);
  }
  return templates;
}

function createTemplateTextPanel() {
  const templates = document.createElement('div');
  templates.classList.add('template-text-block');

  const title = document.createElement('div');
  title.innerHTML = defaultTexsts.title;
  title.style.fontSize = '32px';

  const subtitle = document.createElement('div');
  subtitle.innerHTML = defaultTexsts.subtitle;
  subtitle.style.fontSize = '24px';

  const text = document.createElement('div');
  text.innerHTML = defaultTexsts.text;
  text.style.fontSize = '16px';

  title.addEventListener('click', () => {
    const container = document.querySelector('.container');
    const textArea = createTemplateTextArea('200px', 'calc(50% - 100px)', 'calc(50% - 40px)');
    const txt = createTemplateText(defaultTexsts.title, 'Noto Sans', '32px', 'black', 'center');
    textArea.appendChild(txt);
    container?.appendChild(textArea);
  });

  subtitle.addEventListener('click', () => {
    const container = document.querySelector('.container');
    const textArea = createTemplateTextArea('200px', 'calc(50% - 100px)', 'calc(50% - 32px)');
    const txt = createTemplateText(defaultTexsts.title, 'Noto Sans', '24px', 'black', 'center');
    textArea.appendChild(txt);
    container?.appendChild(textArea);
  });

  text.addEventListener('click', () => {
    const container = document.querySelector('.container');
    const textArea = createTemplateTextArea('200px', 'calc(50% - 100px)', 'calc(50% - 24px)');
    const txt = createTemplateText(defaultTexsts.title, 'Noto Sans', '16px', 'black', 'center');
    textArea.appendChild(txt);
    container?.appendChild(textArea);
  });

  templates.append(title, subtitle, text);

  return templates;
}

export const elementPanelTemplates = createTemplateElementsPanel(tempElementsArr);
export const businessCardsPanelTemplates = createPanelTemplates(
  businessCard_1,
  businessCard_2,
  businessCard_3,
  businessCard_4,
);
export const textPanelTemplates = createTemplateTextPanel();

businessCardsPanelTemplates.addEventListener('click', (event) => {
  const canvas = document.querySelector('.layout-canvas');
  if (canvas) canvas.innerHTML = '';
  const target = event.target;
  const template = new BusinessCardTemplates();

  if (target instanceof HTMLImageElement) {
    const card = template.render(target?.id);
    canvas?.append(card);
  }
});
