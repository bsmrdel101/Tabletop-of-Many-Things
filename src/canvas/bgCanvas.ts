import { clamp } from "@/scripts/tools/utils";
import setCanvasGrid from "./gridCanvas";


let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const bgImage = new Image();
let offsetX = 0;
let offsetY = 0;
let currentZoom = 1;
let offsetInit = false;

export default function setCanvasBg(zoom: number, map: Map_5e) {
  canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  bgImage.src = map.img;
  bgImage.onload = () => {
    canvas.width = clamp(bgImage.naturalWidth, bgImage.naturalWidth < 900 ? bgImage.naturalWidth * 4 : 900, Infinity);
    canvas.height = clamp(bgImage.naturalHeight, bgImage.naturalHeight < 900 ? bgImage.naturalHeight * 4 : 900, Infinity);
    if (!offsetInit) offsetX = map.offsetX;
    if (!offsetInit) offsetY = map.offsetY;
    offsetInit = true;
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

export const changeBgOffsetX = (num: number) => offsetX += num * currentZoom;
export const changeBgOffsetY = (num: number) => offsetY += num * currentZoom;
export const resetBgOffset = (x: number, y: number) => {
  offsetX -= x * currentZoom;
  offsetY -= y * currentZoom;
};

const drawBgImage = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, offsetX, offsetY, canvas.width * currentZoom, canvas.height * currentZoom);
};

export const getBgImage = () => bgImage;
