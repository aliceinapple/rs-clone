import { businessCardSize, postCardSize, resumeCardSize, logoCardSize } from '../../../data/layoutTemplateData';
import { TypesDesigne } from '../../../types/enums';
import { ILayoutTemplate, MainCardTemplate } from '../../../types/interfaces';
import { copyElement, deleteElement, dragNdrop } from '../elementsActions';
import { setProps } from '../elementsTemplate';
import { historyStack } from '../layoutHistory/layoutHistory';
import { setTargetTextElement } from '../targetElement';

export class Template {
  data: MainCardTemplate;

  constructor(data: MainCardTemplate) {
    this.data = data;
  }

  create() {
    const container: HTMLDivElement = document.createElement('div');
    container.classList.add('container');
    container.setAttribute('id', 'empty');
    container.style.width = this.data.width;
    container.style.height = this.data.height;
    deleteElement(container);
    copyElement(container);
    setTargetTextElement(container);

    return container;
  }
}

export class LayOutTemplate {
  fieldSize: MainCardTemplate;

  color: string;

  constructor(fieldSize: MainCardTemplate, color: string) {
    this.fieldSize = fieldSize;
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

export class CreateTemplates implements ILayoutTemplate {
  createEmptyTemplate(size: MainCardTemplate) {
    historyStack.length = 0;
    const card = new LayOutTemplate(size, 'white');

    const emptyTemplate = card.add();

    if (size === businessCardSize) emptyTemplate.classList.add(TypesDesigne.VisitCard);
    if (size === postCardSize) emptyTemplate.classList.add(TypesDesigne.Postcard);
    if (size === resumeCardSize) emptyTemplate.classList.add(TypesDesigne.Resume);
    if (size === logoCardSize) emptyTemplate.classList.add(TypesDesigne.Logo);

    setProps(emptyTemplate);
    emptyTemplate.addEventListener('click', () => setProps(emptyTemplate));
    emptyTemplate.addEventListener('mousedown', () => setProps(emptyTemplate));
    emptyTemplate.addEventListener('mouseup', () => setProps(emptyTemplate));
    emptyTemplate.addEventListener('touchstart', () => setProps(emptyTemplate));
    emptyTemplate.addEventListener('touchend', () => setProps(emptyTemplate));
    emptyTemplate.addEventListener('keydown', (event) => {
      if (!event.shiftKey) {
        setProps(emptyTemplate);
      }
    });

    return emptyTemplate;
  }

  render(id: string, cards: HTMLDivElement[]) {
    historyStack.length = 0;
    let card: HTMLDivElement = document.createElement('div');

    for (let i = 0; i < cards.length; i++) {
      if (Number(id) === i) {
        card = cards[i];
        break;
      }
    }

    setProps(card);
    card.addEventListener('click', () => setProps(card));
    card.addEventListener('mousedown', () => setProps(card));
    card.addEventListener('mouseup', () => setProps(card));
    card.addEventListener('touchstart', () => setProps(card));
    card.addEventListener('touchend', () => setProps(card));
    card.addEventListener('keydown', (event) => {
      if (!event.shiftKey) {
        setProps(card);
      }
    });

    return card;
  }
}
