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
export const makeDraggable = (el: HTMLElement | null, selector?: string) => {
  if (!el) {
    console.error("Element not found");
    return;
  }

  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  el.onmousedown = dragMouseDown;

  function dragMouseDown(e: any) {
    if (e.which !== 1) return;
    e = e || window.event;

    // Check if a selector is provided and if the clicked element or its parent matches it
    if (
      selector &&
      !e.target.matches(selector) &&
      !e.target.closest(selector)
    ) {
      return;
    }

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();

    // Calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Calculate the new element position:
    const newLeft = el.offsetLeft - pos1;
    const newTop = el.offsetTop - pos2;

    // Get the boundaries of the window:
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Limit the element's position to stay within the window boundaries:
    const limitedLeft = Math.max(0, Math.min(windowWidth - el.offsetWidth, newLeft));
    const limitedTop = Math.max(0, Math.min(windowHeight - el.offsetHeight, newTop));

    // Set the element's new position:
    el.style.left = limitedLeft + "px";
    el.style.top = limitedTop + "px";
  }

  function closeDragElement() {
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
export const convertDamageTypeFormat = (array: any): Damage_5e => {
  const damageOptions: any = [];
  const updatedDamages = array.map((arrayItem: any) => {
    if (arrayItem.damage_type) {
      return { type: arrayItem.damage_type.index, dice: convertDiceTypeFormat(arrayItem.damage_dice) };
    } else {
      damageOptions.push(arrayItem);
    }
  }).filter((arrayItem: any) => arrayItem);
  if (damageOptions.length > 0) damageOptions.forEach((arrayItem: any) => {
    updatedDamages.push({ type: arrayItem.from.options[0].damage_type.index, dice: convertDiceTypeFormat(arrayItem.from.options[0].damage_dice) });
  });
  return updatedDamages;
};

// Changes old dice format to new dice format
export const convertDiceTypeFormat = (dice: string): Dice => {
  const amount = dice.split('d');
  const splitString = amount[1] ? amount[1].replace('-', ' -').replace('+', ' +').split(' ') : '';
  return { amount: parseInt(amount[0]), type: parseInt(splitString[0]), mod: splitString[1] ? parseInt(splitString[1]) : 0, display: dice };
};

// Removes null values from an array object
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

export const removeNullObjProps = (obj: any) => Object.entries(obj).reduce((a: any, [k, v]) => (v == null ? a : (a[k] = v, a)), {});

// Changes old armor class format to new armor class format
export const convertACTypeFormat = (array: any): number => {
  let total = 0;
  array.forEach((armor: any) => {
    total += armor.value;
  });
  return total;
};

export const convertAtSpecificLevelTypeFormat = (obj: any): AtSpecificLevel_5e[] => {
  const newObj: AtSpecificLevel_5e[] = [];
  Object.keys(obj).forEach((key) => {
    newObj.push({ level: parseInt([key][0]), dice: convertDiceTypeFormat(obj[key]) });
  });
  return newObj;
};

export const generateClasses = (className: string, variantsList: string[], elmt: string): string => {
  const variantss = variantsList ? variantsList.map((i) => `${elmt}--${i}`).join(' ') : '';
  return [className, variantss && variantss, elmt].filter(Boolean).join(' ');
};

export const parseClasses = (classes: string): object => {
  return classes ? { className: classes } : {};
};
