import { createTemplateImg, createTemplateShape, createTemplateText, createTemplateTextArea } from './elementsTemplate';
import { defaultTexsts, elemStyleTemplates, tempElementsArr } from '../../data/layoutTemplateData';

export function createPanelTemplates(
  width: number,
  height: number,
  img1: string,
  img2: string,
  img3: string,
  img4: string,
) {
  const templates = document.createElement('div');

  const image1 = document.createElement('img');
  image1.setAttribute('src', img1);
  image1.width = width;
  image1.height = height;
  image1.id = '1';

  const image2 = document.createElement('img');
  image2.setAttribute('src', img2);
  image2.width = width;
  image2.height = height;
  image2.id = '2';

  const image3 = document.createElement('img');
  image3.setAttribute('src', img3);
  image3.width = width;
  image3.height = height;
  image3.id = '3';

  const image4 = document.createElement('img');
  image4.setAttribute('src', img4);
  image4.width = width;
  image4.height = height;
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

      if (elements[i].includes('ico_load_photo')) {
        container?.appendChild(
          createTemplateImg('150px', '150px', 'calc(50% - 75px)', 'calc(50% - 75px)', elemStyleTemplates.isLoad),
        );
      } else {
        container?.appendChild(
          createTemplateImg('150px', '150px', 'calc(50% - 75px)', 'calc(50% - 75px)', `url(${elements[i]})`),
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
    const crcl = createTemplateShape(
      '100px',
      '100px',
      'calc(50% - 50px)',
      'calc(50% - 50px)',
      '1px solid black',
      '50%',
    );

    container?.appendChild(crcl);
  });

  square.addEventListener('click', () => {
    const container = document.querySelector('.container');
    const sqr = createTemplateShape('100px', '100px', 'calc(50% - 50px)', 'calc(50% - 50px)', '1px solid black');

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

export const elementPanelTemplates = createTemplateElementsPanel(tempElementsArr);
export const textPanelTemplates = createTemplateTextPanel();
