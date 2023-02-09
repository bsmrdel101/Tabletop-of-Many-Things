import { AtSpecificLevel, Coord, Damage, DC, Dice } from "../types";

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
  if (!elmt) return;
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

// Make a window able to be dragged around
export const makeDraggable = (el: HTMLElement, selector?: string) => {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (el.querySelector(selector)) {
    // if present, the header is where you move the DIV from:
    (<HTMLElement>el.querySelector(selector)).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    el.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: any) {
    if (e.which !== 1) return;
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
};

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Returns an array of primitive types with all duplicate items removed from it
export const sortDuplicateArrayItems = (array: any[]): any => {
  return Array.from(new Set(array));
};

// Returns an array of objects with all duplicate items removed from it
export const sortDuplicateArrayItemsInObjects = (array: any[]): any => {
  return Array.from(new UniqueNameSet(array));
};

// Subclass for Set, which allows object functionality
class UniqueNameSet extends Set {
  constructor(values: any) {
    super(values);

    const names: any[] = [];
    for (const value of values) {
      if (names.includes(value.name)) {
        this.delete(value);
      } else {
        names.push(value.name);
      }
    }
  }
}

// Takes an ability score and returns its modifie
export const getAbilityScoreMod = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

// Changes old DC format to new DC format
export const convertDCTypeFormat = (dc: any): DC => {
  return { type: dc.dc_type.index, value: dc.dc_value, successType: dc.success_type };
};

// Changes old damage format to new damage format
export const convertDamageTypeFormat = (array: any): Damage => {
  return array.map((arrayItem: any) => {
    return { type: arrayItem.damage_type.index, dice: convertDiceTypeFormat(arrayItem.damage_dice) };
  });
};

// Changes old dice format to new dice format
export const convertDiceTypeFormat = (dice: string): Dice => {
  const amount = dice.split('d');
  const splitString = amount[1].replace('-', ' -').replace('+', ' +').split(' ');
  return { amount: parseInt(amount[0]), type: parseInt(splitString[0]), mod: splitString[1] ? parseInt(splitString[1]) : 0 };
};

// Removes null values from an object
export const removeNullValues = (array: any) => {
  const results: any = [];
  array.forEach((item: any, i: number) => {
    Object.keys(array[i]).forEach((key) => {
      if (!array[i][key] && array[i][key] !== 0) delete array[i][key];
    });
    results.push(array[i]);
  });
  return results;
};

// Changes old armor class format to new armor class format
export const convertACTypeFormat = (array: any): number => {
  let total = 0;
  array.forEach((armor: any) => {
    total += armor.value;
  });
  return total;
};

export const convertAtSpecificLevelTypeFormat = (obj: any): AtSpecificLevel[] => {
  const newObj: AtSpecificLevel[] = [];
  Object.keys(obj).forEach((key) => {
    newObj.push({ level: parseInt([key][0]), dice: convertDiceTypeFormat(obj[key]) });
  });
  return newObj;
};
