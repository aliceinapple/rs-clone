export function renderPaintTools() {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let dragging = false;
  let elasticCheck = false;
  const polygonSides = 6;
  let savedImageData: ImageData;
  let currentTool = 'brush';
  const canvasWidth = 700;
  const canvasHeight = 500;
  let usingBrush = false;

  const color = document.querySelector('#allcolor') as HTMLInputElement;
  const widthPencil = document.querySelector('#width') as HTMLSelectElement;
  const eraser = document.querySelector('#eraser') as HTMLDivElement;

  let brushXPoints: number[] = [];
  let brushYPoints: number[] = [];

  let brushDownPos: (undefined | boolean)[] = [];

  class ShapeBoundingBox {
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
 
  class PolygonPoint {
    [x: string]: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  const shapeBoundingBox = new ShapeBoundingBox(0, 0, 0, 0);

  const mousedown = new MouseDownPos(0, 0);

  let loc = new Location(0, 0);
  
  (document.querySelector('.paint-block__tools') as HTMLDivElement).addEventListener('click', (event: Event) => {
    const id = ((event.target) as HTMLLinkElement).id;
    currentTool = id;
  });


  function GetMousePosition(x: number, y: number) {
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
      polygonPoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle),
        loc.y - radiusY * Math.cos(angle)));
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

  function DrawBrush() {
    if (elasticCheck) {
      ctx.globalCompositeOperation = 'destination-out';
      for (let i = 1; i < brushXPoints.length; i++) {
        ctx.beginPath();
        if (brushDownPos[i]) {
          ctx.moveTo(brushXPoints[i - 1], brushYPoints[i - 1]);
        } else {
          ctx.moveTo(brushXPoints[i] - 1, brushYPoints[i]);
        }
        ctx.lineTo(brushXPoints[i], brushYPoints[i]);
        ctx.closePath();
        ctx.stroke();
      }
    } else {
      for (let i = 1; i < brushXPoints.length; i++) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        if (brushDownPos[i]) {
          ctx.moveTo(brushXPoints[i - 1], brushYPoints[i - 1]);
        } else {
          ctx.moveTo(brushXPoints[i] - 1, brushYPoints[i]);
        }
        ctx.lineTo(brushXPoints[i], brushYPoints[i]);
        ctx.closePath();
        ctx.stroke();
      }
    }

  }

  function Elastic() {
    currentTool = 'brush';
    brushXPoints = [];
    brushYPoints = [];
    brushDownPos = [];
    elasticCheck = true;
    DrawBrush();
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
    } else if (currentTool === 'ellipse') {
      ctx.globalCompositeOperation = 'source-over';
      const radiusX = shapeBoundingBox.width / 2;
      const radiusY = shapeBoundingBox.height / 2;
      ctx.beginPath();
      ctx.ellipse(mousedown.x, mousedown.y, radiusX, radiusY, Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();
    } else if (currentTool === 'polygon') {
      ctx.globalCompositeOperation = 'source-over';
      getPolygon();
      ctx.stroke();
    } 
  }
 
  function UpdateRubberbandOnMove() {
    UpdateRubberbandSizeData();
    drawRubberbandShape();
  }

  function AddBrushPoint(x: number, y: number, mouseDown: boolean | undefined) {
    brushXPoints.push(x);
    brushYPoints.push(y);
    brushDownPos.push(mouseDown);
  }
 
  function ReactToMouseDown(e: MouseEvent) {
    loc = GetMousePosition(e.clientX, e.clientY);
    SaveCanvasImage();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
    brushXPoints = [];
    brushYPoints = [];
    brushDownPos = [];
    if (currentTool === 'brush') {
      usingBrush = true;
      AddBrushPoint(loc.x, loc.y, undefined);
    }
  }
 
  function ReactToMouseMove(e: MouseEvent) {
    loc = GetMousePosition(e.clientX, e.clientY);
    if (currentTool === 'brush' && dragging && usingBrush) {
      if (loc.x > 0 && loc.x < canvasWidth && loc.y > 0 && loc.y < canvasHeight) {
        AddBrushPoint(loc.x, loc.y, true);
      }
      RedrawCanvasImage();
      DrawBrush();
    } else {
      if (dragging) {
        RedrawCanvasImage();
        UpdateRubberbandOnMove();
      }
    }
  }
 
  function ReactToMouseUp(e: MouseEvent) {
    loc = GetMousePosition(e.clientX, e.clientY);
    RedrawCanvasImage();
    UpdateRubberbandOnMove();
    dragging = false;
    usingBrush = false;
  }
 
  // Saves the image in your default download directory
  // function SaveImage() {
  //   // Get a reference to the link element 
  //   const imageFile = document.getElementById('img-file');
  //   // Set that you want to download the image when link is clicked
  //   imageFile.setAttribute('download', 'image.png');
  //   // Reference the image in canvas for download
  //   imageFile.setAttribute('href', canvas.toDataURL());
  // }
 
  // function OpenImage() {
  //   const img = new Image();
  //   // Once the image is loaded clear the canvas and draw it
  //   img.onload = function () {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     ctx.drawImage(img, 0, 0);
  //   };
  //   img.src = 'image.png';
    
  // }
  function updateColorPencil() {
    ctx.strokeStyle = color.value;
  }

  function updateWidthPencil() {
    ctx.lineWidth = Number(widthPencil.value);
  }

  color.addEventListener('change', updateColorPencil);
  widthPencil.addEventListener('change', updateWidthPencil);
  eraser.addEventListener('click', Elastic);
 
  function setupCanvas() {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    canvas.addEventListener('mousedown', ReactToMouseDown);
    canvas.addEventListener('mousemove', ReactToMouseMove);
    canvas.addEventListener('mouseup', ReactToMouseUp);
  }

  setupCanvas();
}