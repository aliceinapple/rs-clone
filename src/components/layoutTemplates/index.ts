import { BusinessCard } from './businessCard';
import { createTemplateImg, createTemplateShape, createTemplateText, defaultTexsts } from './elementsTemplate';
import mountains from '../../assets/templateImages/mountains.png';
import flowers from '../../assets/templateImages/flowers.png';
import qrCode from '../../assets/templateImages/qrCode.png';

class BusinessCardTemplates {
  createTemplate1() {
    const card = new BusinessCard('black');

    const title = createTemplateText('300px', 'Montserrat', '48px', 'white', '25px', '140px', 'center');
    title.innerHTML = defaultTexsts.title;

    const info = createTemplateText('250px', 'Montserrat', '20px', 'white', '390px', '150px', 'center');
    info.innerHTML = defaultTexsts.info;

    const square = createTemplateShape('180px', '180px', '85px', '110px', '2px solid white');

    const line = createTemplateShape('2px', '300px', '349px', '50px');
    line.style.background = 'white';

    return card.add(title, info, square, line);
  }

  createTemplate2() {
    const card = new BusinessCard('#FCCE7A');

    const title = createTemplateText('300px', 'Nunito', '48px', '#4F4F4F', '300px', '110px', 'center');
    title.innerHTML = defaultTexsts.title;

    const info = createTemplateText('250px', 'Nunito', '20px', '#4F4F4F', '60px', '290px');
    info.innerHTML = defaultTexsts.info;

    const circle = createTemplateShape('230px', '230px', '400px', '50px', '5px solid rgba(79, 79, 79, 0.3)', '50%');

    return card.add(title, info, circle);
  }

  createTemplate3() {
    const card = new BusinessCard('#6987D3');

    const title = createTemplateText('300px', 'Pacifico', '32px', 'white', '200px', '260px', 'center');
    title.innerHTML = defaultTexsts.title;

    const image = createTemplateImg('150px', '150px', '275px', '100px', `url(${mountains})`);

    return card.add(title, image);
  }

  createTemplate4() {
    const card = new BusinessCard('white');

    const title = createTemplateText('300px', 'Caveat', '32px', '#3E544F', '350px', '70px', 'center');
    title.innerHTML = defaultTexsts.title;
    const title2 = createTemplateText('300px', 'Noto Sans', '24px', '#3E544F', '350px', '130px', 'center');
    title2.innerHTML = defaultTexsts.title;

    const image = createTemplateImg('400px', '400px', '-90px', '120px', `url(${flowers})`);
    const image2 = createTemplateImg('100px', '100px', '450px', '200px', `url(${qrCode})`);

    return card.add(title, title2, image, image2);
  }

  render() {
    document.body.append(
      this.createTemplate1(),
      this.createTemplate2(),
      this.createTemplate3(),
      this.createTemplate4(),
    );
  }
}

const create = new BusinessCardTemplates();
create.render();
