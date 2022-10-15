import { closeMenu, menuOpen, setMenuOpenValue, setSelectedMenuValue } from "../scripts/menuManager";
import { Token } from "../scripts/types";
import { addToken, getTokens, tokens } from "../controllers/tokensController";

const defaultTokens = [
    { image: 'https://i.pinimg.com/236x/88/4a/05/884a056ba7a5a004becacbfd1bfd78fe.jpg', size: 1, creature: 'bandit' },
    { image: 'https://i.imgur.com/5cibmUw.png', size: 2 },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlW_xekRD291YBhLdPKYifDnF2HV74Csz0KQ&usqp=CAU', size: 4, creature: 'tarrasque' },
];


export const addDefaultTokens = () => {
    defaultTokens.forEach((token: Token) => {
        addToken(token);
    });
};

export const toggleTokenMenu = () => {
    setMenuOpenValue(!menuOpen);
    if (menuOpen) {
        setSelectedMenuValue('tokens');
        // Create menu
        document.querySelector('.game-page').insertAdjacentHTML('beforeend', `
            <div class="menu">
                <button class="menu__btn menu__btn--close">X</button>
                <div class="menu__body"></div>
            </div>
        `);
        document.querySelector('.menu__btn--close').addEventListener('click', () => closeMenu('tokens'));
        getTokenBodyData();
    } else {
        closeMenu('tokens');
    }
};

const getTokenBodyData = async () => {
    await getTokens();
    let i = 0;
    tokens.forEach((token: Token) => {
        if (token.creature) {
            document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
                <div class="menu__body--container">
                    <img src=${token.image} class="menu__item menu__item--token" id="token-${i}" relative=${token.creature}>
                    <button class="menu__item--circle-btn" onclick="openCreatureStatsWindow('${token.creature}')"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
                </div>
            `);
        } else {
            document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
                <div class="menu__body--container">
                    <img src=${token.image} class="menu__item menu__item--token" id="token-${i}">
                </div>
            `);
        }
        document.getElementById(`token-${i}`).addEventListener('dragstart', (e) => {
            placeToken(<Element>e.target, token.size);
        });
        i++;
    });
};

export const placeToken = (token: Element, size: number) => {
    token.classList.add('token--dragging');
    token.setAttribute('size', `${size}`);
};

export const resetTokenBodyData = () => {
    const deleteList = [];
    Array.from(document.getElementsByClassName('menu__item')).forEach((token) => {
        deleteList.push(token);
    });
    Array.from(document.getElementsByClassName('menu__item--circle-btn')).forEach((btn) => {
        deleteList.push(btn);
    });
    Array.from(document.getElementsByClassName('menu__body--container')).forEach((box) => {
        deleteList.push(box);
    });
    deleteList.forEach((el) => {
        el.remove();
    });
    getTokenBodyData();
};
