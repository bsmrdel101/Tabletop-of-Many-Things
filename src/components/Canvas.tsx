import { useEffect, useRef } from "react";
import { emitServerEvent, offServerEvent, onServerEvent, socket } from "../scripts/config/socket-io";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchGrid, setGrid } from "../redux/reducers/gridSlice";
import { Coord, Map, Token } from "../scripts/types";
import { clamp } from "../scripts/tools/utils";
import { addTokenToMap, deleteTokenFromMap, getMap, updateToken } from "../scripts/controllers/mapsController";
import { setSelectedMap } from "../scripts/controllers/dashboardController";
import { setRightClickMenu } from "../redux/reducers/rightClickMenuSlice";
import { fetchGameData, setMap } from "../redux/reducers/gameSlice";
import { setGridPanOffset, setGridZoom } from "../redux/reducers/gridCoordSlice";


interface Props {
  userType: 'dm' | 'player';
}

export default function Canvas({ userType }: Props) {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  let offsetX = 0;
  let offsetY = 0;
  let bgOffsetX = 0;
  let bgOffsetY = 0;
  let isDragging = false;
  let isDraggingToken = false;
  let leftMouseDown = false;
  let lastX = 0;
  let lastY = 0;
  let initialClickX = 0;
  let initialClickY = 0;
  let initialTokenTopLeftX = 0;
  let initialTokenTopLeftY = 0;
  
  const dispatch = useAppDispatch();
  const { room, game, map } = useAppSelector(fetchGameData).game;
  const gridState = useAppSelector(fetchGrid);  

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const bgCtx = bgCanvas.getContext('2d');
    const gridCanvas = gridCanvasRef.current;
    const gridCtx = gridCanvas.getContext('2d');

    let currentZoom = 1;
    let gridWidth: number;
    let gridHeight: number;
    const zoomMin = 0.22, zoomMax = 1;
    const bgImage = new Image();
    let gridCellSize = 64;
    let gridColor = '#000000';
    let gridOpacity = 1;
    let gridLineWidth = 0.4;
    let selectedToken: Token;
    let boardState = map.boardState;

    onServerEvent('SELECT_MAP', async (selectedMap: Map) => {
      bgImage.src = selectedMap.image;
      await setSelectedMap(selectedMap, game.id);
      const newMap = await getMap(selectedMap.id, game.id);
      boardState = newMap.boardState;
      dispatch(setMap(newMap));
      
      dispatch(
        setGrid({
          cellSize: newMap.cellSize,
          gridColor: newMap.gridColor,
          gridOpacity: newMap.gridOpacity,
          offsetX: newMap.offsetX,
          offsetY: newMap.offsetY,
        })
      );

      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.drawImage(bgImage, bgOffsetX, bgOffsetY, bgCanvas.width * currentZoom, bgCanvas.height * currentZoom);
      drawGrid();
    });

    onServerEvent('VIEW_MAP', async (selectedMap: Map) => {
      bgImage.src = selectedMap.image;
      const newMap = await getMap(selectedMap.id, game.id);
      boardState = newMap.boardState;
      dispatch(setMap(newMap));

      dispatch(
        setGrid({
          cellSize: newMap.cellSize,
          gridColor: newMap.gridColor,
          gridOpacity: newMap.gridOpacity,
          offsetX: newMap.offsetX,
          offsetY: newMap.offsetY,
        })
      );
      
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.drawImage(bgImage, bgOffsetX, bgOffsetY, bgCanvas.width * currentZoom, bgCanvas.height * currentZoom);
      drawGrid();
    });

    onServerEvent('MOVE_TOKEN', (token: Token, mapId: number) => {
      handleDropToken(token, mapId);
    });

    onServerEvent('ADD_TOKEN_TO_BOARD', async (clientX: number, clientY: number, token: Token, mapId: number, zoom: number, offsetX: number, offsetY: number, socketId: string) => {
      const { x, y } = getGridCellCoords(clientX, clientY, zoom, offsetX, offsetY);
      
      if (socketId === socket.id) {
        // Only the player who dropped the token awaits the token addition
        await addTokenToMap(game.id, token, mapId, x, y);
        const newMap = await getMap(mapId, game.id);
        boardState = newMap.boardState;
        dispatch(setMap(newMap));
        drawGrid();
      } else {
        // Other players listen for the "TOKEN_ADDED" event from the player who dropped the token
        onServerEvent('ADD_TOKEN_TO_BOARD_SUCCESS', async () => {
          const newMap = await getMap(mapId, game.id);
          boardState = newMap.boardState;
          dispatch(setMap(newMap));
          drawGrid();
        });
      }
    
      if (socketId === socket.id) {
        emitServerEvent('ADD_TOKEN_TO_BOARD_SUCCESS', [room]);
      }
    });
    
    onServerEvent('REMOVE_TOKEN', (token: Token) => {
      removeToken(token);
    });


    const removeToken = async (token: Token) => {
      await deleteTokenFromMap(token.id);
      boardState = boardState.filter((_token: Token) => {
        return _token.id !== token.id;
      });
      drawGrid();
    };

    const handleImageLoad = () => {
      // Set bgCanvas dimensions to match parent container
      bgCanvas.width = clamp(bgImage.naturalWidth, bgImage.naturalWidth < 900 ? bgImage.naturalWidth * 4 : 900, Infinity);
      bgCanvas.height = clamp(bgImage.naturalHeight, bgImage.naturalHeight < 900 ? bgImage.naturalHeight * 4 : 900, Infinity);
      bgCtx.drawImage(bgImage, bgOffsetX, bgOffsetY, bgCanvas.width, bgCanvas.height);
    
      // Set gridCanvas position to match bgCanvas position
      gridCanvas.width = clamp(bgImage.naturalWidth, bgImage.naturalWidth < 900 ? bgImage.naturalWidth * 4 : 900, Infinity);
      gridCanvas.height = clamp(bgImage.naturalHeight, bgImage.naturalHeight < 900 ? bgImage.naturalHeight * 4 : 900, Infinity);
    
      // Update grid dimensions based on current zoom level and image dimensions
      gridWidth = Math.ceil(bgImage.naturalWidth / (gridCellSize * currentZoom));
      gridHeight = Math.ceil(bgImage.naturalHeight / (gridCellSize * currentZoom));
      drawGrid();
    };

    // Load background image and draw it onto the bgCanvas
    bgImage.onload = () => {
      handleImageLoad();
    };

    const drawGrid = () => {
      // Calculate maximum grid dimensions based on image dimensions and cell size
      const maxGridWidth = Math.floor(bgCanvas.width / gridCellSize);
      const maxGridHeight = Math.floor(bgCanvas.height / gridCellSize);
    
      // Calculate grid dimensions based on current zoom level and maximum grid dimensions
      gridWidth = Math.max(maxGridWidth, Math.floor(maxGridWidth * currentZoom));
      gridHeight = Math.max(maxGridHeight, Math.floor(maxGridHeight * currentZoom));
    
      gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
      gridCtx.strokeStyle = gridColor;
      gridCtx.globalAlpha = gridOpacity;
      gridCtx.lineWidth = gridLineWidth;
    
      for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
          // Update drawing coordinates based on offsetX and offsetY values, and scale with currentZoom
          gridCtx.strokeRect(
            (x * gridCellSize * currentZoom) + offsetX,
            (y * gridCellSize * currentZoom) + offsetY,
            gridCellSize * currentZoom,
            gridCellSize * currentZoom
          );
        }
      }
      placeTokens();
    };

    // Place all tokens from boardState onto the grid
    const placeTokens = () => {
      // Check if array is null
      const filteredBoardState = boardState.filter((token: Token) => token.id);
      if (!boardState || filteredBoardState.length === 0) return;

      boardState.forEach((mapToken: Token) => {
        drawToken(mapToken.x, mapToken.y, mapToken.image, mapToken.size);
      });
    };

    // Places a token onto the grid
    const drawToken = (x: number, y: number, imageSrc: string, size: number) => {
      const adjustedX = x * gridCellSize * currentZoom + offsetX;
      const adjustedY = y * gridCellSize * currentZoom + offsetY;
      const tokenSize = size * gridCellSize * currentZoom;

      const image = new Image();
      image.src = imageSrc;
    
      gridCtx.save();

      // Set the globalAlpha to 1 to ensure the token image is drawn at full opacity
      gridCtx.globalAlpha = 1;
    
      // Draw a circle as a clipping path
      gridCtx.beginPath();
      gridCtx.arc(adjustedX + tokenSize / 2, adjustedY + tokenSize / 2, tokenSize / 2, 0, 2 * Math.PI);
      gridCtx.closePath();
      gridCtx.clip();
    
      // Draw the token image at the adjusted x and y coordinates with the token size
      gridCtx.drawImage(image, adjustedX, adjustedY, tokenSize, tokenSize);
      gridCtx.restore();
    };

    // Handles changes to grid values
    const updateGrid = () => {
      const convertedOpacity = gridState.gridOpacity / 100;
      gridCtx.strokeStyle = gridState.gridColor;
      gridCtx.globalAlpha = convertedOpacity;

      // Update grid properties and redraw
      gridCellSize = gridState.cellSize;
      gridColor = gridState.gridColor;
      gridOpacity = convertedOpacity;
      
      offsetX = 0;
      offsetY = userType === 'dm' ? 40 : 0;
      bgOffsetX = gridState.offsetX;
      bgOffsetY = userType === 'dm' ? 40 : gridState.offsetY;

      bgImage.src = map.image;
      drawGrid();
    };

    // Transform canvas position
    const panGrid = (e: MouseEvent) => {
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
    
      offsetX += deltaX;
      offsetY += deltaY;
      bgOffsetX += deltaX;
      bgOffsetY += deltaY;
      dispatch(setGridPanOffset({ offsetX: offsetX, offsetY: offsetY }));

      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.drawImage(bgImage, bgOffsetX, bgOffsetY, bgCanvas.width * currentZoom, bgCanvas.height * currentZoom);
      drawGrid();
    };

    const zoomGrid = (e: WheelEvent) => {
      const bgCtx = bgCanvas.getContext('2d');
      const delta = e.deltaY;
      const scaleSpeed = 0.001;
    
      // Calculate the new zoom level
      const newZoom = currentZoom - delta * scaleSpeed;
      const clampedZoom = Math.max(zoomMin, Math.min(zoomMax, newZoom));

      // Determine grid line thickness based on zoom level
      if (clampedZoom <= 0.34) {
        gridLineWidth = 0.2;
      } else {
        gridLineWidth = 0.4;
      }
    
      // Calculate the mouse cursor position relative to the canvas
      const rect = bgCanvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
    
      // Update the zoom level and offset
      offsetX = (offsetX - mouseX) * (clampedZoom / currentZoom) + mouseX;
      offsetY = (offsetY - mouseY) * (clampedZoom / currentZoom) + mouseY;
      bgOffsetX = (bgOffsetX - mouseX) * (clampedZoom / currentZoom) + mouseX;
      bgOffsetY = (bgOffsetY - mouseY) * (clampedZoom / currentZoom) + mouseY;
      currentZoom = clampedZoom;
      dispatch(setGridZoom(clampedZoom));
    
      // Redraw the image
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.drawImage(bgImage, bgOffsetX, bgOffsetY, bgCanvas.width * currentZoom, bgCanvas.height * currentZoom);
      drawGrid();
    };

    // Returns the coordinates of the grid cell clicked on
    const getGridCellCoords = (clickX: number, clickY: number, zoom: number = currentZoom, _offsetX: number = offsetX, _offsetY: number = offsetY): Coord => {
      const rect = gridCanvasRef.current.getBoundingClientRect();
      const mouseX = clickX - rect.left;
      const mouseY = clickY - rect.top;
      const cellSize = gridCellSize * zoom;
      const gridX = Math.floor((mouseX - _offsetX) / cellSize);
      const gridY = Math.floor((mouseY - _offsetY) / cellSize);
      return { x: clamp(gridX, 0, gridWidth - 1), y: clamp(gridY, 0, gridHeight - 1) };
    };

    // Returns the token that was click on
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
    
    // Create a ghost image to show token movement
    const handleTokenGhostImage = (e: MouseEvent) => {
      const { x, y } = getGridCellCoords(e.clientX, e.clientY);
      const offsetX = x - initialClickX;
      const offsetY = y - initialClickY;
      const newTopLeftX = initialTokenTopLeftX + offsetX;
      const newTopLeftY = initialTokenTopLeftY + offsetY;
  
      selectedToken = { ...selectedToken, x: newTopLeftX, y: newTopLeftY };
  
      // Update the board state and redraw
      boardState = boardState.map((token: Token) => {
        if (token.id !== selectedToken.id) return token;
        return { ...selectedToken };
      });
      drawGrid();
    };
    
    // Update board state
    const handleDropToken = (token: Token, mapId: number) => {
      // Make sure that if this map isn't shared, this should only run for DM
      if (map.id !== mapId) return;
      boardState = boardState.map((_token: Token) => {
        if (_token.id !== token.id) return _token;
        return { ...token, x: token.x, y: token.y };
      });
      drawGrid();
    };


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
        // Hide context menu
        if (!(e.target as HTMLElement).classList.contains('right-click-menu__btn')) {
          document.getElementById('right-click-menu').classList.add('hidden');
        }
        // Reset right click menu state
        dispatch(
          setRightClickMenu({ type: '' })
        );
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
        emitServerEvent('MOVE_TOKEN', [selectedToken, map.id, room]);
      }
    };

    // Handles clicks that are on the grid container
    const handleRightClick = (e: MouseEvent) => {
      if (e.buttons !== 2) return;

      // Reset right click menu state
      dispatch(
        setRightClickMenu({ type: '' })
      );
      const token: Token = getTokenSelected(e.pageX, e.pageY);
      const rightClickMenu = document.getElementById('right-click-menu');

      // Check if right clicking on token
      if (token) {
        dispatch(
          setRightClickMenu({ type: 'token', token: token })
        );
      }

      rightClickMenu.classList.remove('hidden');
      rightClickMenu.style.setProperty('left', `${e.pageX}px`);
      rightClickMenu.style.setProperty('top', `${e.pageY}px`);
    };

    const handleMouseWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomGrid(e);
    };

    updateGrid(); // Call updateGrid initially

    const gridContainer: HTMLElement = document.querySelector('.grid-container');
    // Attach event listeners for canvas
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    gridContainer.addEventListener('mousedown', handleRightClick);
    gridContainer.addEventListener('wheel', handleMouseWheel);

    return () => {
      // Cleanup event listeners
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      gridContainer.removeEventListener('mousedown', handleRightClick);
      gridContainer.removeEventListener('wheel', handleMouseWheel);
      offServerEvent('SET_GRID');
      offServerEvent('SELECT_MAP');
      offServerEvent('VIEW_MAP');
      offServerEvent('MOVE_TOKEN');
      offServerEvent('ADD_TOKEN_TO_BOARD');
    };
  }, [gridState, userType]);

  return (
    <>
      <canvas className="canvas--bg" ref={bgCanvasRef}></canvas>
      <canvas className="canvas--grid" ref={gridCanvasRef}
        onContextMenu={(e) => { e.preventDefault(); }}
      ></canvas>
    </>
  );
}
