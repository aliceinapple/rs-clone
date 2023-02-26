import { loadPhoto } from '../buttonActions';
import { createElementTools } from '../elementsTemplate';

export function dragNdrop(container: HTMLDivElement) {
  let selectedElement: EventTarget | null;
  let isDragging = false;

  function startMove(e: MouseEvent | TouchEvent) {
    let event;
    if (e instanceof MouseEvent) {
      event = e;
    } else if (e instanceof TouchEvent) {
      event = e.touches[0];
    }
    if (event) {
      selectedElement = event.target;
      if (selectedElement instanceof HTMLDivElement) {
        if (selectedElement.hasAttribute('contentEditable')) {
          selectedElement = selectedElement.parentElement;
        }
      }
    }

    if (
      selectedElement instanceof HTMLDivElement &&
      !selectedElement.classList.contains('container') &&
      !selectedElement.classList.contains('resize-handle')
    ) {
      selectedElement.style.cursor = 'grabbing';
    }
    isDragging = true;
  }

  function move(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    let event;
    if (e instanceof MouseEvent) {
      event = e;
    } else if (e instanceof TouchEvent) {
      event = e.touches[0];
    }
    if (event) {
      if (!isDragging) return;
      if (
        selectedElement instanceof HTMLDivElement &&
        !selectedElement.classList.contains('container') &&
        !selectedElement.classList.contains('resize-handle')
      ) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = selectedElement.getBoundingClientRect();
        const cursorX = event.clientX - containerRect.left;
        const cursorY = event.clientY - containerRect.top;
        selectedElement.style.left = `calc(${((cursorX - elementRect.width / 2) / containerRect.width) * 100}%`;
        selectedElement.style.top = `calc(${((cursorY - elementRect.height / 2) / containerRect.height) * 100}%`;
      }
    }
  }

  function stopMove() {
    if (
      selectedElement &&
      selectedElement instanceof HTMLDivElement &&
      !selectedElement.classList.contains('container') &&
      !selectedElement.classList.contains('resize-handle')
    ) {
      selectedElement.style.cursor = 'grab';
      selectedElement = null;
      isDragging = false;
    }
  }

  container.addEventListener('mousedown', startMove);
  container.addEventListener('mouseup', stopMove);
  container.addEventListener('mousemove', move);

  container.addEventListener('touchstart', startMove, { passive: false });
  container.addEventListener('touchend', stopMove, { passive: false });
  container.addEventListener('touchmove', move, { passive: false });
}

function rotateElement(element: HTMLDivElement, handle: HTMLDivElement) {
  let isDragging = false;
  let currentAngle = 0;
  let startX: number, startY: number, currentX, currentY, distanceX, distanceY;

  function startRotate(event: MouseEvent | TouchEvent) {
    let e;
    if (event instanceof MouseEvent) {
      e = event;
    } else if (event instanceof TouchEvent) {
      e = event.touches[0];
    }
    if (e) {
      isDragging = true;
      startX = e.pageX;
      startY = e.pageY;
      currentX = startX;
      currentY = startY;
    }
  }
  function rotate(event: MouseEvent | TouchEvent) {
    if (!isDragging) return;
    event.preventDefault();
    let e;
    if (event instanceof MouseEvent) {
      e = event;
    } else if (event instanceof TouchEvent) {
      e = event.touches[0];
    }
    if (e) {
      currentX = e.pageX;
      currentY = e.pageY;
      distanceX = currentX - startX;
      distanceY = currentY - startY;
      currentAngle = Math.atan2(distanceY, distanceX);
      if (element.style.transform.includes('scaleX(-1)')) {
        element.style.transform = `rotate(${currentAngle}rad) scaleX(-1)`;
      } else {
        element.style.transform = `rotate(${currentAngle}rad)`;
      }
    }
  }
  function endRotate() {
    isDragging = false;
  }

  handle.addEventListener('mousedown', startRotate);
  document.addEventListener('mouseup', endRotate);
  document.addEventListener('mousemove', rotate);

  handle.addEventListener('touchstart', startRotate, { passive: false });
  document.addEventListener('touchend', endRotate, { passive: false });
  document.addEventListener('touchmove', rotate, { passive: false });
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
        const isShiftPressed = e.shiftKey;

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
          if (isShiftPressed) {
            newWidth = startWidth + (-e.clientX + startX);
            newHeight = startHeight * (newWidth / startWidth);
          } else {
            newWidth = startWidth + (-e.clientX + startX);
            newHeight = startHeight + (-e.clientY + startY);
          }
          newLeft = startLeft + (e.clientX - startX);
          newTop = startTop + (e.clientY - startY);
        }

        if (handleClass === 'resize-handle-ne') {
          if (isShiftPressed) {
            newWidth = startWidth + (e.clientX - startX);
            newHeight = startHeight * (newWidth / startWidth);
          } else {
            newWidth = startWidth + (e.clientX - startX);
            newHeight = startHeight + (-e.clientY + startY);
          }
          newRight = startRight + (-e.clientX + startX);
          newTop = startTop + (e.clientY - startY);
        }

        if (handleClass === 'resize-handle-sw') {
          if (isShiftPressed) {
            newWidth = startWidth + (-e.clientX + startX);
            newHeight = startHeight * (newWidth / startWidth);
          } else {
            newWidth = startWidth + (-e.clientX + startX);
            newHeight = startHeight + (e.clientY - startY);
          }
          newLeft = startLeft + (e.clientX - startX);
          newBottom = startBottom + (-e.clientY + startY);
        }

        if (handleClass === 'resize-handle-se') {
          if (isShiftPressed) {
            newWidth = startWidth + (e.clientX - startX);
            newHeight = startHeight * (newWidth / startWidth);
          } else {
            newWidth = startWidth + (e.clientX - startX);
            newHeight = startHeight + (e.clientY - startY);
          }
        }
        if (handleClass === 'resize-handle-r') {
          rotateElement(resizableElement, handle);
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

    handle.addEventListener(
      'touchstart',
      function (event) {
        event.preventDefault();
        document.body.style.userSelect = 'none';
        const handleClass = handle.classList[1];
        const startX = event.touches[0].clientX;
        const startY = event.touches[0].clientY;
        const startWidth = parseInt(window.getComputedStyle(resizableElement).width, 10);
        const startHeight = parseInt(window.getComputedStyle(resizableElement).height, 10);
        const startLeft = parseInt(window.getComputedStyle(resizableElement).left, 10);
        const startTop = parseInt(window.getComputedStyle(resizableElement).top, 10);
        const startRight = parseInt(window.getComputedStyle(resizableElement).right, 10);
        const startBottom = parseInt(window.getComputedStyle(resizableElement).bottom, 10);

        function resize(e: TouchEvent) {
          let newWidth;
          let newHeight;
          let newLeft = startLeft;
          let newTop = startTop;
          let newRight = startRight;
          let newBottom = startBottom;

          if (handleClass === 'resize-handle-n') {
            newHeight = startHeight + (-e.touches[0].clientY + startY);
            newTop = startTop + (e.touches[0].clientY - startY);
          }
          if (handleClass === 'resize-handle-e') {
            newWidth = startWidth + (e.touches[0].clientX - startX);
          }
          if (handleClass === 'resize-handle-s') {
            newHeight = startHeight + (e.touches[0].clientY - startY);
          }
          if (handleClass === 'resize-handle-w') {
            newWidth = startWidth + (-e.touches[0].clientX + startX);
            newLeft = startLeft + (e.touches[0].clientX - startX);
          }

          if (handleClass === 'resize-handle-nw') {
            newWidth = startWidth + (-e.touches[0].clientX + startX);
            newHeight = startHeight + (-e.touches[0].clientY + startY);
            newLeft = startLeft + (e.touches[0].clientX - startX);
            newTop = startTop + (e.touches[0].clientY - startY);
          }
          if (handleClass === 'resize-handle-ne') {
            newWidth = startWidth + (e.touches[0].clientX - startX);
            newHeight = startHeight + (-e.touches[0].clientY + startY);
            newRight = startRight + (-e.touches[0].clientX + startX);
            newTop = startTop + (e.touches[0].clientY - startY);
          }
          if (handleClass === 'resize-handle-sw') {
            newWidth = startWidth + (-e.touches[0].clientX + startX);
            newHeight = startHeight + (e.touches[0].clientY - startY);
            newLeft = startLeft + (e.touches[0].clientX - startX);
            newBottom = startBottom + (-e.touches[0].clientY + startY);
          }
          if (handleClass === 'resize-handle-se') {
            newWidth = startWidth + (e.touches[0].clientX - startX);
            newHeight = startHeight + (e.touches[0].clientY - startY);
          }
          if (handleClass === 'resize-handle-r') {
            rotateElement(resizableElement, handle);
          }

          resizableElement.style.width = `${newWidth}px`;
          resizableElement.style.height = `${newHeight}px`;
          resizableElement.style.left = `${newLeft}px`;
          resizableElement.style.top = `${newTop}px`;
          resizableElement.style.right = `${newRight}px`;
          resizableElement.style.bottom = `${newBottom}px`;
        }

        function stopResize() {
          document.removeEventListener('touchmove', resize);
          document.removeEventListener('touchend', stopResize);
          document.body.style.userSelect = '';
        }

        document.addEventListener('touchmove', resize, { passive: false });
        document.addEventListener('touchend', stopResize, { passive: false });
      },
      { passive: false },
    );
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
        !target.classList.contains('element-tools') &&
        !target.className.includes('border') &&
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
    if (e.code === 'Delete') if (target?.parentElement === template) template.removeChild(target);
  });
}

export function giveCopyTools(copyElem: HTMLDivElement) {
  if (copyElem?.className.includes('preview')) {
    copyElem = loadPhoto(copyElem);
  }

  const handles = copyElem?.querySelectorAll('.resize-handle');
  if (handles) {
    const divElements = Array.from(handles).filter((node) => node instanceof HTMLDivElement) as HTMLDivElement[];

    const tools = copyElem.querySelector('.element-tools');
    if (tools) copyElem.removeChild(tools);

    const copyTools = createElementTools(copyElem);
    copyElem.appendChild(copyTools);

    makeResizable(copyElem, divElements);
    showHandles(copyElem, divElements, copyTools);

    return copyElem;
  }
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
    let copiedElement = target;

    if (e.ctrlKey && (e.key === 'c' || e.key === 'с')) {
      copiedElement = target?.cloneNode(true) as HTMLDivElement;
    } else if (e.ctrlKey && (e.key === 'v' || e.key === 'м')) {
      e.preventDefault();

      const pasteElement = template;
      const copy = copiedElement?.cloneNode(true) as HTMLDivElement;

      const copyElem = giveCopyTools(copy);
      if (copyElem) pasteElement.appendChild(copyElem);
    }
  });
}
