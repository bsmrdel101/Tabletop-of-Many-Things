import { clamp } from "../tools/utils";
import setCanvasGrid from "./gridCanvas";


let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const bgImage = new Image();
let offsetX = 0;
let offsetY = 0;
let currentZoom = 1;

export default function setCanvasBg(zoom: number, map: Board) {
  canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  bgImage.src = map.image;
  bgImage.onload = () => {
    canvas.width = clamp(bgImage.naturalWidth, bgImage.naturalWidth < 900 ? bgImage.naturalWidth * 4 : 900, Infinity);
    canvas.height = clamp(bgImage.naturalHeight, bgImage.naturalHeight < 900 ? bgImage.naturalHeight * 4 : 900, Infinity);
    drawCanvasBg(zoom);
    setCanvasGrid(zoom, map);
  };
}

export const drawCanvasBg = (zoom: number) => {
  currentZoom = zoom;
  drawBgImage();
};

export const zoomCanvasBg = (e: WheelEvent, clampedZoom: number) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  offsetX = (offsetX - mouseX) * (clampedZoom / currentZoom) + mouseX;
  offsetY = (offsetY - mouseY) * (clampedZoom / currentZoom) + mouseY;
  drawCanvasBg(clampedZoom);
};

export const panCanvasBg = (deltaX: number, deltaY: number, currentZoom: number) => {
  offsetX += deltaX;
  offsetY += deltaY;
  drawCanvasBg(currentZoom);
};

const drawBgImage = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, offsetX, offsetY, canvas.width * currentZoom, canvas.height * currentZoom);
};

export const getBgImage = () => bgImage;
