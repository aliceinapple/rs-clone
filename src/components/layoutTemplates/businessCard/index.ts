import {
  createTemplateImg,
  createTemplateShape,
  createTemplateText,
  createTemplateTextArea,
} from '../elementsTemplate';
import mountains from '../../../assets/templateImages/mountains.png';
import flowers from '../../../assets/templateImages/flowers.png';
import qrCode from '../../../assets/templateImages/qrCode.png';
import { businessCardSize, defaultTexsts } from '../../../data/layoutTemplateData';

import businessCard_1 from '../../../assets/templateImages/businessCard_1.png';
import businessCard_2 from '../../../assets/templateImages/businessCard_2.png';
import businessCard_3 from '../../../assets/templateImages/businessCard_3.png';
import businessCard_4 from '../../../assets/templateImages/businessCard_4.png';
import { createLayout, createPanelTemplates } from '..';
import { CreateTemplates, LayOutTemplate } from '../mainTemplate';
import { ICreateTemplate } from '../../../types/interfaces';
import { TypesDesigne } from '../../../types/enums';

//Business cards templates

export class BusinessCardTemplates extends CreateTemplates implements ICreateTemplate {
  private createTemplate1() {
    const card = new LayOutTemplate(businessCardSize, 'black');

    const title = createTemplateTextArea('300px', '25px', '140px');
    title.appendChild(createTemplateText(defaultTexsts.title, 'Montserrat', '48px', 'white', 'center'));

    const info = createTemplateTextArea('280px', '390px', '150px');
    info.appendChild(createTemplateText(defaultTexsts.info, 'Montserrat', '20px', 'white', 'center'));

    const square = createTemplateShape('180px', '180px', '85px', '110px', 'white');

    const line = createTemplateShape('2px', '300px', '349px', '50px');
    line.style.background = 'white';

    return card.add(title, info, square, line);
  }

  private createTemplate2() {
    const card = new LayOutTemplate(businessCardSize, '#FCCE7A');

    const title = createTemplateTextArea('300px', '300px', '110px');
    title.appendChild(createTemplateText(defaultTexsts.title, 'Nunito', '48px', '#4F4F4F', 'center'));

    const info = createTemplateTextArea('250px', '60px', '290px');
    info.appendChild(createTemplateText(defaultTexsts.info, 'Nunito', '20px', '#4F4F4F'));

    const circle = createTemplateShape('230px', '230px', '400px', '50px', 'rgba(79, 79, 79, 0.3)', '50%');

    return card.add(title, info, circle);
  }

  private createTemplate3() {
    const card = new LayOutTemplate(businessCardSize, '#6987D3');

    const title = createTemplateTextArea('300px', '200px', '260px');
    title.appendChild(createTemplateText(defaultTexsts.title, 'Pacifico', '32px', 'white', 'center'));

    const image = createTemplateImg('150px', '150px', '275px', '100px', mountains);

    return card.add(title, image);
  }

  private createTemplate4() {
    const card = new LayOutTemplate(businessCardSize, 'white');

    const title = createTemplateTextArea('300px', '350px', '70px');
    title.appendChild(createTemplateText(defaultTexsts.title, 'Caveat', '32px', '#3E544F', 'center'));
    const title2 = createTemplateTextArea('300px', '350px', '130px');
    title2.appendChild(createTemplateText(defaultTexsts.title, 'Noto Sans', '24px', '#3E544F', 'center'));

    const image = createTemplateImg('400px', '400px', '-90px', '145px', flowers);
    const image2 = createTemplateImg('100px', '100px', '450px', '200px', qrCode);

    return card.add(title, title2, image, image2);
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

const images = [businessCard_1, businessCard_2, businessCard_3, businessCard_4];
export const businessCardsPanelTemplates = createPanelTemplates(TypesDesigne.VisitCard, 240, 135, images);

const template = new BusinessCardTemplates();
createLayout(businessCardsPanelTemplates, template);
