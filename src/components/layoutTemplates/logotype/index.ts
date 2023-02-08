import { createPanelTemplates } from '..';
import resume_1 from '../../../assets/templateImages/postCard_1.png';
import resume_2 from '../../../assets/templateImages/postCard_2.png';
import resume_3 from '../../../assets/templateImages/postCard_3.png';
import resume_4 from '../../../assets/templateImages/postCard_4.png';
import { logoCardSize } from '../../../data/layoutTemplateData';
import { LayOutTemplate } from '../mainTemplate';

//Post cards templates

export class LogoTemplates {
  createEmptyTemplate() {
    const card = new LayOutTemplate(logoCardSize, 'white');
    return card.add();
  }

  createTemplate1() {
    const card = new LayOutTemplate(logoCardSize, '#82BFD3');

    return card.add();
  }

  createTemplate2() {
    const card = new LayOutTemplate(logoCardSize, 'black');

    return card.add();
  }

  createTemplate3() {
    const card = new LayOutTemplate(logoCardSize, '#E6D0EB');

    return card.add();
  }

  createTemplate4() {
    const card = new LayOutTemplate(logoCardSize, '#9FC1B7');

    return card.add();
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

export const logoPanelTemplates = createPanelTemplates(220, 135, resume_1, resume_2, resume_3, resume_4);

logoPanelTemplates.addEventListener('click', (event) => {
  const canvas = document.querySelector('.layout-canvas');
  if (canvas) canvas.innerHTML = '';
  const target = event.target;
  const template = new LogoTemplates();

  if (target instanceof HTMLImageElement) {
    const card = template.render(target?.id);
    canvas?.append(card);
  }
});