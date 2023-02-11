export function renderPaintTools() {
  const canvas = document.querySelector('.paint-canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  
  const color = document.querySelector('.paint-block__tools-allColor') as HTMLInputElement;
  const width = document.querySelector('.paint-block__tools-width') as HTMLSelectElement;
  const pensil = document.querySelector('.paint-block__tools-pencil') as HTMLDivElement;
  const backgroundColor = document.querySelector('.background-color-block-input') as HTMLInputElement;
  
   
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = 'black';
  context.lineWidth = 2;
  // context.fillStyle = 'white';
  // context.fillRect(0, 0, 700, 500);
  
  let painting = false;
  
  function stopPainting() {
    painting = false;
  }
  
  function onMouseMove(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
      context.beginPath();
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
      context.stroke();
    }
  }
  
  function onMouseDown() {
    painting = true;
  }
  
  function updateColorPencil() {
    context.strokeStyle = `${color.value}`;
  }
  
  function updateWidthPencil() {
    context.lineWidth = Number(width.value);
  }
  
  function erase() {
    context.globalCompositeOperation = 'destination-out';
  }
  
  function pensilNow() {
    context.strokeStyle = `${color.value}`;
    context.lineWidth = Number(width.value);
    context.globalCompositeOperation = 'source-over';
  }
  
  function updateBackgroundColor() {
    canvas.style.backgroundColor = `${backgroundColor.value}`;
  }
  
  
  function sprayPainting(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;
    const spraySize = 20;
    context.rect(x, y, 1, 1);     
    for (let i = 31; i--;) { 
      context.rect(x + Math.random() * spraySize - spraySize / 2, 
        y + Math.random() * spraySize - spraySize / 2, 
        1, 1);
      context.fill();
    }
  }
  
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  (document.querySelector('.paint-block__tools-spray') as HTMLDivElement).addEventListener('click', sprayPainting);
  (document.querySelector('.paint-block__tools-eraser') as HTMLDivElement).addEventListener('click', erase);
  color.addEventListener('change', updateColorPencil);
  width.addEventListener('change', updateWidthPencil);
  pensil.addEventListener('click', pensilNow);
  backgroundColor.addEventListener('input', updateBackgroundColor);
}
  
  
// function sprayPainting() {
//   const cPushArray = [];
//   const cstep = -1;
//   context.lineWidth = 1;
//   context.lineCap = 'round';
//   context.scale(0.75, 0.75);
//   const flag = 0;
//   context.strokeStyle = '#fc0';
//   context.fillStyle = '#fc0';
      
          
//   function spray() {
//     let startx, starty;
//     const spraysize = 20;
//     let pencilflag = false;
      
//     function spraydown(e: MouseEvent) {
//       startx = e.x;
//       starty = e.y;
//       pencilflag = true;
//     }
  
//     function spraymove(event: MouseEvent) {
//       if (pencilflag) {
//         const endx = event.clientX;
//         const endy = event.clientY;
//         context.beginPath();
//         context.rect(endx, endy, 1, 1);
//         for (let i = 11; i--;) {
//           context.rect(endx + Math.random() * spraysize - spraysize / 2,
//             endy + Math.random() * spraysize - spraysize / 2,
//             1, 1);
//         }
//         context.closePath();
//         context.stroke();
//         context.fill();
//         startx = endx;
//         starty = endy;
//       }
//     }
  
//     function sprayUp(event: MouseEvent) {
//       pencilflag = false;
//     }
//     canvas.onmousedown = spraydown;
//     canvas.onmousemove = spraymove;
//     canvas.onmouseup = sprayUp;
//   }
// }
  
  
// const canvas = document.getElementById('myCanvas');
// ctx = canvas.getContext('2d');
// cPushArray = [];
// cstep = -1;
// ctx.lineWidth = 1;
// ctx.lineCap = 'round';
// ctx.scale(0.75, 0.75);
// flag = 0;
// ctx.strokeStyle = '#fc0';
// ctx.fillStyle = '#fc0';
  
      
// function spray() {
//   canvas.onmousedown = spray_down;
//   canvas.onmousemove = spray_move;
//   canvas.onmouseup = spray_up;
//   let startx, starty;
//   const spray_size = 20;
//   let pencil_flag = false;
  
//   function spray_down(e) {
//     startx = e.x;
//     starty = e.y;
//     pencil_flag = true;
//   }
//   function spray_move(event) {
//     if (pencil_flag) {
//       endx = event.clientX;
//       endy = event.clientY;
//       ctx.beginPath();
//       ctx.rect(endx, endy, 1, 1);
//       for (i = 11; i--;) {
//         ctx.rect(endx + Math.random() * spray_size - spray_size / 2,
//           endy + Math.random() * spray_size - spray_size / 2,
//           1, 1);
//       }
//       ctx.closePath();
//       ctx.stroke();
//       ctx.fill();
//       startx = endx;
//       starty = endy;
//     }
//   }
//   function spray_up(event) {
//     pencil_flag = false;
//   }
// }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
// export class DrawingApp {
//   canvas: HTMLCanvasElement;
  
//   context: CanvasRenderingContext2D;
  
//   paint = true;
      
//   clickX: number[] = [];
  
//   clickY: number[] = [];
  
//   clickDrag: boolean[] = [];
  
//   constructor() {
//     const canvas: HTMLCanvasElement = document.createElement('canvas');
//     canvas.classList.add('paint-canvas');
//     canvas.setAttribute('id', 'canvas');
//     canvas.width = 700;
//     canvas.height = 500;
//     // const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
//     const context = canvas.getContext('2d') as CanvasRenderingContext2D;
//     console.log(canvas);
//     console.log(context);
//     context.lineCap = 'round';
//     context.lineJoin = 'round';
//     context.strokeStyle = 'black';
//     context.lineWidth = 2;
  
//     this.canvas = canvas;
//     this.context = context;
  
//     this.redraw();
//     this.createUserEvents();
//   }
  
//   createUserEvents() {
//     const canvas = this.canvas;
      
//     canvas.addEventListener('mousedown', this.pressEventHandler);
//     canvas.addEventListener('mousemove', this.dragEventHandler);
//     canvas.addEventListener('mouseup', this.releaseEventHandler);
//     canvas.addEventListener('mouseout', this.cancelEventHandler);
  
//     canvas.addEventListener('touchstart', this.pressEventHandler);
//     canvas.addEventListener('touchmove', this.dragEventHandler);
//     canvas.addEventListener('touchend', this.releaseEventHandler);
//     canvas.addEventListener('touchcancel', this.cancelEventHandler);
  
      
//     (document.querySelector('.spray-item') as HTMLDivElement).addEventListener('click', this.spray);
//     (document.querySelector('.remove-block__ico') as HTMLDivElement).addEventListener('click', this.clearEventHandler);
//   }
  
//   redraw() {
      
//     const clickX = this.clickX;
//     const context = this.context;
//     const clickDrag = this.clickDrag;
//     const clickY = this.clickY;
//     for (let i = 0; i < clickX.length; ++i) {
//       context.beginPath();
//       if (clickDrag[i] && i) {
//         context.moveTo(clickX[i - 1], clickY[i - 1]);
//       } else {
//         context.moveTo(clickX[i] - 1, clickY[i]);
//       }
  
//       context.lineTo(clickX[i], clickY[i]);
//       context.stroke();
//     }
//     context.closePath();
//   }
  
//   addClick(x: number, y: number, dragging: boolean) {
//     this.clickX.push(x);
//     this.clickY.push(y);
//     this.clickDrag.push(dragging);
//   }
  
//   clearCanvas() {
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     this.clickX = [];
//     this.clickY = [];
//     this.clickDrag = [];
//   }
  
//   clearEventHandler = () => {
//     this.clearCanvas();
//   };
  
//   releaseEventHandler = () => {
//     this.paint = false;
//     this.redraw();
//   };
  
//   cancelEventHandler = () => {
//     this.paint = false;
//   };
  
//   pressEventHandler = (e: MouseEvent | TouchEvent) => {
//     let mouseX = (e as TouchEvent).changedTouches ?
//       (e as TouchEvent).changedTouches[0].pageX :
//       (e as MouseEvent).pageX;
//     let mouseY = (e as TouchEvent).changedTouches ?
//       (e as TouchEvent).changedTouches[0].pageY :
//       (e as MouseEvent).pageY;
//     mouseX -= this.canvas.offsetLeft;
//     mouseY -= this.canvas.offsetTop;
//     this.paint = true;
//     this.addClick(mouseX, mouseY, false);
//     this.redraw();
//   };
  
//   dragEventHandler = (e: MouseEvent | TouchEvent) => {
//     let mouseX = (e as TouchEvent).changedTouches ?
//       (e as TouchEvent).changedTouches[0].pageX :
//       (e as MouseEvent).pageX;
//     let mouseY = (e as TouchEvent).changedTouches ?
//       (e as TouchEvent).changedTouches[0].pageY :
//       (e as MouseEvent).pageY;
//     mouseX -= this.canvas.offsetLeft;
//     mouseY -= this.canvas.offsetTop;
  
//     if (this.paint) {
//       this.addClick(mouseX, mouseY, true);
//       this.redraw();
//     }
  
//     e.preventDefault();
//   };
  
//   spray = () => {
//     this.newBrash();
//   };
  
//   newBrash() {
//     this.context.lineWidth = 10;
//   }
  
//   render() {
//     return this.canvas;
//   }
// }
  