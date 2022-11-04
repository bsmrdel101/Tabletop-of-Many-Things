import { addTokenToBoard, mousePos } from "./token";
import { clamp, findRelativeCell } from "./tools/utils";

const zoomMin = 4, zoomMax = 64;

// Add event handlers for the grid
export const addGridEvents = (grid: HTMLElement) => {
    let selectedCell: EventTarget;
    // Fires whenever token is dragged over the grid
    // The last cell hovered over is the selected cell
    grid.addEventListener('dragover', (e) => {
        selectedCell = e.target;
    });

    document.addEventListener('dragend', () => {
        const relativeCell: Element = findRelativeCell(selectedCell, mousePos.x, mousePos.y);
        const menuToken = document.querySelector('.token--dragging');
        
        if (menuToken.classList.contains('menu__item')) {
            // If this is token is being dragged out from the menu, then place it exactly where the mouse cursor is.
            addTokenToBoard(<Element>selectedCell);
        } else {
            // Else place it normally
            addTokenToBoard(relativeCell || <Element>selectedCell);
        }
    });
};

export const zoomIn = () => {
    const grid: HTMLElement = document.querySelector('.grid');
    const rs = getComputedStyle(grid);
    const zoomValue = parseInt(rs.getPropertyValue('--size'));
    grid.style.setProperty('--size', `${clamp(zoomValue + 4, zoomMin, zoomMax)}px`);
};

export const zoomOut = () => {
    const grid: HTMLElement = document.querySelector('.grid');
    const rs = getComputedStyle(grid);
    const zoomValue = parseInt(rs.getPropertyValue('--size'));
    grid.style.setProperty('--size', `${clamp(zoomValue - 4, zoomMin, zoomMax)}px`);
};
