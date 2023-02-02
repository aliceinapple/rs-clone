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

// export function resize(element: HTMLDivElement, handle: HTMLDivElement) {
//   let isResizing = false;
//   let startingWidth: number, startingHeight: number, startingX: number, startingY: number;

//   element.addEventListener('click', () => {
//     handle.style.display = 'block';
//   });

//   document.body.addEventListener('click', (event) => {
//     const target = event.target;

//     if (target instanceof HTMLDivElement) {
//       if (target !== element) {
//         handle.style.display = 'none';
//       }
//     }
//   });

//   handle.addEventListener('mousedown', (event) => {
//     isResizing = true;
//     startingWidth = element.offsetWidth;
//     startingHeight = element.offsetHeight;
//     startingX = event.clientX;
//     startingY = event.clientY;
//   });
//   document.addEventListener('mousemove', (event) => {
//     if (!isResizing) return;
//     const deltaX = event.clientX - startingX;
//     const deltaY = event.clientY - startingY;
//     element.style.width = startingWidth + deltaX + 'px';
//     element.style.height = startingHeight + deltaY + 'px';

//     handle.style.width = startingWidth + deltaX + 'px';
//     handle.style.height = startingHeight + deltaY + 'px';
//   });
//   document.addEventListener('mouseup', () => {
//     isResizing = false;
//   });
// }

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
