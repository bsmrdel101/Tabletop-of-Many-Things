import { emitServerEvent } from "../scripts/socket.io";
import { Coord } from "../scripts/types";
import { room } from "../views/dashboardPage";
import { user } from "./grid";
import { placeToken } from "./tokensMenu";

export let mousePos: Coord = { x: 0, y: 0 };
let lastPos: Coord;

class Token {
    id: number;
    image: string;
    size: number;
    relative: string;
        
    constructor(id: number, image: string, size: number, relative: string) {
        this.id = id;
        this.image = image;
        this.size = size;
        this.relative = relative;
    }
}

// Function gets called when user drops a token
export const addTokenToBoard = (selectedCell: Element) => {
    // Clone token being dragged from menu
    const menuToken = document.querySelector('.token--dragging');
    menuToken.classList.remove('token--dragging');
    const newToken = new Token(parseInt(menuToken.id), menuToken.getAttribute('src'), parseInt(menuToken.getAttribute('size')), menuToken.getAttribute('relative'));

    if (!parseInt(selectedCell.getAttribute('x'))) {
        menuToken.classList.remove('menu__item');
        menuToken.classList.remove('menu__item--token');
        socketPlaceToken({ x: lastPos.x, y: lastPos.y }, newToken, user.username, room);
    }

    if (!(selectedCell.childNodes.length > 0)) {
        menuToken.classList.remove('menu__item');
        menuToken.classList.remove('menu__item--token');
        socketPlaceToken({ x: parseInt(selectedCell.getAttribute('x')), y: parseInt(selectedCell.getAttribute('y')) }, newToken, user.username, room);
    }
};

const socketPlaceToken = (coords: Coord, tokenData: Token, username: string, room: string) => {
    emitServerEvent('PLACE_TOKEN', [coords, tokenData, username, room]);
};

export const addTokenEvents = (token: any, relative: string) => {
    // Open stats menu after double click
    // token.addEventListener('dblclick', () => {
    //     if (!relative) return;
    //     openCreatureStatsWindow(relative);
    // });
    // Handle dragging token
    token.addEventListener('dragstart', (e: any) => {
        const tokenPos = token.getBoundingClientRect();
        mousePos = {
            x: e.x - tokenPos.x,
            y: e.y - tokenPos.y
        };

        placeToken(token, parseInt(token.getAttribute('size')));
        const cell = token.parentNode;
        lastPos = {x: parseInt(cell.getAttribute('x')), y: parseInt(cell.getAttribute('y'))};
    });
    // Handle token moved
    token.addEventListener('dragend', () => {
        emitServerEvent('REMOVE_TOKEN', [lastPos, room]);
        const size = parseInt(token.getAttribute('size'));
        emitServerEvent('REMOVE_OCCUPIED_TOKEN_SPACE', [lastPos.x, lastPos.y, size, room]);
    });
};
