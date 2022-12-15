import { selectedCellRef } from "../components/Grid/Grid";
import { roomRef } from "../views/GamePage/GamePage";
import { dropToken } from "./gridEvents";
import { emitServerEvent } from "./socket-io";
import { getCoords } from "./tools/utils";
import { Coord } from "./types";


export class Token {
  id: number;
  image: string;
  size: number;
  creature: string;
  el?: any;
  lastPos?: Coord;
      
  constructor(id: number, image: string, size: number, creature: string) {
    this.id = id;
    this.image = image;
    this.size = size;
    this.creature = creature;
    this.createElement();
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

    this.el.addEventListener('dragstart', (e: any) => {
      const tokenPos = this.el.getBoundingClientRect();
      mousePos = {
        x: e.x - tokenPos.x,
        y: e.y - tokenPos.y
      };
      const cell: Element = this.el.parentNode;
      this.lastPos = getCoords(cell);
    });
    // Handle dropping token
    this.el.addEventListener('dragend', () => {
      emitServerEvent('REMOVE_TOKEN', [this.lastPos, roomRef]);
      // emitServerEvent('REMOVE_OCCUPIED_TOKEN_SPACE', [lastPos.x, lastPos.y, this.size, roomRef]);
      const selectedCell: Coord = getCoords(selectedCellRef);
      dropToken(selectedCell, this, mousePos);
    });
  }
}
