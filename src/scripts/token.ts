import { selectedCellRef } from "../components/Grid/Grid";
import { addTokenToMap, clearTokensFromMap } from "../controllers/mapsController";
import { roomRef } from "../views/GamePage/GamePage";
import { dropToken } from "./gridEvents";
import { emitServerEvent } from "./socket-io";
import { findRelativeCell, getCoords } from "./tools/utils";
import { Coord } from "./types";


const updateMapState = async () => {
  // Clear persistent token data
  await clearTokensFromMap();
  // Save current token positions
  document.querySelectorAll('.token').forEach((token: Element) => {
    const coords: Coord = getCoords(token.parentElement);
    const size = parseInt(token.getAttribute('size'));
    // Add token data to map_tokens
    addTokenToMap({
      token: 
        new Token(
          parseInt(token.getAttribute('token-id')),
          token.getAttribute('src'),
          size,
          token.getAttribute('creature')
        ),
      x: coords.x,
      y: coords.y,
      size: size
    });
  });
};

export class Token {
  id: number;
  image: string;
  size: number;
  creature: string;
  el?: any;
  lastPos?: Coord;
  previewToken?: any;
  ghostImage?: any;
      
  constructor(id: number, image: string, size: number, creature: string) {
    this.id = id;
    this.image = image;
    this.size = size;
    this.creature = creature;
    this.createElement();
    this.ghostImage = new Image();
    this.ghostImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  }

  createElement() {
    this.el = document.createElement('img');
    
    // Set token data
    if (this.el) {
      this.el.classList.add('token', 'menu__item', 'menu__item--token');
    } else {
      this.el.classList.add('token');
    }
    this.el.setAttribute('src', this.image);
    this.el.setAttribute('creature', this.creature);
    this.el.setAttribute('size', this.size);
    let mousePos: Coord = { x: 0, y: 0 };

    // Handle start dragging
    this.el.addEventListener('dragstart', (e: any) => {
      // Get token and cell position data
      const tokenPos = this.el.getBoundingClientRect();
      mousePos = {
        x: e.x - tokenPos.x,
        y: e.y - tokenPos.y
      };
      const cell: Element = this.el.parentNode;
      this.lastPos = getCoords(cell);

      // Remove token from board
      emitServerEvent('REMOVE_TOKEN', [this.lastPos, this, roomRef]);

      // Create ghost image
      this.previewToken = document.createElement('img');
      this.previewToken.classList.add('token', 'token--dragging');

      // Style ghost image
      const gridStyles = getComputedStyle(document.querySelector('.grid')!);
      const gridSize = gridStyles.getPropertyValue('--size');
      this.previewToken.style.setProperty('height', `${parseInt(gridSize.split('px')[0].replace(' ', '')) * this.size}px`);
      this.previewToken.style.setProperty('width', `${parseInt(gridSize.split('px')[0].replace(' ', '')) * this.size}px`);

      // Set ghost image data
      this.previewToken.setAttribute('src', this.image);

      // Customize the drag image
      e.dataTransfer.setDragImage(this.ghostImage, 0, 0);
    });

    this.el.addEventListener('dblclick', () => {
      // Open stats
    });

    // Handle token placement preview
    this.el.addEventListener('drag', () => {
      const relativeCell: Element = findRelativeCell(selectedCellRef, mousePos.x, mousePos.y);
      relativeCell.appendChild(this.previewToken);
    });

    // Handle dropping token
    this.el.addEventListener('dragend', () => {
      this.previewToken.remove();
      const selectedCell: Coord = getCoords(selectedCellRef);
      dropToken(selectedCell, this, mousePos);
      updateMapState();
    });
  }
}
