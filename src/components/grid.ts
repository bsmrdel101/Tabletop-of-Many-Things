import { clamp, findCell, findRelativeCell, ready } from '../scripts/utils';
import { User, Coord } from "../scripts/types";
import { room } from '../views/dashboardPage';
import { bindEventsToGrid } from '../scripts/gridInput';
import { io, Socket } from "socket.io-client";
import { placeToken, resetTokenBodyData } from './tokensMenu';
import { getUser } from '../controllers/userController';
const socket: Socket = io();

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

let lastPos: Coord;
let mousePos: Coord = { x: 0, y: 0 };
let user: User;
let zoomMin: number = 12, zoomMax: number = 64;


export const setupGrid = (width: number, height: number) => {
    const grid: HTMLElement = <HTMLElement>document.querySelector('.grid');
    grid.style.setProperty('--grid-x', <any>width);
    grid.style.setProperty('--grid-y', <any>height);

    // Adding 1 to width and height, because grid starts at (1,1)
    createGridClickDetection(width + 1, height + 1, grid);
    addGridEvents(grid);
};

// Generates div's in each cell, with x and y coordinates
// The div's will detect where the user drops a token
const createGridClickDetection = (width: number, height: number, grid: HTMLElement) => {
    resetBoard();
    for (let y = 1; y < height; y++) {
        for (let x = 1; x < width; x++) {
            grid.insertAdjacentHTML('beforeend', `
                <div class="grid__cell cell" x="${x}" y="${y}"></div>
            `);
        }
    }
};

// Add event handlers for the grid
const addGridEvents = (grid: HTMLElement) => {
    let selectedCell: EventTarget;
    // Fires whenever token is dragged over the grid
    // The last cell hovered over is the selected cell
    grid.addEventListener('dragover', (e) => {
        selectedCell = e.target;
    });

    document.addEventListener('dragend', () => {
        const relativeCell: Element = findRelativeCell(selectedCell, mousePos.x, mousePos.y);
        addTokenToBoard(relativeCell || <Element>selectedCell);
    });
};

const addTokenEvents = (token: any, relative: string) => {
    // Open stats menu after double click
    token.addEventListener('dblclick', () => {
        if (!relative) return;
        // openCreatureStatsWindow(relative);
    });
    // Handle dragging token
    token.addEventListener('dragstart', (e: any) => {
        const tokenPos = token.getBoundingClientRect();
        mousePos = {
            x: e.x - tokenPos.x,
            y: e.y - tokenPos.y
        };

        placeToken(e, parseInt(token.getAttribute('size')));
        const cell = token.parentNode;
        lastPos = {x: parseInt(cell.getAttribute('x')), y: parseInt(cell.getAttribute('y'))};
    });
    // Handle token moved
    token.addEventListener('dragend', () => {
        socket.emit('REMOVE_TOKEN', lastPos, room);
        const size = parseInt(token.getAttribute('size'));
        socket.emit('REMOVE_OCCUPIED_TOKEN_SPACE', lastPos.x, lastPos.y, size, room);
    });
};

const addTokenToBoard = (selectedCell: Element) => {    
    // Clone token being dragged from menu
    const menuToken = document.querySelector('.token--dragging');
    menuToken.classList.remove('token--dragging');
    const newToken = new Token(parseInt(menuToken.id), menuToken.getAttribute('src'), parseInt(menuToken.getAttribute('size')), menuToken.getAttribute('relative'));

    if (!parseInt(selectedCell.getAttribute('x'))) {
        menuToken.classList.remove('menu__item');
        menuToken.classList.remove('menu__item--token');
        socketPlaceToken({x: lastPos.x, y: lastPos.y}, newToken, user.username, room);
    }

    if (!(selectedCell.childNodes.length > 0)) {
        menuToken.classList.remove('menu__item');
        menuToken.classList.remove('menu__item--token');
        socketPlaceToken({x: parseInt(selectedCell.getAttribute('x')), y: parseInt(selectedCell.getAttribute('y'))}, newToken, user.username, room);
    }
}

export const zoomIn = () => {
    const grid: HTMLElement = document.querySelector('.grid');
    let rs = getComputedStyle(grid);
    let zoomValue = parseInt(rs.getPropertyValue('--size'));
    grid.style.setProperty('--size', `${clamp(zoomValue + 4, zoomMin, zoomMax)}px`);
};

export const zoomOut = () => {
    const grid: HTMLElement = document.querySelector('.grid');
    let rs = getComputedStyle(grid);
    let zoomValue = parseInt(rs.getPropertyValue('--size'));
    grid.style.setProperty('--size', `${clamp(zoomValue - 4, zoomMin, zoomMax)}px`);
};

// Occupy tiles that the token fills, if the token is bigger than 1 cell
const occupyTokenSpace = (cellX: number, cellY: number, size: number) => {
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const cell = findCell(cellX + x, cellY + y);
            cell.style.setProperty('background-color', 'var(--enemy-background)');
        }
    }
};

// Don't occupy tiles that the token fills, if the token is bigger than 1 cell
const removeOccupyTokenSpace = (cellX: number, cellY: number, size: number) => {
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const cell = findCell(cellX + x, cellY + y);
            cell.style.removeProperty('background-color');
        }
    }
};

// Clears the board and resets its click detection
const resetBoard = () => {
    document.querySelectorAll('.grid__cell').forEach((cell) => {
        cell.remove();
    });
    document.querySelectorAll('.token').forEach((token) => {
        token.remove();
    });
};

const socketPlaceToken = (coords: Coord, tokenData: Token, username: string, room: string) => {
    socket.emit('PLACE_TOKEN', coords, tokenData, username, room);
};


// Add a token to the board
socket.on('PLACE_TOKEN', ((selectedCell, menuToken, username) => {
    console.log(selectedCell, menuToken, username);
    
    const { x, y } = selectedCell;
    const { img, relative, size } = menuToken;
    const token = document.createElement('img');
    const cell = findCell(x, y);
    token.classList.add('token');
    token.setAttribute('src', img);
    token.setAttribute('relative', relative)
    token.setAttribute('user', username);
    token.setAttribute('size', size);
    cell.appendChild(token);
    // Set token size
    token.style.setProperty('height', `calc(var(--size) * ${size})`);
    token.style.setProperty('width', `calc(var(--size) * ${size})`);
    // Set token position
    token.style.setProperty('--row', x);
    token.style.setProperty('--column', y);

    if (size > 1) {
        occupyTokenSpace(x, y, size);
    } else {
        cell.style.setProperty('background-color', 'var(--enemy-background)');
    }

    addTokenEvents(token, relative);
    resetTokenBodyData();
}));


export default function grid() {
    ready(async () => {
        user = await getUser();
        socket.emit('SET_NAME', user.username);
        socket.emit('UPDATE_PLAYER_LIST', room);
        setupGrid(25, 25);
        bindEventsToGrid();
    }, '.grid');

    return `
        <div class="grid"></div>
    `;
}