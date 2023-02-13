import { makeResizable, showHandles } from '../elementsActions';
import { createElementTools, setProps } from '../elementsTemplate';
import { targetTextElement, targetTextElementParent } from '../targetElement';

export function loadPhoto(preview: HTMLDivElement) {
  const fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('accept', '.jpg, .jpeg, .png, .svg');
  fileInput.classList.add('file-input');

  preview.classList.add('preview');

  preview.append(fileInput);

  fileInput.addEventListener('change', function () {
    if (fileInput.files) {
      const file = fileInput.files[0];
      const blob = new Blob([file]);
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.style.backgroundImage = `url(${reader.result})`;
      });

      reader.readAsDataURL(blob);
    }
  });

  return preview;
}

export function checkTextStyle(
  element: HTMLDivElement | null,
  underline: HTMLDivElement,
  bold: HTMLDivElement,
  italic: HTMLDivElement,
  fontSize: HTMLInputElement,
  select: HTMLSelectElement,
) {
  if (element && element.style.textDecoration === 'underline') {
    underline.classList.add('selected');
  } else {
    underline.classList.remove('selected');
  }

  if (element && element.style.fontWeight === 'bold') {
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

  if (element) {
    const font = element.style.fontFamily.replace(/['"]+/g, '');
    select.value = font;
  }
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
    let copyElem = element.cloneNode(true) as HTMLDivElement;

    if (copyElem?.className.includes('preview')) {
      copyElem = loadPhoto(copyElem);
    }

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

  color.addEventListener('change', () => {
    const child = element.querySelector('[contentEditable = "true"]') as HTMLDivElement;
    child.style.color = color.value;
    setProps(element);
  });

  bgColor.addEventListener('change', () => {
    element.style.background = bgColor.value;
    setProps(element);
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
    setProps(element);
  });

  back.addEventListener('click', () => {
    if (Number(element.style.zIndex) === 0) {
      element.style.zIndex = '1';
      return;
    }
    element.style.zIndex = String(Number(element.style.zIndex) - 1);
    setProps(element);
  });
}

export function borderStyleBtnsActions(
  element: HTMLDivElement,
  none: HTMLDivElement,
  solid: HTMLDivElement,
  dashed: HTMLDivElement,
  dotted: HTMLDivElement,
  color: HTMLInputElement,
  borderWidth: HTMLInputElement,
  borderRound: HTMLInputElement,
) {
  none.addEventListener('click', () => {
    element.style.border = 'none';
    setProps(element);
  });

  solid.addEventListener('click', () => {
    element.style.borderStyle = 'solid';
    element.style.borderWidth = `${borderWidth.value}px`;
    element.style.borderColor = color.value;
    setProps(element);
  });

  dashed.addEventListener('click', () => {
    element.style.borderStyle = 'dashed';
    element.style.borderWidth = `${borderWidth.value}px`;
    element.style.borderColor = color.value;
    setProps(element);
  });

  dotted.addEventListener('click', () => {
    element.style.borderStyle = 'dotted';
    element.style.borderWidth = `${borderWidth.value}px`;
    element.style.borderColor = color.value;
    setProps(element);
  });

  color.addEventListener('change', () => {
    element.style.borderColor = color.value;
    setProps(element);
  });

  borderWidth.addEventListener('input', () => {
    const pattern = /^\d{0,2}$/;
    const isValid = pattern.test(borderWidth.value);

    if (!isValid) {
      borderWidth.value = borderWidth.value.slice(0, -1);
    }
    element.style.borderWidth = `${borderWidth.value}px`;
    element.style.borderColor = color.value;

    setProps(element);
  });

  borderRound.addEventListener('input', () => {
    const pattern = /^\d{0,2}$/;
    const isValid = pattern.test(borderRound.value);

    if (!isValid) {
      borderRound.value = borderRound.value.slice(0, -1);
    }
    element.style.borderRadius = `${borderRound.value}%`;

    setProps(element);
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
    setProps(targetTextElementParent);
  });

  fontSizeMinus.addEventListener('click', () => {
    fontSizeInput.value = String(Number(fontSizeInput.value) - 1);
    if (Number(fontSizeInput.value) < 2) fontSizeInput.value = '1';
    if (targetTextElement) targetTextElement.style.fontSize = `${fontSizeInput.value}px`;
    setProps(targetTextElementParent);
  });

  fontSizeInput.addEventListener('input', () => {
    if (targetTextElement) targetTextElement.style.fontSize = `${fontSizeInput.value}px`;
    setProps(targetTextElementParent);
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
    setProps(targetTextElementParent);
  });

  bold.addEventListener('click', () => {
    bold.classList.toggle('selected');
    if (targetTextElement) {
      if (bold.classList.contains('selected')) {
        targetTextElement.style.fontWeight = 'bold';
      } else {
        targetTextElement.style.fontWeight = 'normal';
      }
    }
    setProps(targetTextElementParent);
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
    setProps(targetTextElementParent);
  });
}

export function fontAlignBtnsActions(left: HTMLDivElement, right: HTMLDivElement, center: HTMLDivElement) {
  left.addEventListener('click', () => {
    if (targetTextElement) targetTextElement.style.textAlign = 'left';
    setProps(targetTextElementParent);
  });

  right.addEventListener('click', () => {
    if (targetTextElement) targetTextElement.style.textAlign = 'right';
    setProps(targetTextElementParent);
  });

  center.addEventListener('click', () => {
    if (targetTextElement) targetTextElement.style.textAlign = 'center';
    setProps(targetTextElementParent);
  });
}
