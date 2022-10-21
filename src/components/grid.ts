import { findCell, ready } from '../scripts/tools/utils';
import { Coord, Token, User } from "../scripts/types";
import { room } from '../views/dashboardPage';
import { bindEventsToGrid } from '../scripts/gridInput';
import { resetTokenBodyData } from './tokensMenu';
import { getUser } from '../controllers/userController';
import { emitServerEvent, onServerEvent } from '../scripts/socket-io';
import { addTokenEvents, occupyTokenSpace, removeOccupyTokenSpace } from '../scripts/token';
import { addGridEvents } from '../scripts/gridEvents';

export let user: User;

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

// Clears the board and resets its click detection
const resetBoard = () => {
    document.querySelectorAll('.grid__cell').forEach((cell) => {
        cell.remove();
    });
    document.querySelectorAll('.token').forEach((token) => {
        token.remove();
    });
};

// Add a token to the board
onServerEvent('PLACE_TOKEN', ((selectedCell: Coord, menuToken: Token, username: string) => {
    const { x, y } = selectedCell;
    const { image, relative, size } = menuToken;
    const token = document.createElement('img');
    const cell = findCell(x, y);
    token.classList.add('token');
    token.setAttribute('src', image);
    token.setAttribute('relative', relative)
    token.setAttribute('user', username);
    token.setAttribute('size', `${size}`);
    cell.appendChild(token);
    // Set token size
    token.style.setProperty('height', `calc(var(--size) * ${size})`);
    token.style.setProperty('width', `calc(var(--size) * ${size})`);
    // Set token position
    token.style.setProperty('--row', `${x}`);
    token.style.setProperty('--column', `${y}`);

    if (size > 1) {
        occupyTokenSpace(x, y, size);
    } else {
        cell.classList.add('occupied--enemy');
        cell.classList.add('occupied');
    }

    addTokenEvents(token, relative);
    resetTokenBodyData();
}));

// Removes the token background for everyone
onServerEvent('REMOVE_OCCUPIED_TOKEN_SPACE', (lastPosX: number, lastPosY: number, size: number) => {
    if (size > 1) {
        removeOccupyTokenSpace(lastPosX, lastPosY, size);
    } else {
        findCell(lastPosX, lastPosY).classList.remove('occupied--enemy');
        findCell(lastPosX, lastPosY).classList.remove('occupied');
    }
});

onServerEvent('REMOVE_TOKEN', ((cell: Coord) => {
    const newCell = findCell(cell.x, cell.y);
    newCell.innerHTML = '';
}));


export default function grid() {
    ready(async () => {
        user = await getUser();
        emitServerEvent('SET_NAME', [user.username]);
        emitServerEvent('UPDATE_PLAYER_LIST', [room]);
        setupGrid(25, 25);
        bindEventsToGrid();
    }, '.grid');

    return `
        <div class="grid"></div>
    `;
}
