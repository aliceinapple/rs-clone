import { createPanelTemplates } from '..';
import logo_1 from '../../../assets/templateImages/logo_1.png';
import logo_2 from '../../../assets/templateImages/logo_2.png';
import logo_3 from '../../../assets/templateImages/logo_3.png';
import logo_4 from '../../../assets/templateImages/logo_4.png';
import { logoCardSize } from '../../../data/layoutTemplateData';
import { LayOutTemplate } from '../mainTemplate';

import monica from '../../../assets/templateImages/monica.png';
import minimalism_mountains from '../../../assets/templateImages/minimalism_mountains.png';
import gold_ring from '../../../assets/templateImages/gold_ring.png';
import fashion_girl from '../../../assets/templateImages/fashion_girl.png';

import { createTemplateImg, createTemplateText, createTemplateTextArea } from '../elementsTemplate';

//Post cards templates

export class LogoTemplates {
  createEmptyTemplate() {
    const card = new LayOutTemplate(logoCardSize, 'white');

    return card.add();
  }

  createTemplate1() {
    const card = new LayOutTemplate(logoCardSize, 'white');

    const img = createTemplateImg('220px', '220px', '95px', '47px', monica);
    const title = createTemplateTextArea('250px', '70px', '265px');
    title.appendChild(createTemplateText('Моника', 'Marck Script', '60px', 'black', 'center'));
    const text = createTemplateTextArea('200px', '95px', '340px');
    text.appendChild(createTemplateText('Винтажный магазин', 'Marck Script', '16px', 'black', 'center'));

    return card.add(img, title, text);
  }

  createTemplate2() {
    const card = new LayOutTemplate(logoCardSize, 'white');

    const img = createTemplateImg('270px', '270px', '65px', '65px', gold_ring);
    const title = createTemplateTextArea('300px', '50px', '140px');
    title.appendChild(createTemplateText('Sweetness', 'Miss Fajardose', '100px', '#B19C77', 'center'));

    return card.add(img, title);
  }

  createTemplate3() {
    const card = new LayOutTemplate(logoCardSize, '#B8D3E0');

    const img = createTemplateImg('300px', '300px', '50px', '50px', minimalism_mountains);
    const title = createTemplateTextArea('300px', '50px', '200px');
    title.appendChild(createTemplateText('Кофейня «Сьерра»', 'Cormorant Infant', '32px', '#303030', 'center'));

    return card.add(img, title);
  }

  createTemplate4() {
    const card = new LayOutTemplate(logoCardSize, '#E6E6E5');

    const img = createTemplateImg('250px', '250px', '75px', '75px', fashion_girl);
    const title = createTemplateTextArea('400px', '0', '265px');
    title.appendChild(createTemplateText('Fashion boutique', 'Aboreto', '32px', '#303030', 'center'));

    return card.add(img, title);
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

export const logoPanelTemplates = createPanelTemplates(200, 200, logo_1, logo_2, logo_3, logo_4);

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
