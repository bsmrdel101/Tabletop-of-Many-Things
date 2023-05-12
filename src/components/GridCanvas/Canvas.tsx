import React, { useEffect, useRef, useState } from "react";
import { emitServerEvent, offServerEvent, onServerEvent } from "../../scripts/socket-io";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGrid, setGrid } from "../../redux/reducers/gridSlice";
import { Coord, Map, Token } from "../../scripts/types";
import { selectedMap, setSelectedMapObject } from "../Menus/MapsMenu/MapsMenu";
import { clamp } from "../../scripts/tools/utils";
import { getMap, setMapBoardState } from "../../controllers/mapsController";
import { roomRef } from "../../views/GamePage/GamePage";
import { setSelectedMap } from "../../controllers/dashboardController";
import './Canvas.scss';
import { setRightClickMenuType } from "../../redux/reducers/rightClickMenuSlice";
import RightClickMenu from "../RightClickMenus/RightClickMenu";


export default function Canvas() {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  let offsetX = 0;
  let offsetY = 0;
  let bgOffsetX = 0;
  let bgOffsetY = 0;
  let isDragging = false;
  let isDraggingToken = false;
  let lastX = 0;
  let lastY = 0;
  
  const dispatch = useAppDispatch();
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

    if (!selectedMap) return;

    onServerEvent('SET_GRID', () => {
      updateGrid();
    });

    onServerEvent('SELECT_MAP', async (map: Map) => {
      bgImage.src = selectedMap.image;
      await setSelectedMap(map);
      setSelectedMapObject(map);
      dispatch(
        setGrid({
          cellSize: map.cellSize,
          gridColor: map.gridColor,
          gridOpacity: map.gridOpacity,
          offsetX: map.offsetX,
          offsetY: map.offsetY,
        })
      );
    });

    onServerEvent('VIEW_MAP', (map: Map) => {
      setSelectedMapObject(map);
      dispatch(
        setGrid({
          cellSize: map.cellSize,
          gridColor: map.gridColor,
          gridOpacity: map.gridOpacity,
          offsetX: map.offsetX,
          offsetY: map.offsetY,
        })
      );
    });

    onServerEvent('PLACE_TOKEN', (boardState: string, mapId: number) => {
      handleDropToken(boardState, mapId);
    });

    onServerEvent('ADD_TOKEN_TO_BOARD', (clientX: number, clientY: number, token: Token, mapId: number) => {
      const { x, y } = getGridCellCoords(clientX, clientY);
      addTokenToBoard(x, y, token, mapId);
    });


    // Create and place a token on grid cell
    const addTokenToBoard = (x: number, y: number, token: Token, mapId: number) => {
      // Update current board state
      // Send new board state inside place token event
      let filteredBoardState = '[';
      selectedMap.boardState.forEach((boardToken: Token) => {
        const { id, x, y, size, image } = boardToken;
        filteredBoardState += `{"map_id": ${selectedMap.id}, "id": ${id}, "x": ${x}, "y": ${y}, "size": ${size}, "image": "${image}"}`;
      });
      filteredBoardState += `{"map_id": ${selectedMap.id}, "id": ${token.id}, "x": ${x}, "y": ${y}, "size": ${token.size}, "image": "${token.image}"}`;
      filteredBoardState += ']';
      // Drop token
      handleDropToken(filteredBoardState, mapId);
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
      selectedMap.boardState.forEach((mapToken: Token) => {
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
      offsetY = 0;
      bgOffsetX = gridState.offsetX;
      bgOffsetY = gridState.offsetY;

      bgImage.src = selectedMap.image;
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
    
      // Redraw the image
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.drawImage(bgImage, bgOffsetX, bgOffsetY, bgCanvas.width * currentZoom, bgCanvas.height * currentZoom);
      drawGrid();
    };

    // Returns the coordinates of the grid cell clicked on
    const getGridCellCoords = (clickX: number, clickY: number): Coord => {
      const rect = gridCanvasRef.current.getBoundingClientRect();
      const mouseX = clickX - rect.left;
      const mouseY = clickY - rect.top;
      const cellSize = gridCellSize * currentZoom;
      const gridX = Math.floor((mouseX - offsetX) / cellSize);
      const gridY = Math.floor((mouseY - offsetY) / cellSize);
      return { x: clamp(gridX, 0, gridWidth - 1), y: clamp(gridY, 0, gridHeight - 1) };
    };

    // Returns the token that was click on
    const getTokenSelected = (clickX: number, clickY: number): Token | null => {
      const map: Map = selectedMap;
      const tokens: Token[] = map.boardState;
      const { x, y } = getGridCellCoords(clickX, clickY);
    
      for (const token of tokens) {
        if (token.x === x && token.y === y) {
          return token;
        }
      }
      return null;
    };

    // Create a ghost image to show token movement
    const handleTokenGhostImage = (e: MouseEvent) => {
      const { x, y } = getGridCellCoords(e.clientX, e.clientY);
      selectedToken.x = x;
      selectedToken.y = y;
      drawGrid();
    };

    // Update board state
    const handleDropToken = async (boardState: string, mapId: number) => {
      // Make sure that if this map isn't shared, this should only run for DM
      if (selectedMap.id !== mapId) return;

      const newState: string = boardState.replaceAll('}{', '},{');
      await setMapBoardState(selectedMap.id, newState);
      setSelectedMapObject(await getMap(selectedMap.id));
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
        selectedToken = getTokenSelected(e.clientX, e.clientY);
        if (selectedToken) {
          isDraggingToken = true;
          document.querySelector('body').classList.add('grabbing');
        }
        // Hide context menu
        document.getElementById('right-click-menu').classList.add('hidden');
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
      if (isDragging) panGrid(e);
      if (isDraggingToken) handleTokenGhostImage(e);
    };

    const handleMouseUp = (e: MouseEvent) => {
      isDragging = false;
      document.querySelector('body').classList.remove('panning');

      // Detect dropping a token
      if (isDraggingToken) {
        isDraggingToken = false;
        document.querySelector('body').classList.remove('grabbing');

        // Update current board state
        // Send new board state inside place token event
        let filteredBoardState = '[';
        selectedMap.boardState.forEach((boardToken: Token) => {
          const { id, x, y, size, image } = boardToken;
          filteredBoardState += `{"map_id": ${selectedMap.id}, "id": ${id}, "x": ${x}, "y": ${y}, "size": ${size}, "image": "${image}"}`;
        });
        filteredBoardState += ']';

        // Place token event
        emitServerEvent('PLACE_TOKEN', [filteredBoardState, selectedMap.id, roomRef]);
      }
    };

    // Handles clicks that are on the grid container
    const handleRightClick = (e: MouseEvent) => {
      if (e.buttons !== 2) return;
      const rightClickMenu = document.getElementById('right-click-menu');
      dispatch(
        setRightClickMenuType('token')
      );
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
      offServerEvent('PLACE_TOKEN');
    };
  }, [gridState, selectedMap]);

  return (
    <>
      <canvas className="canvas--bg" ref={bgCanvasRef}></canvas>
      <canvas className="canvas--grid" ref={gridCanvasRef}
        onContextMenu={(e) => { e.preventDefault(); }}
      ></canvas>
      
      {/* Right click menu */}
      {/* <RightClickMenu /> */}
    </>
  );
}
