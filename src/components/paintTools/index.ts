import FloodFill from '../../../node_modules/q-floodfill';
import { imageSaveSrc, saveCanvasAsImageFile, saveImage } from '../saveImages';

export function renderPaintTools() {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let dragging = false;
  const polygonSides = 6;
  let savedImageData: ImageData;
  let currentTool = 'brush';
  let canvasWidth: number;
  let canvasHeight: number;
  let usingBrush = false;

  const mainBlock = document.querySelector('.paint-block__tools') as HTMLDivElement;
  const color = document.querySelector('#allcolor') as HTMLInputElement;
  const widthPencil = document.querySelector('#width') as HTMLSelectElement;
  const eraser = document.querySelector('#eraser') as HTMLDivElement;
  const removeIco = document.querySelector('.remove-block__ico') as HTMLDivElement;
  const saveIco = document.querySelector('.save-block__ico') as HTMLDivElement;
  
  let brushXPoints: number[] = [];
  let brushYPoints: number[] = [];

  let brushDownPosition: (undefined | boolean)[] = [];

  class BoundingBox {
    [x: string]: number;

    constructor(left: number, top: number, width: number, height: number) {
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
    }
  }

  class MouseDownPos {
    [x: string]: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }
 
  class Location {
    [x: string]: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }
 
  class Polygon {
    [x: string]: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  const shapeBoundingBox = new BoundingBox(0, 0, 0, 0);

  const mousedown = new MouseDownPos(0, 0);

  let loc = new Location(0, 0);
  
  mainBlock.addEventListener('click', (event: Event) => {
    const id = ((event.target) as HTMLLinkElement).id;
    if (id !== null) currentTool = id;
  });


  function MousePosition(x: number, y: number) {
    const canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
      y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height),
    };
  }
 
  function SaveCanvasImage() {
    savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
 
  function RedrawCanvasImage() {
    ctx.putImageData(savedImageData, 0, 0);
  }
 
  function UpdateRubberbandSizeData() {
    shapeBoundingBox.width = Math.abs(loc.x - mousedown.x);
    shapeBoundingBox.height = Math.abs(loc.y - mousedown.y);

    if (loc.x > mousedown.x) {
      shapeBoundingBox.left = mousedown.x;
    } else {
      shapeBoundingBox.left = loc.x;
    }
 
    if (loc.y > mousedown.y) {
      shapeBoundingBox.top = mousedown.y;
    } else {
      shapeBoundingBox.top = loc.y;
    }
  }
 
  function radiansToDegrees(rad: number) {
    if (rad < 0) {
      return (360.0 + (rad * (180 / Math.PI))).toFixed(2);
    } else {
      return (rad * (180 / Math.PI)).toFixed(2);
    }
  }

  function getAngleUsingXAndY(mouselocX: number, mouselocY: number) {
    const adjacent = mousedown.x - mouselocX;
    const opposite = mousedown.y - mouselocY;
 
    return radiansToDegrees(Math.atan2(opposite, adjacent));
  }
 
  function degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }
 
  function getPolygonPoints() {
    let angle =  degreesToRadians(Number(getAngleUsingXAndY(loc.x, loc.y)));
    const radiusX = shapeBoundingBox.width;
    const radiusY = shapeBoundingBox.height;
    const polygonPoints = [];

    for (let i = 0; i < polygonSides; i++) {
      polygonPoints.push(new Polygon(loc.x + radiusX * Math.sin(angle), loc.y - radiusY * Math.cos(angle)));
      angle += 2 * Math.PI / polygonSides;
    }

    return polygonPoints;
  }
 
  function getPolygon() {
    const polygonPoints = getPolygonPoints();
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for (let i = 1; i < polygonSides; i++) {
      ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    ctx.closePath();
  }

  function randomPointInRadius(radius: number) {
    for (;;) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      if (x * x + y * y <= 1)
        return { x: x * radius, y: y * radius };
    }
  }

  function DrawElastic() {
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 1; i < brushXPoints.length; i++) {
      ctx.beginPath();
      if (brushDownPosition[i]) {
        ctx.moveTo(brushXPoints[i - 1], brushYPoints[i - 1]);
      } else {
        ctx.moveTo(brushXPoints[i] - 1, brushYPoints[i]);
      }
      ctx.lineTo(brushXPoints[i], brushYPoints[i]);
      ctx.closePath();
      ctx.stroke();
    }
  }

  function DrawBrush() {
    ctx.globalCompositeOperation = 'source-over';
    for (let i = 1; i < brushXPoints.length; i++) {
      ctx.beginPath();
      if (brushDownPosition[i]) {
        ctx.moveTo(brushXPoints[i - 1], brushYPoints[i - 1]);
      } else {
        ctx.moveTo(brushXPoints[i] - 1, brushYPoints[i]);
      }
      ctx.lineTo(brushXPoints[i], brushYPoints[i]);
      ctx.closePath();
      ctx.stroke();
    }

  }

  function Elastic() {
    currentTool = 'eraser';
    brushXPoints = [];
    brushYPoints = [];
    brushDownPosition = [];
  }
  
  function fill() {
    if (canvas && ctx) {
      const floodFill = new FloodFill(ctx.getImageData(0, 0, canvas.width, canvas.height));
      floodFill.fill(`${color.value}`, Math.trunc(mousedown.x), Math.trunc(mousedown.y), 0);
      ctx.putImageData(floodFill.imageData, 0, 0);
    }
  }

  function spray() {
    currentTool = 'spray';
    const radius = ctx.lineWidth / 2;
    const area = radius * radius * Math.PI;
    const dotsPerTick = Math.ceil(area / 15);
    for (let i = 0; i < dotsPerTick; i++) {
      const offset = randomPointInRadius(radius);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillRect(loc.x + offset.x, loc.y + offset.y, 1, 1);
    }
  }


  function drawRubberbandShape() {
    ctx.strokeStyle = color.value;
    if (currentTool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      DrawBrush();
    } else if (currentTool === 'line') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.moveTo(mousedown.x, mousedown.y);
      ctx.lineTo(loc.x, loc.y);
      ctx.stroke();
    } else if (currentTool === 'rectangle') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
    } else if (currentTool === 'circle') {
      ctx.globalCompositeOperation = 'source-over';
      const radius = shapeBoundingBox.width;
      ctx.beginPath();
      ctx.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (currentTool === 'polygon') {
      ctx.globalCompositeOperation = 'source-over';
      getPolygon();
      ctx.stroke();
    } else if (currentTool === 'eraser') {
      DrawElastic();
    } else if (currentTool === 'spray') {
      ctx.globalCompositeOperation = 'source-over';
      spray();
      SaveCanvasImage();
    } else if (currentTool === 'pouring') {
      fill();
    } 
  }
 
  function UpdateRubberbandOnMove() {
    UpdateRubberbandSizeData();
    drawRubberbandShape();
  }

  function AddBrushPoint(x: number, y: number, mouseDown: boolean | undefined) {
    brushXPoints.push(x);
    brushYPoints.push(y);
    brushDownPosition.push(mouseDown);
  }
 
  function MouseDown(e: MouseEvent | TouchEvent) {
    const mouseX = (e as TouchEvent).changedTouches ?
      (e as TouchEvent).changedTouches[0].pageX :
      (e as MouseEvent).pageX;
    const mouseY = (e as TouchEvent).changedTouches ?
      (e as TouchEvent).changedTouches[0].pageY :
      (e as MouseEvent).pageY;
    loc = MousePosition(mouseX, mouseY);
    SaveCanvasImage();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
    brushXPoints = [];
    brushYPoints = [];
    brushDownPosition = [];
    if (currentTool === 'brush' || currentTool === 'eraser' || currentTool === 'spray') {
      usingBrush = true;
      AddBrushPoint(loc.x, loc.y, undefined);
    }
  }
 
  function MouseMove(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    const mouseX = (e as TouchEvent).changedTouches ?
      (e as TouchEvent).changedTouches[0].pageX :
      (e as MouseEvent).pageX;
    const mouseY = (e as TouchEvent).changedTouches ?
      (e as TouchEvent).changedTouches[0].pageY :
      (e as MouseEvent).pageY;
    loc = MousePosition(mouseX, mouseY);
    if (currentTool === 'brush' && dragging && usingBrush) {
      if (loc.x > 0 && loc.x < canvasWidth && loc.y > 0 && loc.y < canvasHeight) {
        AddBrushPoint(loc.x, loc.y, true);
      }
      RedrawCanvasImage();
      DrawBrush();
    } else if (currentTool === 'eraser' && dragging && usingBrush) {
      if (loc.x > 0 && loc.x < canvasWidth && loc.y > 0 && loc.y < canvasHeight) {
        AddBrushPoint(loc.x, loc.y, true);
      }
      RedrawCanvasImage();
      DrawElastic();
    } else if (currentTool === 'spray' && dragging && usingBrush) {
      if (loc.x > 0 && loc.x < canvasWidth && loc.y > 0 && loc.y < canvasHeight) {
        AddBrushPoint(loc.x, loc.y, true);
      }
      RedrawCanvasImage();
      UpdateRubberbandOnMove();
    } else {
      if (currentTool != 'pouring') {
        if (dragging) {
          RedrawCanvasImage();
          UpdateRubberbandOnMove();
        }
      }
    }
  }
 
  function MouseUp(e: MouseEvent | TouchEvent) {
    const mouseX = (e as TouchEvent).changedTouches ?
      (e as TouchEvent).changedTouches[0].pageX :
      (e as MouseEvent).pageX;
    const mouseY = (e as TouchEvent).changedTouches ?
      (e as TouchEvent).changedTouches[0].pageY :
      (e as MouseEvent).pageY;
    loc = MousePosition(mouseX, mouseY);
    RedrawCanvasImage();
    UpdateRubberbandOnMove();
    dragging = false;
    usingBrush = false;
  }

  function updateColorPencil() {
    ctx.strokeStyle = color.value;
  }

  function updateWidthPencil() {
    ctx.lineWidth = Number(widthPencil.value);
  }

  removeIco.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  saveIco.addEventListener('click', () => {
    saveCanvasAsImageFile(canvas);
    saveImage(imageSaveSrc.image);
  });

  color.addEventListener('change', updateColorPencil);
  widthPencil.addEventListener('change', updateWidthPencil);
  eraser.addEventListener('click', Elastic);
 
  const changeTools = document.querySelector('.paint-block__tools') as HTMLDivElement;

  function changeSelectedTools(selected: HTMLDivElement) {
    const items = document.querySelectorAll('.paint-block__toolset');
    Array.from(items).forEach(item => {
      item.classList.remove('highlightTools');
    });
    selected.classList.add('highlightTools');
  }

  changeTools.addEventListener('click', (event: Event) => {
    const item = event.target;
    const clickedItem = item as HTMLElement;
    const parentBlock = clickedItem.closest('.paint-block__toolset') as HTMLDivElement;
    if (parentBlock !== null) changeSelectedTools(parentBlock);
  });

  function setupCanvas() {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
    ctx.strokeStyle = 'black';
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = 'white';
    
    canvas.addEventListener('mousedown', MouseDown, { passive: false });
    canvas.addEventListener('mousemove', MouseMove, { passive: false });
    canvas.addEventListener('mouseup', MouseUp, { passive: false });

    canvas.addEventListener('touchstart', MouseDown, { passive: false });
    canvas.addEventListener('touchmove', MouseMove, { passive: false });
    canvas.addEventListener('touchend', MouseUp, { passive: false });
  }

  setupCanvas();
}