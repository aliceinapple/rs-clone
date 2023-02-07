import { createPanelTemplates } from '..';
import { defaultTexsts } from '../../../data/layoutTemplateData';
import { dragNdrop } from '../elementsActions';
import { createTemplateShape, createTemplateText, createTemplateTextArea } from '../elementsTemplate';
import { Template } from '../mainTemplate';

import postCard_1 from '../../../assets/templateImages/cats.png';
import postCard_2 from '../../../assets/templateImages/cats.png';
import postCard_3 from '../../../assets/templateImages/cats.png';
import postCard_4 from '../../../assets/templateImages/cats.png';

export class PostCard {
  fieldSize = {
    width: '600px',
    height: '400px',
  };

  color: string;

  constructor(color: string) {
    this.color = color;
  }

  create() {
    const newField = new Template(this.fieldSize);
    const field: HTMLDivElement = newField.create();
    field.style.background = this.color;
    field.style.position = 'relative';
    field.style.overflow = 'hidden';

    return field;
  }

  add(...rest: HTMLDivElement[]): HTMLDivElement {
    const card: HTMLDivElement = this.create();
    card.append(...rest);
    dragNdrop(card);

    return card;
  }
}

//Post cards templates

export class PostCardTemplates {
  createEmptyTemplate() {
    const card = new PostCard('white');
    return card.add();
  }

  createTemplate1() {
    const card = new PostCard('#4A677B');

    const title = createTemplateTextArea('300px', '25px', '140px');
    title.appendChild(createTemplateText(defaultTexsts.birthday, 'Montserrat', '48px', 'white', 'center'));

    return card.add(title);
  }

  createTemplate2() {
    const card = new PostCard('#FCCE7A');

    const title = createTemplateTextArea('300px', '300px', '110px');
    title.appendChild(createTemplateText(defaultTexsts.title, 'Nunito', '48px', '#4F4F4F', 'center'));

    const info = createTemplateTextArea('250px', '60px', '290px');
    info.appendChild(createTemplateText(defaultTexsts.info, 'Nunito', '20px', '#4F4F4F'));

    const circle = createTemplateShape('230px', '230px', '400px', '50px', '5px solid rgba(79, 79, 79, 0.3)', '50%');

    return card.add(title, info, circle);
  }

  createTemplate3() {
    const card = new PostCard('#6987D3');

    const title = createTemplateTextArea('300px', '200px', '260px');
    title.appendChild(createTemplateText(defaultTexsts.title, 'Pacifico', '32px', 'white', 'center'));

    return card.add(title);
  }

  createTemplate4() {
    const card = new PostCard('white');

    const title = createTemplateTextArea('300px', '350px', '70px');
    title.appendChild(createTemplateText(defaultTexsts.title, 'Caveat', '32px', '#3E544F', 'center'));
    const title2 = createTemplateTextArea('300px', '350px', '130px');
    title2.appendChild(createTemplateText(defaultTexsts.title, 'Noto Sans', '24px', '#3E544F', 'center'));

    return card.add(title, title2);
  }

  render(id: string) {
    let card: HTMLDivElement = document.createElement('div');

    switch (id) {
      case '1':
        card = this.createTemplate1();
        break;
      case '2':
        card = this.createTemplate2();
        break;
      case '3':
        card = this.createTemplate3();
        break;
      case '4':
        card = this.createTemplate4();
        break;
    }

    return card;
  }
}

export const postCardsPanelTemplates = createPanelTemplates(240, 135, postCard_1, postCard_2, postCard_3, postCard_4);

postCardsPanelTemplates.addEventListener('click', (event) => {
  const canvas = document.querySelector('.layout-canvas');
  if (canvas) canvas.innerHTML = '';
  const target = event.target;
  const template = new PostCardTemplates();

  if (target instanceof HTMLImageElement) {
    const card = template.render(target?.id);
    canvas?.append(card);
  }
});
