import { createHtmlElement } from '../../utils/index';
import card1 from '../../assets/card/card-1.png';
import card2 from '../../assets/card/card-2.png';
import card3 from '../../assets/card/card-3.png';
import card4 from '../../assets/card/card-4.png';

const templatesNames = ['Открытка', 'Логотип', 'Визитная карточка', 'Резюме'];
const templatesImg = [card1, card2, card3, card4];

const createViewTemplates = (className: string, id: number, text: string) => {
  const block = createHtmlElement('div', 'templates-block__template-card');
  block.classList.add(className);
  const img = createHtmlElement('img', 'template-card__img');
  img.setAttribute('src', templatesImg[id]);
  img.setAttribute('alt', 'card');
  const title = createHtmlElement('p', 'template-card__title');
  title.textContent = text;
  block.append(img, title);

  return block;
};

export const createMainContent = () => {
  const main = createHtmlElement('main', 'main');
  const wrapper = createHtmlElement('div', 'main__wrapper');

  const banner = createHtmlElement('div', 'banner');
  banner.textContent = '';
  const templatesBlock = createHtmlElement('div', 'templates-block');
  
  templatesNames.forEach((item, index) => {
    const card = createViewTemplates(`card-${index + 1}`, index, item);
    templatesBlock.append(card);
  });

  const latestDesigns = createHtmlElement('div', 'lates-designs-block');
  const latestDesignsTitle = createHtmlElement('p', 'lates-designs-block__title');
  latestDesignsTitle.textContent = 'Последние дизайны';
  const bg = createHtmlElement('div', 'lates-designs-block__bg-block');
  const bgImg = createHtmlElement('div', 'bg-block__img');
  const bgTitle = createHtmlElement('p', 'bg-block__title');
  bgTitle.textContent = 'Здесь будут отображаться дизайны, которые вы создаете';
  bg.append(bgImg, bgTitle);
  latestDesigns.append(latestDesignsTitle, bg);

  wrapper.append(banner, templatesBlock, latestDesigns);
  main.append(wrapper);
  return main;
};
