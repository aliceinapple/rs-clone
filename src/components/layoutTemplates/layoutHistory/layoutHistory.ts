import { LayoutProps } from '../../../types/types';
import { giveCopyTools } from '../elementsActions';

export let historyStack: LayoutProps[] = [];
let stackLength = historyStack.length;
let alreadyCalled = false;

function decreaseStackLength() {
  if (!alreadyCalled) {
    stackLength--;
    alreadyCalled = true;
  }
}

export function saveLayoutProperties(props: LayoutProps) {
  alreadyCalled = false;

  if (stackLength < historyStack.length) {
    historyStack = historyStack.slice(0, stackLength);
  }

  if (historyStack.length > 0) {
    if (JSON.stringify(historyStack[historyStack.length - 1]) !== JSON.stringify(props)) {
      historyStack.push(props);
      stackLength = historyStack.length;
    }
  } else if (historyStack.length === 0) {
    historyStack.push(props);
    stackLength = historyStack.length;
  }
}

function changeLayuotProps() {
  const newLayout = historyStack[stackLength];
  const container = document.querySelector('.container') as HTMLDivElement;
  if (container) {
    container.innerHTML = newLayout.content;
    container.style.backgroundColor = newLayout.bgColor;
    for (const child of container.children) {
      giveCopyTools(child as HTMLDivElement);
    }
  }
}

export function undo() {
  stackLength--;
  if (stackLength < 1) {
    stackLength = 0;
  }
  if (historyStack.length > 1) {
    decreaseStackLength();
    changeLayuotProps();
  }
}

export function redo() {
  stackLength++;
  if (stackLength > historyStack.length) {
    alreadyCalled = false;
    stackLength = historyStack.length;
  } else if (stackLength < historyStack.length) {
    changeLayuotProps();
  }
}
