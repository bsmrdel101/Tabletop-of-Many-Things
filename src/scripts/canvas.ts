let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let rect: any;

// Sets initial values for canvas
export const initializeCanvas = () => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  ctx = canvas.getContext("2d");
  rect = canvas.getBoundingClientRect();
  ctx.canvas.width = document.querySelector('.grid').clientWidth;
  ctx.canvas.height = document.querySelector('.grid').clientHeight;
};

export const drawCircle = (x: number, y: number) => {
  new Circle(x, y).draw();
};

export const drawArrow = (fromX: number, fromY: number, toX: number, toY: number) => {
  new Arrow(fromX, fromY, toX, toY).draw();
};

// Circle object
class Circle {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x - rect.left;
    this.y = y - rect.top;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

// Arrow object
class Arrow {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  dx: number;
  dy: number;
  angle: number;
  headLength = 10;

  constructor(fromX: number, fromY: number, toX: number, toY: number) {
    this.fromX = fromX;
    this.fromY = fromY;
    this.toX = toX - canvas.offsetLeft;
    this.toY = toY - canvas.offsetTop;
    this.dx = toX - fromX;
    this.dy = toY - fromY;
    this.angle = Math.atan2(this.dy, this.dx);
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.fromX, this.fromY);
    ctx.lineTo(this.toX, this.toY);
    // ctx.lineTo(this.toX - this.headLength * Math.cos(this.angle - Math.PI / 6), this.toY - this.headLength * Math.sin(this.angle - Math.PI / 6));
    // ctx.moveTo(this.toX, this.toY);
    // ctx.lineTo(this.toX - this.headLength * Math.cos(this.angle + Math.PI / 6), this.toY - this.headLength * Math.sin(this.angle + Math.PI / 6));
    ctx.stroke();
  }
}
