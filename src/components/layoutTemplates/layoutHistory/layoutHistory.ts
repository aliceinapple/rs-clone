import { ElemProps } from '../../../types/types';

export let historyStack: ElemProps[] = [];
let stackLength = historyStack.length;
let alreadyCalled = false;

function decreaseStackLength() {
  if (!alreadyCalled) {
    stackLength--;
    alreadyCalled = true;
  }
}

export function saveElemProperties(elemProps: ElemProps) {
  alreadyCalled = false;
  const obj = elemProps;

  if (stackLength < historyStack.length) {
    historyStack = historyStack.slice(0, stackLength);
  }

  if (historyStack.length > 0) {
    if (JSON.stringify(historyStack[historyStack.length - 1]) !== JSON.stringify(elemProps)) {
      historyStack.push(obj);
      stackLength = historyStack.length;
    }
  } else if (historyStack.length === 0) {
    historyStack.push(obj);
    stackLength = historyStack.length;
  }
}

function changeElemProps() {
  const obj: ElemProps = historyStack[stackLength];

  if (obj?.elem) {
    const child = obj.elem.querySelector('[contentEditable = "true"]') as HTMLDivElement;

    if (obj.width) obj.elem.style.width = obj.width;
    if (obj.height) obj.elem.style.height = obj.height;
    if (obj.x) obj.elem.style.left = obj.x;
    if (obj.y) obj.elem.style.top = obj.y;
    if (obj.zIndex) obj.elem.style.zIndex = obj.zIndex;
    if (obj.borderWidth) obj.elem.style.borderWidth = obj.borderWidth;
    if (obj.borderStyle) obj.elem.style.borderStyle = obj.borderStyle;
    if (obj.borderRadius) obj.elem.style.borderRadius = obj.borderRadius;
    if (obj.borderColor) obj.elem.style.borderColor = obj.borderColor;
    if (obj.bgColor) obj.elem.style.background = obj.bgColor;
    if (obj.transform) obj.elem.style.transform = obj.transform;

    if (obj.containerColor) obj.elem.style.background = obj.containerColor;

    if (obj.textContent) child.innerHTML = obj.textContent;
    if (obj.fontFamily) child.style.fontFamily = obj.fontFamily;
    if (obj.fontSize) child.style.fontSize = obj.fontSize;
    if (obj.fontStyle) child.style.fontStyle = obj.fontStyle;
    if (obj.textDecoration) child.style.textDecoration = obj.textDecoration;
    if (obj.fontWeight) child.style.fontWeight = obj.fontWeight;
    if (obj.textAlign) child.style.textAlign = obj.textAlign;
  }
}

export function undo() {
  stackLength--;
  if (stackLength < 1) {
    stackLength = 0;
  }
  if (historyStack.length > 1) {
    decreaseStackLength();
    changeElemProps();
  }
}

export function redo() {
  stackLength++;
  if (stackLength > historyStack.length) {
    alreadyCalled = false;
    stackLength = historyStack.length;
  } else if (stackLength < historyStack.length) {
    changeElemProps();
  }
}
