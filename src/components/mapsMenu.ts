import { addMap, getMaps, maps } from "../controllers/mapsController";
import { setupGrid } from "./grid";
import { Map } from "../scripts/types";
import { closeMenu, menuOpen, setMenuOpenValue, setSelectedMenuValue } from "../scripts/menuManager";
import { io, Socket } from "socket.io-client";
const socket: Socket = io();

let defaultMaps: Map[] = [
    { name: 'Default Map', image: 'https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1429139759127-KFHWAFFFVXJWZNWTITKK/learning-the-grid-method.jpg' },
];


const addDefaultMaps = () => {
    for (let map of defaultMaps) {
        addMap(map);
    }
};

export const toggleMapMenu = () => {
    setMenuOpenValue(!menuOpen);
    if (menuOpen) {
        setSelectedMenuValue('maps');
        // Create menu
        document.querySelector('.game-page').insertAdjacentHTML('beforeend', `
            <div class="menu">
                <button class="menu__btn menu__btn--close">X</button>
                <div class="menu__body"></div>
            </div>
        `);
        document.querySelector('.menu__btn--close').addEventListener('click', () => closeMenu('maps'));
        getMapBodyData();
    } else {
        closeMenu('maps');
    }
};

const getMapBodyData = async () => {
    await getMaps();
    
    // Populate menu body
    maps.forEach((map: Map) => {
        document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
            <div>
                <img src=${map.image} class="menu__item menu__item--map" id=${map.id}>
                <p class="menu__item--name">${map.name}</p>
            </div>
        `);
        document.getElementById(`${map.id}`).addEventListener('dblclick', (e) => selectMap(e.target));
    });
    // Add new map button
    document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
        <div class="menu__item menu__item--map">
            <button class="btn--new-item" id="new-map-btn">New Map</button>
        </div>
    `);
};

const selectMap = (target: any) => {
    maps.forEach((map: Map) => {
        if (map.id === parseInt(target.getAttribute('id'))) {
            socket.emit('SELECT_MAP', { width: target.clientWidth, height: target.clientHeight }, map);
        }
    });
};

socket.on('SELECT_MAP', ((e: any, map: Map) => {
    if (map.name === 'Default Map') {
        // Set image to nothing
        (<HTMLElement>document.querySelector('.grid')).style.setProperty('--map-background', `rgb(237 237 237 / 52%)`);
        setupGrid(25, 25);
    } else {
        // Set new map image
        (<HTMLElement>document.querySelector('.grid')).style.setProperty('--map-background', `url('${map.image}')`);
        setupGrid(e.width / 2, e.height / 2);
    }
}));
