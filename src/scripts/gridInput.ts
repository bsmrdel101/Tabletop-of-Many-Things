import { toggleCharacterMenu } from '../components/characterMenu';
import { toggleCharacterSheet } from '../components/characterSheet/characterSheet';
import { toggleCreaturesModal } from '../components/creaturesModal/creaturesModal';
import { toggleMapMenu } from '../components/mapsMenu';
import { toggleTokenMenu } from '../components/tokensMenu';
import { clientType } from '../views/dashboardPage';
import { zoomIn, zoomOut } from './gridEvents';
import { canUseHotkey, checkForElement } from './tools/utils';
import { Coord } from './types';

let canScale = false;
let targetPosX: number, targetPosY: number;
let movedPosX: number, movedPosY: number;
let mouseStartX: number, mouseStartY: number;
let dragging = false;
let position: Coord;


export const bindEventsToGrid = () => {
    handleGridKeyEvents();
    handleGridMouseEvents();
    handleGridWheelEvents();
};

const handleGridKeyEvents = () => {
    // Fires when user presses key
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (canUseHotkey) {
            switch (true) {
                case e.key === 'Meta' || e.key === 'Control':
                    canScale = true;
                    break;
                case e.key === 'Delete':
                    for (const _token of Array.from(document.getElementsByClassName('token'))) {
                        if (_token.classList.contains('token--selected')) _token.remove();
                    }
                    break;
                case e.key === '1':
                    clientType === 'dm' ? toggleMapMenu() : toggleCharacterMenu();
                    break;
                case e.key === '2':
                    clientType === 'dm' ? toggleTokenMenu() : toggleCharacterSheet();
                    break;
                case e.key === '3':
                    clientType === 'dm' ? toggleCreaturesModal() : console.warn('Menu doesn\'t exist');
                    break;
                default:
                    break;
            }
        }
    });

    // Fires when user releases key
    document.addEventListener('keyup', (e: KeyboardEvent) => {
        switch (true) {
            case e.key === 'Meta' || e.key === 'ControlLeft':
                canScale = false;
                break;
            default:
                break;
        }
    });
};

const handleGridMouseEvents = () => {
    // Fires when user presses mouse button
    document.addEventListener('mousedown', (e: MouseEvent) => {
        switch (true) {
            case e.which === 2:
                mouseStartX = e.x;
                mouseStartY = e.y;
                targetPosX = movedPosX ? movedPosX : 0;
                targetPosY = movedPosY ? movedPosY : 0;
                dragging = true;
                break;
            default:
                break;
        }
    });

    // Fires when user releases mouse button
    document.addEventListener('mouseup', (e: MouseEvent) => {
        dragging = false;
        switch (true) {
            case e.which === 2:
                const grid: any = document.querySelector('.grid'); 
                const { transformX, transformY } = getTransformValues(grid);
                movedPosX = transformX;
                movedPosY = transformY;
                document.querySelector('.game-page').classList.remove('panning');
                break;
            default:
                break;
        }
    });

    // Fires when user moves mouse
    document.addEventListener('mousemove', (e: MouseEvent) => {
        const mousePosX = -(mouseStartX - e.x);
        const mousePosY = -(mouseStartY - e.y);
        targetPosX = movedPosX ? movedPosX : 0;
        targetPosY = movedPosY ? movedPosY : 0;
        
        if (dragging) {
            const grid: any = document.querySelector('.grid');            
            position = { x: (mousePosX + targetPosX), y: (mousePosY + targetPosY) };
            grid.style.transform = `translate(${position.x}px, ${position.y}px)`;
            document.querySelector('.game-page').classList.add('panning');
        }
    });
};

const getTransformValues = (grid: any) => {
    let style = window.getComputedStyle(grid);
    let matrix = new DOMMatrixReadOnly(style.transform);
    return { transformX: matrix.m41, transformY: matrix.m42 };
};

const handleGridWheelEvents = () => {
    document.addEventListener('wheel', (e: any) => {        
        if (!checkForElement(e.path, '.grid-container')) return;
        if (e.deltaY > 0 && !canScale) {
            zoomOut();
        } else {
            zoomIn();
        }
    });
};
