import { ElemProps } from '../../../types/types';

export const historyStack: ElemProps[] = [];
let stackLength = historyStack.length;

export function saveElemProperties(elemProps: ElemProps) {
  const obj = elemProps;
  if (historyStack.length > 1) {
    if (JSON.stringify(historyStack[historyStack.length - 1]) !== JSON.stringify(elemProps)) {
      historyStack.push(obj);
      stackLength = historyStack.length;
    }
  } else {
    historyStack.push(obj);
    stackLength = historyStack.length;
  }
}

function changeElemProps() {
  const obj: ElemProps = historyStack[stackLength];
  if (obj?.elem) {
    if (obj.width) obj.elem.style.width = obj.width;
    if (obj.height) obj.elem.style.height = obj.height;
    if (obj.x) obj.elem.style.left = obj.x;
    if (obj.y) obj.elem.style.top = obj.y;
    if (obj.zIndex) obj.elem.style.zIndex = obj.zIndex;
    if (obj.borderWidth) obj.elem.style.borderWidth = obj.borderWidth;
    if (obj.borderStyle) obj.elem.style.borderStyle = obj.borderStyle;
    if (obj.borderRadius) obj.elem.style.borderRadius = obj.borderRadius;
    if (obj.borderColor) obj.elem.style.borderColor = obj.borderColor;
    if (obj.textContent) {
      obj.elem.innerHTML = obj.textContent;
    }
    if (obj.containerColor) obj.elem.style.background = obj.containerColor;
    if (obj.transform) obj.elem.style.transform = obj.transform;

    if (obj.bgColor) obj.elem.style.background = obj.bgColor;

    if (obj.fontFamily) obj.elem.style.fontFamily = obj.fontFamily;

    if (obj.fontSize) obj.elem.style.fontSize = obj.fontSize;

    if (obj.fontStyle) obj.elem.style.fontStyle = obj.fontStyle;
    if (obj.textDecoration) obj.elem.style.textDecoration = obj.textDecoration;
    if (obj.fontWeight) obj.elem.style.fontWeight = obj.fontWeight;

    if (obj.textAlign) obj.elem.style.textAlign = obj.textAlign;
  }
  console.log(historyStack);
}

export function undo() {
  stackLength--;
  if (stackLength < 1) {
    stackLength = 0;
  }
  if (historyStack.length > 1) {
    changeElemProps();
  }
}

export function redo() {
  stackLength++;
  if (stackLength > historyStack.length) {
    stackLength = historyStack.length;
  }
  if (stackLength < historyStack.length) {
    changeElemProps();
  }
}
