import { clamp } from "@/scripts/tools/utils";
import { getBgImage } from "./bgCanvas";


let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let offsetX = 0;
let offsetY = 0;
let gridWidth: number;
let gridHeight: number;
let gridCellSize = 60;
let gridColor = '#000000';
let gridOpacity = 1;
let gridLineWidth = 0.4;
let currentZoom = 1;
let boardState: Token_5e[] = [];

export default function setCanvasGrid(zoom: number, map: Map_5e) {
  canvas = document.getElementById('grid-canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const bgImage = getBgImage();
  canvas.width = bgImage.naturalWidth;
  canvas.height = bgImage.naturalHeight;  
  gridWidth = Math.ceil(bgImage.naturalWidth / (gridCellSize * currentZoom)) + 10;
  gridHeight = Math.ceil(bgImage.naturalHeight / (gridCellSize * currentZoom)) + 10;
  boardState = map.boardState;
  gridColor = map.gridColor;
  gridOpacity = map.gridOpacity / 100;
  gridCellSize = map.cellSize;
  drawCanvasGrid(zoom);
}

export const drawCanvasGrid = (zoom: number) => {
  currentZoom = zoom;
  const maxGridWidth = Math.floor(canvas.width / gridCellSize);
  const maxGridHeight = Math.floor(canvas.height / gridCellSize);
  gridWidth = Math.max(maxGridWidth, Math.floor(maxGridWidth * currentZoom));
  gridHeight = Math.max(maxGridHeight, Math.floor(maxGridHeight * currentZoom));

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = gridColor;
  ctx.globalAlpha = gridOpacity;
  ctx.lineWidth = gridLineWidth;

  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      ctx.strokeRect(
        (x * gridCellSize * currentZoom) + offsetX,
        (y * gridCellSize * currentZoom) + offsetY,
        gridCellSize * currentZoom,
        gridCellSize * currentZoom
      );
    }
  }
  placeTokens();
};

const placeTokens = () => {
  if (boardState.length === 0) return;
  boardState.forEach((mapToken: Token_5e) => {
    drawToken(mapToken.x, mapToken.y, mapToken.img, mapToken.size);
  });
};

const drawToken = (x: number, y: number, imageSrc: string, size: number) => {
  const adjustedX = x * gridCellSize * currentZoom + offsetX;
  const adjustedY = y * gridCellSize * currentZoom + offsetY;
  const tokenSize = size * gridCellSize * currentZoom;
  const image = new Image();
  image.src = imageSrc;

  ctx.save();
  ctx.globalAlpha = 1;

  ctx.beginPath();
  ctx.arc(adjustedX + tokenSize / 2, adjustedY + tokenSize / 2, tokenSize / 2, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(image, adjustedX, adjustedY, tokenSize, tokenSize);
  ctx.restore();
};

export const zoomCanvasGrid = (e: WheelEvent, clampedZoom: number) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  offsetX = (offsetX - mouseX) * (clampedZoom / currentZoom) + mouseX;
  offsetY = (offsetY - mouseY) * (clampedZoom / currentZoom) + mouseY;

  if (clampedZoom <= 0.34) {
    gridLineWidth = 0.2;
  } else {
    gridLineWidth = 0.4;
  }
  drawCanvasGrid(clampedZoom);
};

export const panCanvasGrid = (deltaX: number, deltaY: number) => {
  offsetX += deltaX;
  offsetY += deltaY;
  drawCanvasGrid(currentZoom);
};

export const getGridCellCoords = (clickX: number, clickY: number, zoom: number = currentZoom, _offsetX: number = offsetX, _offsetY: number = offsetY): Coord => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = clickX - rect.left;
  const mouseY = clickY - rect.top;
  const cellSize = gridCellSize * zoom;
  const gridX = Math.floor((mouseX - _offsetX) / cellSize);
  const gridY = Math.floor((mouseY - _offsetY) / cellSize);
  return { x: clamp(gridX, 0, gridWidth - 1), y: clamp(gridY, 0, gridHeight - 1) };
};
