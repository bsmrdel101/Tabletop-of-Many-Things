import e from "cors";
import { Coord } from "../types";

// Clamp number between two values
export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

// Will find and return a cell with the parameters given
export const findCell = (x: number, y: number) => {
  for (const cell of Array.from(document.querySelectorAll('.grid__cell'))) {
    if (cell.getAttribute('data-cell-x') === x.toString() && cell.getAttribute('data-cell-y') === y.toString()) {
      return <HTMLElement>cell;
    }
  }
};

export const findRelativeCell = (elmt: any, offsetX: number, offsetY: number) => {
  const cellWidth = elmt.clientWidth;
  const cellHeight = elmt.clientHeight;
  const numXCells = Math.ceil(offsetX / cellWidth) - 1;
  const numYCells = Math.ceil(offsetY / cellHeight) - 1;
  return findCell(elmt.getAttribute('data-cell-x') - numXCells, elmt.getAttribute('data-cell-y') - numYCells);
};

// Returns true if it finds the element in an array
export const checkForElement = (arr: any[], selector: string) => {
  const el = document.querySelector(selector);
  if (arr.includes(el)) {
    return true;
  } else {
    return false;
  }
};

export const getCoords = (cell: Element): Coord => {
  return {
    x: parseInt(cell.getAttribute('data-cell-x')!),
    y: parseInt(cell.getAttribute('data-cell-y')!)
  };
};

export const composedPath = (el: Element) => {
  const path = [];
  while (el) {
    path.push(el);
    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
};
