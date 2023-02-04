import { MainCardTemplate } from '../../../types/interfaces';
import { copyElement, deleteElement } from '../elementsActions';

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

    return container;
  }
}
