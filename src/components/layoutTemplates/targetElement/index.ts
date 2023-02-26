export let targetTextElement: HTMLDivElement | null;

export function setTargetTextElement(field: HTMLDivElement) {
  field.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLDivElement) {
      if (target.hasAttribute('contentEditable')) {
        targetTextElement = target;
      } else {
        targetTextElement = null;
      }
    }
  });
}
