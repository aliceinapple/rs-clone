import { dragNdrop } from '../elementsActions';
import { Template } from '../mainTemplate';

export class BusinessCard {
  fieldSize = {
    width: '700px',
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
