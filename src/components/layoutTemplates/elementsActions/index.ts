import { createElementTools } from '../elementsTemplate';

export function dragNdrop(container: HTMLDivElement) {
  let selectedElement: EventTarget | null;
  let isDragging = false;
  let initialX;
  let initialY;
  let currentX;
  let currentY;
  let xOffset = 0;
  let yOffset = 0;

  container.addEventListener('mousedown', function (event) {
    selectedElement = event.target;
    initialX = event.clientX;
    initialY = event.clientY;

    if (selectedElement instanceof HTMLDivElement) {
      if (selectedElement.hasAttribute('contentEditable')) {
        selectedElement = selectedElement.parentElement;
      }
    }

    if (
      selectedElement instanceof HTMLDivElement &&
      !selectedElement.classList.contains('container') &&
      !selectedElement.classList.contains('resize-handle')
    ) {
      xOffset = selectedElement.offsetLeft - initialX;
      yOffset = selectedElement.offsetTop - initialY;
    }
    isDragging = true;
  });

  container.addEventListener('mouseup', function () {
    selectedElement = null;
    isDragging = false;
  });

  container.addEventListener('mousemove', function (event) {
    if (!isDragging) return;
    currentX = event.clientX;
    currentY = event.clientY;
    if (
      selectedElement instanceof HTMLDivElement &&
      !selectedElement.classList.contains('container') &&
      !selectedElement.classList.contains('resize-handle')
    ) {
      selectedElement.style.left = currentX + xOffset + 'px';
      selectedElement.style.top = currentY + yOffset + 'px';
    }
  });
}

export function makeResizable(resizableElement: HTMLDivElement, resizeHandles: HTMLDivElement[]) {
  for (const handle of resizeHandles) {
    handle.addEventListener('mousedown', function (event) {
      event.preventDefault();
      document.body.style.userSelect = 'none';
      const handleClass = handle.classList[1];
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = parseInt(window.getComputedStyle(resizableElement).width, 10);
      const startHeight = parseInt(window.getComputedStyle(resizableElement).height, 10);
      const startLeft = parseInt(window.getComputedStyle(resizableElement).left, 10);
      const startTop = parseInt(window.getComputedStyle(resizableElement).top, 10);
      const startRight = parseInt(window.getComputedStyle(resizableElement).right, 10);
      const startBottom = parseInt(window.getComputedStyle(resizableElement).bottom, 10);

      function resize(e: MouseEvent) {
        let newWidth;
        let newHeight;
        let newLeft = startLeft;
        let newTop = startTop;
        let newRight = startRight;
        let newBottom = startBottom;

        if (handleClass === 'resize-handle-n') {
          newHeight = startHeight + (-e.clientY + startY);
          newTop = startTop + (e.clientY - startY);
        }
        if (handleClass === 'resize-handle-e') {
          newWidth = startWidth + (e.clientX - startX);
        }
        if (handleClass === 'resize-handle-s') {
          newHeight = startHeight + (e.clientY - startY);
        }
        if (handleClass === 'resize-handle-w') {
          newWidth = startWidth + (-e.clientX + startX);
          newLeft = startLeft + (e.clientX - startX);
        }

        if (handleClass === 'resize-handle-nw') {
          newWidth = startWidth + (-e.clientX + startX);
          newHeight = startHeight + (-e.clientY + startY);
          newLeft = startLeft + (e.clientX - startX);
          newTop = startTop + (e.clientY - startY);
        }
        if (handleClass === 'resize-handle-ne') {
          newWidth = startWidth + (e.clientX - startX);
          newHeight = startHeight + (-e.clientY + startY);
          newRight = startRight + (-e.clientX + startX);
          newTop = startTop + (e.clientY - startY);
        }
        if (handleClass === 'resize-handle-sw') {
          newWidth = startWidth + (-e.clientX + startX);
          newHeight = startHeight + (e.clientY - startY);
          newLeft = startLeft + (e.clientX - startX);
          newBottom = startBottom + (-e.clientY + startY);
        }
        if (handleClass === 'resize-handle-se') {
          newWidth = startWidth + (e.clientX - startX);
          newHeight = startHeight + (e.clientY - startY);
        }

        resizableElement.style.width = `${newWidth}px`;
        resizableElement.style.height = `${newHeight}px`;
        resizableElement.style.left = `${newLeft}px`;
        resizableElement.style.top = `${newTop}px`;
        resizableElement.style.right = `${newRight}px`;
        resizableElement.style.bottom = `${newBottom}px`;
      }
      function stopResize() {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
        document.body.style.userSelect = '';
      }

      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    });
  }
}

export function showHandles(element: HTMLDivElement, handles: HTMLDivElement[], elementTools: HTMLDivElement) {
  element.addEventListener('click', () => {
    handles.forEach((handle) => (handle.style.display = 'block'));
    elementTools.style.display = 'flex';
  });

  document.body.addEventListener('click', (event) => {
    let target = event.target as HTMLDivElement;

    if (target instanceof HTMLDivElement) {
      if (target.hasAttribute('contentEditable')) {
        target = target.parentElement as HTMLDivElement;
      }

      if (
        target.classList[0] &&
        target !== element &&
        !target.classList[0].includes('resize-handle') &&
        !target.closest('.paint-block__control-panel') &&
        target.parentElement !== elementTools
      ) {
        handles.forEach((handle) => (handle.style.display = 'none'));
        elementTools.style.display = 'none';
      }
    }
  });
}

export function deleteElement(template: HTMLDivElement) {
  let target: HTMLDivElement;

  template.addEventListener('click', (event) => {
    target = event.target as HTMLDivElement;

    if (target.hasAttribute('contentEditable')) {
      target = target.parentElement as HTMLDivElement;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Delete') if (target.parentElement === template) template.removeChild(target);
  });
}

export function copyElement(template: HTMLDivElement) {
  let target: HTMLDivElement;
  template.addEventListener('click', (event) => {
    target = event.target as HTMLDivElement;

    if (target.hasAttribute('contentEditable')) {
      target = target.parentElement as HTMLDivElement;
    }
  });

  document.addEventListener('keydown', function (e) {
    let copiedElement = target as Node;

    if (e.ctrlKey && e.key === 'c') {
      copiedElement = target.cloneNode(true);
    } else if (e.ctrlKey && e.key === 'v') {
      e.preventDefault();
      const pasteElement = template;
      const copy = copiedElement.cloneNode(true) as HTMLDivElement;

      const handles = copy.querySelectorAll('.resize-handle');
      const divElements = Array.from(handles).filter((node) => node instanceof HTMLDivElement) as HTMLDivElement[];

      const tools = copy.querySelector('.element-tools') as HTMLDivElement;
      if (tools) copy.removeChild(tools);

      const copyTools = createElementTools(copy);
      copy.appendChild(copyTools);

      makeResizable(copy, divElements);
      showHandles(copy, divElements, copyTools);

      if (copiedElement) pasteElement.appendChild(copy);
    }
  });
}

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

export function checkTextStyle(
  element: HTMLDivElement | null,
  underline: HTMLDivElement,
  bold: HTMLDivElement,
  italic: HTMLDivElement,
  fontSize: HTMLInputElement,
) {
  if (element && element.style.textDecoration === 'underline') {
    underline.classList.add('selected');
  } else {
    underline.classList.remove('selected');
  }

  if (element && element.style.fontWeight === '900') {
    bold.classList.add('selected');
  } else {
    bold.classList.remove('selected');
  }

  if (element && element.style.fontStyle === 'italic') {
    italic.classList.add('selected');
  } else {
    italic.classList.remove('selected');
  }

  if (element) fontSize.value = element.style.fontSize.replace('px', '');
}

export function addElementToolsActions(
  element: HTMLDivElement,
  copy: HTMLDivElement,
  del: HTMLDivElement,
  color: HTMLInputElement,
  bgColor: HTMLInputElement,
  front: HTMLDivElement,
  back: HTMLDivElement,
) {
  copy.addEventListener('click', () => {
    const parent = element.parentElement;
    const copyElem = element.cloneNode(true) as HTMLDivElement;

    const handles = copyElem.querySelectorAll('.resize-handle');
    const divElements = Array.from(handles).filter((node) => node instanceof HTMLDivElement) as HTMLDivElement[];

    const tools = copyElem.querySelector('.element-tools');
    if (tools) copyElem.removeChild(tools);

    const copyTools = createElementTools(copyElem);
    copyElem.appendChild(copyTools);

    makeResizable(copyElem, divElements);
    showHandles(copyElem, divElements, copyTools);

    parent?.appendChild(copyElem);
  });

  del.addEventListener('click', () => {
    const parent = element.parentElement;
    parent?.removeChild(element);
  });

  color.addEventListener('input', () => {
    const child = element.querySelector('[contentEditable = "true"]') as HTMLDivElement;
    if (child) {
      child.style.color = color.value;
    } else {
      element.style.border = `${parseInt(element.style.border)}px solid ${color.value}`;
    }
  });

  bgColor.addEventListener('input', () => {
    element.style.background = bgColor.value;
  });

  front.addEventListener('click', () => {
    const maxZIndex: number[] = [];
    const parent = element.parentElement;
    const children = parent?.querySelectorAll('.template-element');
    if (children)
      for (const child of children) {
        if (child instanceof HTMLDivElement) {
          maxZIndex.push(Number(child.style.zIndex));
        }
      }

    if (Number(element.style.zIndex) > Math.max(...maxZIndex)) {
      element.style.zIndex = String(Math.max(...maxZIndex));
      return;
    }
    element.style.zIndex = String(Number(element.style.zIndex) + 1);
  });

  back.addEventListener('click', () => {
    if (Number(element.style.zIndex) === 0) {
      element.style.zIndex = '1';
      return;
    }
    element.style.zIndex = String(Number(element.style.zIndex) - 1);
  });
}

export function fontSizeBtnsActions(
  fontSizePlus: HTMLDivElement,
  fontSizeMinus: HTMLDivElement,
  fontSizeInput: HTMLInputElement,
) {
  fontSizePlus.addEventListener('click', () => {
    fontSizeInput.value = String(Number(fontSizeInput.value) + 1);
    if (targetTextElement) targetTextElement.style.fontSize = `${fontSizeInput.value}px`;
  });

  fontSizeMinus.addEventListener('click', () => {
    fontSizeInput.value = String(Number(fontSizeInput.value) - 1);
    if (Number(fontSizeInput.value) < 2) fontSizeInput.value = '1';
    if (targetTextElement) targetTextElement.style.fontSize = `${fontSizeInput.value}px`;
  });

  fontSizeInput.addEventListener('input', () => {
    if (targetTextElement) targetTextElement.style.fontSize = `${fontSizeInput.value}px`;
  });
}

export function fontStyleBtnsActions(underlined: HTMLDivElement, bold: HTMLDivElement, italic: HTMLDivElement) {
  underlined.addEventListener('click', () => {
    underlined.classList.toggle('selected');
    if (targetTextElement) {
      if (underlined.classList.contains('selected')) {
        targetTextElement.style.textDecoration = 'underline';
      } else {
        targetTextElement.style.textDecoration = 'none';
      }
    }
  });

  bold.addEventListener('click', () => {
    bold.classList.toggle('selected');
    if (targetTextElement) {
      if (bold.classList.contains('selected')) {
        targetTextElement.style.fontWeight = '900';
      } else {
        targetTextElement.style.fontWeight = '100';
      }
    }
  });

  italic.addEventListener('click', () => {
    italic.classList.toggle('selected');
    if (targetTextElement) {
      if (italic.classList.contains('selected')) {
        targetTextElement.style.fontStyle = 'italic';
      } else {
        targetTextElement.style.fontStyle = 'normal';
      }
    }
  });
}

export function fontAlignBtnsActions(left: HTMLDivElement, right: HTMLDivElement, center: HTMLDivElement) {
  left.addEventListener('click', () => {
    if (targetTextElement) targetTextElement.style.textAlign = 'left';
  });

  right.addEventListener('click', () => {
    if (targetTextElement) targetTextElement.style.textAlign = 'right';
  });

  center.addEventListener('click', () => {
    if (targetTextElement) targetTextElement.style.textAlign = 'center';
  });
}
