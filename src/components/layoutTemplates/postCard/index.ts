import { createLayout, createPanelTemplates } from '..';
import { defaultTexsts, postCardSize } from '../../../data/layoutTemplateData';
import { createTemplateImg, createTemplateText, createTemplateTextArea } from '../elementsTemplate';
import { CreateTemplates, LayOutTemplate } from '../mainTemplate';

import postCard_1 from '../../../assets/templateImages/postCard_1.png';
import postCard_2 from '../../../assets/templateImages/postCard_2.png';
import postCard_3 from '../../../assets/templateImages/postCard_3.png';
import postCard_4 from '../../../assets/templateImages/postCard_4.png';

import croco from '../../../assets/templateImages/croco.png';
import hb from '../../../assets/templateImages/hb.png';
import vine from '../../../assets/templateImages/vine.png';
import coctail from '../../../assets/templateImages/coctail.png';
import congrats from '../../../assets/templateImages/congrats.png';
import confetti from '../../../assets/templateImages/confetti.png';
import thankU from '../../../assets/templateImages/thankU.png';
import { TypesDesigne } from '../../../types/enums';

//Post cards templates

export class PostCardTemplates extends CreateTemplates {
  createTemplate1() {
    const card = new LayOutTemplate(postCardSize, '#82BFD3');

    const title = createTemplateTextArea('300px', '25px', '140px');
    title.appendChild(createTemplateText(defaultTexsts.birthday, 'Caveat', '48px', '#319D6B', 'center'));

    const img = createTemplateImg('302px', '257px', '261px', '65px', croco);

    return card.add(title, img);
  }

  createTemplate2() {
    const card = new LayOutTemplate(postCardSize, 'black');

    const img = createTemplateImg('342px', '236px', '131px', '109px', hb);

    return card.add(img);
  }

  createTemplate3() {
    const card = new LayOutTemplate(postCardSize, '#E6D0EB');

    const img = createTemplateImg('341px', '256px', '139px', '16px', congrats);
    const img2 = createTemplateImg('195px', '212px', '-33px', '171px', vine);
    const img3 = createTemplateImg('126px', '119px', '80px', '262px', coctail);

    return card.add(img, img2, img3);
  }

  createTemplate4() {
    const card = new LayOutTemplate(postCardSize, '#9FC1B7');

    const img = createTemplateImg('240px', '153px', '186px', '114px', thankU);
    const img1 = createTemplateImg('150px', '150px', '9px', '241px', confetti);
    const img2 = createTemplateImg('150px', '150px', '441px', '11px', confetti);
    const img3 = createTemplateImg('150px', '150px', '11px', '8px', confetti);
    const img4 = createTemplateImg('150px', '150px', '440px', '241px', confetti);

    return card.add(img, img1, img2, img3, img4);
  }

  allTemplates() {
    const card1 = this.createTemplate1();
    const card2 = this.createTemplate2();
    const card3 = this.createTemplate3();
    const card4 = this.createTemplate4();

    const arr = [card1, card2, card3, card4];
    return arr;
  }
}

const images = [postCard_1, postCard_2, postCard_3, postCard_4];
export const postCardsPanelTemplates = createPanelTemplates(TypesDesigne.Postcard, 220, 135, images);

const template = new PostCardTemplates();
createLayout(postCardsPanelTemplates, template);
