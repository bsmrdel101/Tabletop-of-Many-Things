import { clamp } from "./tools/utils";


const zoomMin = 4, zoomMax = 64;
// const maxCellCount = 260;

export const addTokenToBoard = (selectedCell: Element) => {
  console.log(selectedCell);
  //   const relativeCell: Element = findRelativeCell(selectedCell, mousePos.x, mousePos.y);
  //   const menuToken = document.querySelector('.token--dragging')!;
        
//   if (menuToken.classList.contains('menu__item')) {
//     // If this is token is being dragged out from the menu, then place it exactly where the mouse cursor is.
//     addTokenToBoard(<Element>selectedCell);
//   } else {
//     // Else place it normally
//     addTokenToBoard(relativeCell || <Element>selectedCell);
//   }
};

export const zoomIn = () => {
  const grid: any = document.querySelector('.grid');
  const rs = getComputedStyle(grid);
  const zoomValue = parseInt(rs.getPropertyValue('--size'));
  grid.style.setProperty('--size', `${clamp(zoomValue + 1, zoomMin, zoomMax)}px`);
};

export const zoomOut = () => {
  const grid: any = document.querySelector('.grid');
  const rs = getComputedStyle(grid);
  const zoomValue = parseInt(rs.getPropertyValue('--size'));
  grid.style.setProperty('--size', `${clamp(zoomValue - 1, zoomMin, zoomMax)}px`);
};
