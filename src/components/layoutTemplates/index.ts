import {
  createTemplateImg,
  createTemplateShape,
  createTemplateText,
  createTemplateTextArea,
} from './elementsTemplate';
import { defaultTexsts, elemStyleTemplates, tempElementsArr } from '../../data/layoutTemplateData';
import { ICreateTemplate } from '../../types/interfaces';

export function createPanelTemplates(cardsType: string, width: number, height: number, images: string[]) {
  const templates = document.createElement('div');
  templates.classList.add('layout-templates');

  for (let i = 0; i < images.length; i++) {
    const image = document.createElement('img');
    image.setAttribute('src', images[i]);
    image.width = width;
    image.height = height;
    image.id = `${i}`;
    image.classList.add(cardsType);
    templates.append(image);
  }

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
      const container = document.querySelector('.container') as HTMLDivElement;

      if (elements[i].includes('ico_load_photo')) {
        container?.appendChild(
          createTemplateImg('150px', '150px', 'calc(50% - 75px)', 'calc(50% - 75px)', elemStyleTemplates.isLoad),
        );
      } else {
        container?.appendChild(
          createTemplateImg('150px', '150px', 'calc(50% - 75px)', 'calc(50% - 75px)', elements[i]),
        );
      }
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

  const shapes = document.createElement('div');
  shapes.classList.add('template-text-block_shapes');

  const textElem = document.createElement('p');
  textElem.innerHTML = 'Элементы:';

  const circl = document.createElement('div');
  circl.classList.add('template-text-block_circle');
  const square = document.createElement('div');
  square.classList.add('template-text-block_square');

  shapes.append(textElem, square, circl);

  circl.addEventListener('click', () => {
    const container = document.querySelector('.container');
    const crcl = createTemplateShape('100px', '100px', 'calc(50% - 50px)', 'calc(50% - 50px)', 'black', '50%');

    container?.appendChild(crcl);
  });

  square.addEventListener('click', () => {
    const container = document.querySelector('.container');
    const sqr = createTemplateShape('100px', '100px', 'calc(50% - 50px)', 'calc(50% - 50px)', 'black');

    container?.appendChild(sqr);
  });

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
    const txt = createTemplateText(defaultTexsts.subtitle, 'Noto Sans', '24px', 'black', 'center');
    textArea.appendChild(txt);
    container?.appendChild(textArea);
  });

  text.addEventListener('click', () => {
    const container = document.querySelector('.container');
    const textArea = createTemplateTextArea('200px', 'calc(50% - 100px)', 'calc(50% - 24px)');
    const txt = createTemplateText(defaultTexsts.text, 'Noto Sans', '16px', 'black');
    textArea.appendChild(txt);
    container?.appendChild(textArea);
  });

  templates.append(title, subtitle, text, shapes);

  return templates;
}

export function createLayout(layout: HTMLDivElement, template: ICreateTemplate) {
  layout.addEventListener('click', (event) => {
    const canvas = document.querySelector('.layout-canvas');
    const target = event.target;

    if (target instanceof HTMLImageElement) {
      if (canvas) canvas.innerHTML = '';
      const card = template.render(target?.id, template.allTemplates());
      card.id = target.id;
      card.classList.add(target.className);
      canvas?.append(card);
    }
  });
}

export const elementPanelTemplates = createTemplateElementsPanel(tempElementsArr);
export const textPanelTemplates = createTemplateTextPanel();
