import { toggleCharacterMenu } from "../components/characterMenu";
import { toggleMapMenu } from "../components/mapsMenu";
import { toggleTokenMenu } from "../components/tokensMenu";

export let menuOpen: boolean = false;
export let selectedMenu: string;


export const setMenuOpenValue = (value: boolean) => menuOpen = value;
export const setSelectedMenuValue = (value: string) => selectedMenu = value;

export const closeMenu = (menuName: string) => {
    if (selectedMenu == menuName) {
        // Close menu
        document.querySelector('.menu').remove();
        menuOpen = false;
    } else {
        // Close menu, then open selected one
        document.querySelector('.menu').remove();
        menuOpen = false;

        switch (menuName) {
            case 'tokens':
                toggleTokenMenu();
                break;
            case 'maps':
                toggleMapMenu();
                break;
            case 'characters':
                toggleCharacterMenu();
            default:
                break;
        }
    }
}
