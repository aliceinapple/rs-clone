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

      function resize(e: MouseEvent) {
        let newWidth;
        let newHeight;

        if (handleClass.includes('w')) {
          newWidth = startWidth + (-e.clientX + startX);
        }
        if (handleClass.includes('e')) {
          newWidth = startWidth + (e.clientX - startX);
        }
        if (handleClass.includes('n')) {
          newHeight = startHeight + (-e.clientY + startY);
        }
        if (handleClass.includes('s')) {
          newHeight = startHeight + (e.clientY - startY);
        }

        console.log(newHeight);

        resizableElement.style.width = `${newWidth}px`;
        resizableElement.style.height = `${newHeight}px`;
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

export function showHandles(element: HTMLDivElement, handles: HTMLDivElement[]) {
  element.addEventListener('click', () => {
    handles.forEach((handle) => (handle.style.display = 'block'));
  });

  document.body.addEventListener('click', (event) => {
    const target = event.target;

    if (target instanceof HTMLDivElement) {
      if (target !== element) {
        handles.forEach((handle) => (handle.style.display = 'none'));
      }
    }
  });
}
