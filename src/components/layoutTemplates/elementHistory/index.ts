export function addElementHistory(elem: HTMLDivElement) {
  interface ElementState {
    id: string;
    width: string;
    height: string;
  }

  const elementsHistory: { [key: string]: ElementState[] } = {};
  const elementsPointer: { [id: string]: number } = {};

  function saveState(element: HTMLDivElement) {
    const id = element.id;
    if (!elementsHistory[id]) {
      elementsHistory[id] = [];
      elementsPointer[id] = -1;
    }
    const currentState = {
      id: element.id,
      width: element.style.width,
      height: element.style.height,
    };
    elementsHistory[id].push(currentState);
    elementsPointer[id]++;
  }

  function undo(element: HTMLDivElement) {
    const id = element.id;
    const elementHistory = elementsHistory[id];
    if (!elementHistory || elementsPointer[id] < 1) {
      return;
    }
    elementsPointer[id]--;
    const previousState = elementHistory[elementsPointer[id]];
    element.style.width = previousState.width;
    element.style.height = previousState.height;
  }

  function redo(element: HTMLElement) {
    const id = element.id;
    const elementHistory = elementsHistory[id];
    if (!elementHistory || elementsPointer[id] === elementHistory.length - 1) {
      return;
    }
    elementsPointer[id]++;
    const currentState = elementHistory[elementsPointer[id]];
    element.style.width = currentState.width;
    element.style.height = currentState.height;
  }

  let timeoutId: NodeJS.Timeout | null = null;

  const observer = new MutationObserver(() => {
    return new Promise((resolve)  => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        saveState(elem);
        timeoutId = null;
        resolve(void 0);
      }, 1000);
    });
  });

  observer.observe(elem, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  });

  const undoBtn = document.querySelector('.arrow-block__arrow-back') as HTMLDivElement;
  undoBtn.addEventListener('click', () => {
    undo(elem);
  });

  const redoBtn = document.querySelector('.arrow-block__arrow-forward') as HTMLDivElement;
  redoBtn.addEventListener('click', () => {
    redo(elem);
  });
}
