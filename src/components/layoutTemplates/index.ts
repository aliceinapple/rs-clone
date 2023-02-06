import businessCard_1 from '../../assets/templateImages/businessCard_1.png';
import businessCard_2 from '../../assets/templateImages/businessCard_2.png';
import businessCard_3 from '../../assets/templateImages/businessCard_3.png';
import businessCard_4 from '../../assets/templateImages/businessCard_4.png';
import { BusinessCardTemplates } from './businessCard';

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

export const businessCardsPanelTemplates = createPanelTemplates(
  businessCard_1,
  businessCard_2,
  businessCard_3,
  businessCard_4,
);

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
