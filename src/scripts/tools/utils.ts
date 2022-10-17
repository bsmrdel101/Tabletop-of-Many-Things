export let canUseHotkey = true;

export const ready = (fn: any, selector: string) => {
    const target = document.querySelector('body');
    // Create a new observer instance:
    const observer = new MutationObserver(function() {
        if (document.querySelector(selector)) {
            fn();
            observer.disconnect();
        }
    });

    // Set configuration object:
    const config = { childList: true };
    
    // Start the observer
    observer.observe(target, config);

    // Create the mutation we are listening out for
    setTimeout(() => { 
        const div = document.createElement('div');
        div.id = 'new-div';
        document.body.append(div); 
    }, 0.1);
};

// Clamp number between two values
export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

// Will find and return a cell with the parameters given
export const findCell = (x: number, y: number) => {
    for (const cell of Array.from(document.querySelectorAll('.grid__cell'))) {
        if (cell.getAttribute('x') === x.toString() && cell.getAttribute('y') === y.toString()) {
            return <HTMLElement>cell;
        }
    }
}

export const findRelativeCell = (elmt: any, offsetX: number, offsetY: number) => {
    const cellWidth = elmt.clientWidth;
    const cellHeight = elmt.clientHeight;
    const numXCells = Math.ceil(offsetX / cellWidth) - 1;
    const numYCells = Math.ceil(offsetY / cellHeight) - 1;
    return findCell(elmt.getAttribute('x') - numXCells, elmt.getAttribute('y') - numYCells);
};

// Returns true if it finds the element in an array
export const checkForElement =(arr: any[], selector: string) => {
    const el = document.querySelector(selector);
    if (arr.includes(el)) {
        return true;
    } else {
        return false;
    }
};

export const makeDraggable = (el: HTMLElement, selector: string) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.querySelector(selector)) {
      // if present, the header is where you move the DIV from:
      (<HTMLElement>document.querySelector(selector)).onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      el.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e: any) {
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

export const disableHotkeys = () => {
    // Detects when input is focused and disabled hotkeys
    for (let input of Array.from(document.querySelectorAll('input'))) {
        input.addEventListener('focusin', () => { canUseHotkey = false; });
        input.addEventListener('focusout', () => { canUseHotkey = true; });
    }
};
