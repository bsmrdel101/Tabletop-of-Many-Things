import { openCreatureWindow } from "../../components/Dialogs/Creatures/CreatureRow";
import { emitServerEvent, onServerEvent } from "../config/socket-io";
import { setSelectedMap } from "../controllers/dashboardController";
import { deleteTokenFromMap, getMap, updateToken } from "../controllers/5e/mapsController";
import { clamp } from "../tools/utils";
import setCanvasBg, { panCanvasBg, zoomCanvasBg } from "./bgCanvas";
import drawCanvasGrid, { getGridCellCoords, panCanvasGrid, zoomCanvasGrid } from "./gridCanvas";


const zoomMin = 0.22, zoomMax = 1;
let gridContainer: HTMLElement;
let scaleBtnPressed = false;
let map: Board;
let boardState: Token[] = [];
let game: Game;
let room: string;
let currentZoom = 1;
let lastX = 0;
let lastY = 0;
let isDragging = false;
let leftMouseDown = false;
let initialClickX = 0;
let initialClickY = 0;
let initialTokenTopLeftX = 0;
let initialTokenTopLeftY = 0;
let selectedToken: Token;
let isDraggingToken = false;
let setMapData: (map: Board) => void;
let setRightClickMenu: (data: RightClickMenuState) => void;

export const initializeCanvas = (selectedMap: Board, _game: Game, _room: string, _setMapData: (map: Board) => void, _setContextMenu: (data: RightClickMenuState) => void) => {
  gridContainer = document.querySelector('.grid-container');
  map = selectedMap;
  boardState = map.boardState;
  game = _game;
  room = _room;
  setMapData = _setMapData;
  setRightClickMenu = _setContextMenu;
  drawEveryCanvas();
  addEventListeners();
};

const drawEveryCanvas = () => {
  setCanvasBg(currentZoom, map);
};

const addEventListeners = () => {
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  gridContainer.addEventListener('mousedown', handleRightClick);
  gridContainer.addEventListener('wheel', handleMouseWheel);
  gridContainer.addEventListener('dblclick', handleDoubleClick);
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
};

const getTokenSelected = (clickX: number, clickY: number): Token | null => {
  const tokens: Token[] = boardState;
  const { x, y } = getGridCellCoords(clickX, clickY);
  
  for (const token of tokens) {
    const tokenRight = token.x + token.size - 1;
    const tokenBottom = token.y + token.size - 1;
  
    if (x >= token.x && x <= tokenRight && y >= token.y && y <= tokenBottom) {
      return token;
    }
  }
  return null;
};

const handleTokenGhostImage = (e: MouseEvent) => {
  const { x, y } = getGridCellCoords(e.clientX, e.clientY);
  const offsetX = x - initialClickX;
  const offsetY = y - initialClickY;
  const newTopLeftX = initialTokenTopLeftX + offsetX;
  const newTopLeftY = initialTokenTopLeftY + offsetY;
  selectedToken = { ...selectedToken, x: newTopLeftX, y: newTopLeftY };

  boardState = boardState.map((token: Token) => {
    if (token.id !== selectedToken.id) return token;
    return { ...selectedToken };
  });
  map = { ...map, boardState };
  drawCanvasGrid(currentZoom, map);
};
  
const handleDropToken = (token: Token, mapId: number) => {
  // Make sure that if this map isn't shared, this should only run for DM
  if (map.id !== mapId) return;
  boardState = map.boardState.map((_token: Token) => {
    if (_token.id !== token.id) return _token;
    return { ...token, x: token.x, y: token.y };
  });
  map = { ...map, boardState };
  drawCanvasGrid(currentZoom, map);
};

const resizeToken = (token: Token, dir: 'up' | 'down') => {
  if (!token) return;
  boardState = boardState.map((_token: Token) => {
    if (_token.id !== token.id) return _token;
    if (dir === 'up') {
      return { ...token, size: clamp(token.size + 1, 1, 100) };
    } else {
      return { ...token, size: clamp(token.size - 1, 1, 100) };
    }
  });
  map = { ...map, boardState };
  drawCanvasGrid(currentZoom, map);
};

const removeToken = async (token: Token) => {
  await deleteTokenFromMap(token.id);
  boardState = boardState.filter((_token: Token) => {
    return _token.id !== token.id;
  });
  map = { ...map, boardState };
  drawCanvasGrid(currentZoom, map);
};

const zoomGrid = (e: WheelEvent) => {
  const delta = e.deltaY;
  const scaleSpeed = 0.001;
  const newZoom = currentZoom - delta * scaleSpeed;
  const clampedZoom = Math.max(zoomMin, Math.min(zoomMax, newZoom));

  currentZoom = clampedZoom;
  zoomCanvasBg(e, clampedZoom);
  zoomCanvasGrid(e, clampedZoom);
};

const panGrid = (e: MouseEvent) => {
  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  panCanvasBg(deltaX, deltaY, currentZoom);
  panCanvasGrid(deltaX, deltaY);
};


// ==============
// Network Events
// ==============

onServerEvent('SELECT_MAP', async (selectedMap: Board) => {
  await setSelectedMap(selectedMap, game.id);
  map = await getMap(selectedMap.id, game.id);
  boardState = map.boardState;
  setMapData(map);
  drawEveryCanvas();
});

onServerEvent('VIEW_MAP', async (selectedMap: Board) => {
  map = await getMap(selectedMap.id, game.id);
  boardState = map.boardState;
  setMapData(map);
  drawEveryCanvas();
});

onServerEvent('MOVE_TOKEN', (token: Token) => {
  handleDropToken(token, map.id);
});

onServerEvent('RESIZE_TOKEN', (data: { token: Token, dir: 'up' | 'down' }) => {
  const { token, dir } = data;
  resizeToken(token, dir);
});

onServerEvent('ADD_TOKEN_TO_BOARD', async () => { 
  map = await getMap(map.id, game.id);
  boardState = map.boardState;
  drawCanvasGrid(currentZoom, map);
});
    
onServerEvent('REMOVE_TOKEN', (token: Token) => {
  removeToken(token);
});


// ==============
// Event handlers
// ==============

const handleMouseDown = async (e: MouseEvent) => {
  lastX = e.clientX;
  lastY = e.clientY;

  switch (e.buttons) {
  case 1: // Left click
    leftMouseDown = true;
    selectedToken = getTokenSelected(e.clientX, e.clientY);
    if (selectedToken) {
      const { x, y } = getGridCellCoords(e.clientX, e.clientY);
      initialClickX = x;
      initialClickY = y;
      initialTokenTopLeftX = selectedToken.x;
      initialTokenTopLeftY = selectedToken.y;
      document.querySelector('body').classList.add('grabbing');
    }

    if (!(e.target as HTMLElement).classList.contains('right-click-menu__btn')) {
      document.getElementById('right-click-menu').classList.add('hidden');
    }
    break;
  case 4: // Middle click
    isDragging = true;
    document.querySelector('body').classList.add('panning');
    break;
  default:
    break;
  }
};

const handleMouseMove = (e: MouseEvent) => {
  if (selectedToken && leftMouseDown) isDraggingToken = true;
  if (isDragging) panGrid(e);
  if (isDraggingToken) {
    handleTokenGhostImage(e);
  }
};

const handleMouseUp = async () => {
  isDragging = false;
  leftMouseDown = false;
  document.querySelector('body').classList.remove('panning');
  document.querySelector('body').classList.remove('grabbing');

  if (isDraggingToken && selectedToken) {
    isDraggingToken = false;
    await updateToken(selectedToken.id, selectedToken.size, selectedToken.x, selectedToken.y);
    emitServerEvent('MOVE_TOKEN', [selectedToken, room]);
  }
};

const handleRightClick = (e: MouseEvent) => {
  if (e.buttons !== 2) return;
  setRightClickMenu({ menuType: '' });
  const token: Token = getTokenSelected(e.pageX, e.pageY);
  
  if (token) setRightClickMenu({ menuType: 'token', token });

  const rightClickMenu = document.getElementById('right-click-menu');
  rightClickMenu.classList.remove('hidden');
  rightClickMenu.style.setProperty('left', `${e.pageX}px`);
  rightClickMenu.style.setProperty('top', `${e.pageY}px`);
};

const handleMouseWheel = async (e: WheelEvent) => {
  e.preventDefault();
  if (scaleBtnPressed) {
    const token = getTokenSelected(e.clientX, e.clientY);
    if (!token) return;
    if (token && (e as any).wheelDeltaY < 0) {
      emitServerEvent('RESIZE_TOKEN', [token, 'up', room]);
      await updateToken(token.id, token.size + 1, token.x, token.y);
    } else {
      emitServerEvent('RESIZE_TOKEN', [token, 'down', room]);
      await updateToken(token.id, token.size - 1, token.x, token.y);
    }
  } else {
    zoomGrid(e);
  }
};

const handleDoubleClick = (e: MouseEvent) => {
  const token = getTokenSelected(e.clientX, e.clientY);
  if (token) openCreatureWindow(token.creature);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Control' || e.key === 'Meta') scaleBtnPressed = true;
};

const handleKeyUp = (e: KeyboardEvent) => {
  if (e.key === 'Control' || e.key === 'Meta') scaleBtnPressed = false;
};
