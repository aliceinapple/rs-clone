import { ILayoutTemplate, MainCardTemplate } from '../../../types/interfaces';
import { copyElement, deleteElement, dragNdrop } from '../elementsActions';
import { setTargetTextElement } from '../targetElement';

export class Template {
  data: MainCardTemplate;

  constructor(data: MainCardTemplate) {
    this.data = data;
  }

  create() {
    const container: HTMLDivElement = document.createElement('div');
    container.classList.add('container');
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
    const card = new LayOutTemplate(size, 'white');

    return card.add();
  }

  render(id: string, cards: HTMLDivElement[]) {
    let card: HTMLDivElement = document.createElement('div');

    for (let i = 0; i < cards.length; i++) {
      if (Number(id) === i) {
        card = cards[i];
        break;
      }
    }

    return card;
  }
}
