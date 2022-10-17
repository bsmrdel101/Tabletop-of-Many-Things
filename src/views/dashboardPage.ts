import gamesList from '../components/gamesList';
import { logout } from '../controllers/userController';
import { Client, Game } from '../scripts/types';
import { ready } from '../scripts/tools/utils';
import gamesHistoryList from '../components/gameHistoryList';
import gamePage from './gamePage';
import { emitServerEvent } from '../scripts/socket.io';
import { addGameToHistory, getGame, getGamesHistory } from '../controllers/dashboardController';

export let room: string;
export let clientType: string;


// Joins the game as a player
export const joinPlayer = (roomCode: string) => {
    room = roomCode;
    emitServerEvent('JOIN_ROOM', ['player', roomCode, (roomExists: boolean, newClient: Client) => {
        if (roomExists) {
            clientType = newClient.clientType;
            renderGamePage();
            handlePushGameToHistory(roomCode);
        } else {
            console.warn('room doesn\'t exist');
        }
    }]);
};

// Joins the game as the DM
export const joinDM = (roomCode: string) => {
    room = roomCode;
    emitServerEvent('JOIN_ROOM', ['dm', roomCode, (roomExists: boolean, newClient: Client) => {
        if (roomExists) {
            clientType = newClient.clientType;
            renderGamePage();
        } else {
            console.warn('game already started');
        }
    }]);
};

// Switch page from dashboard to the game
const renderGamePage = () => {
    document.querySelector('.dashboard-page').remove();
    const container: Element = document.querySelector('.container');
    container.insertAdjacentHTML('beforeend', gamePage());
};

// Adds selected game to history
const handlePushGameToHistory = async (roomCode: string) => {
    const game = await getGame(roomCode);
    const gamesHistory = await getGamesHistory();
    if (checkGameExists(game, gamesHistory)) return;
    addGameToHistory(game);
};

const checkGameExists = (newGame: Game, gamesHistory: Game[]) => {
    let gameExists = false;
    gamesHistory.forEach((game) => {
        if (game.code === newGame.code) gameExists = true;
    });
    return gameExists;
};

export default function dashboardPage() {
    let roomCode: string;

    ready(() => {
        bindEventsToForm();
    }, '.dashboard-page');

    const bindEventsToForm = () => {
        document.getElementById('join-room-form')?.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            roomCode = (<HTMLInputElement>document.getElementById('room-code-input')).value;
            joinPlayer(roomCode);
        });
        document.getElementById('dashboard-logout-btn')?.addEventListener('click', () => {
            logout();
        });
    };

    return (`
        <div class="dashboard-page">
            <h1 class="page-title">Dashboard</h1>
            <div class="dashboard-container">
                <form id="join-room-form" class="form--join-room">
                    <input id="room-code-input" placeholder="room code" value="" required>
                    <button type="submit">Join Room</button>
                </form>
                ${gamesList()}
                ${gamesHistoryList()}
                <button id="dashboard-logout-btn" class="button btn--hover btn--logout">Log out</button>
            </div>
        </div>
    `);
}
