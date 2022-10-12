import { zoomIn, zoomOut } from '../components/grid';
import { clientType } from '../views/dashboardPage';
import { checkForElement } from './utils';

let canScale = false;
let targetPosX: number, targetPosY: number;
let dragging = false;
const canUseHotkey = true;


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
                // case e.which === 49:
                //     clientType === 'dm' ? toggleTokenMenu('tokens') : toggleCharacterMenu('characters');
                //     break;
                // case e.which === 50:
                //     clientType === 'dm' ? toggleCreaturesWindow() : toggleCharacterSheet();
                //     break;
                // case e.which === 51:
                //     clientType === 'dm' ? toggleMapMenu('maps') : console.log('Nothing here yet');
                //     break;
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
                targetPosX = e.x;
                targetPosY = e.y;
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
                document.querySelector('.game-page').classList.remove('panning');
                break;
            default:
                break;
        }
    });

    // Fires when user moves mouse
    document.addEventListener('mousemove', (e: MouseEvent) => {
        const mousePosX = e.x;
        const mousePosY = e.y;
        if (dragging) {
            document.querySelector('.grid-container').scrollBy((targetPosX - mousePosX) / 40, (targetPosY - mousePosY) / 40);
            document.querySelector('.game-page').classList.add('panning');
        }
    });
};

const handleGridWheelEvents = () => {
    document.addEventListener('wheel', (e: any) => {        
        if (!checkForElement(e.path, '.grid-container')) return;
        if (e.deltaY > 0) {
            zoomOut();
        } else {
            zoomIn();
        }
    });
};
