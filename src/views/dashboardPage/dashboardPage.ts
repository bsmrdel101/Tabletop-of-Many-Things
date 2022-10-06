import gamesList from '../../components/gamesList/gamesList';
import { logout } from '../../controllers/userController';
import { Client } from '../../scripts/types';
import { ready } from '../../scripts/utils';
import { io, Socket } from "socket.io-client";
import gamesHistoryList from '../../components/gameHistoryList/gameHistoryList';
import { Game } from '../../scripts/types';
import { addGameToHistory, getGames } from '../../controllers/dashboardController';

const socket: any = io();

export let room: string;
export let client: Client;

export const joinPlayer = (roomCode: string) => {
    room = roomCode;
    socket.emit('JOIN_ROOM', 'player', room, (roomExists: boolean, newClient: Client) => {
        if (roomExists) {
            client = newClient;
            handlePushGameToHistory(roomCode);
            // socket.emit('FETCH_BOARD');
            window.location.pathname = 'game';
        } else {
            console.warn('room doesn\'t exist');
        }
    });
};

export const joinDM = (roomCode: string) => {
    room = roomCode;
    socket.emit('JOIN_ROOM', 'dm', room, (roomExists: boolean, newClient: Client) => {
        if (roomExists) {
            client = newClient;
            window.location.pathname = 'game';
        } else {
            console.warn('game already started');
        }
    });
};

// Adds selected game to history
const handlePushGameToHistory = (roomCode: string) => {
    // addGameToHistory();
};

export default function dashboardPage() {
    let roomCode: string;

    ready(async () => {
        bindEventsToForm();
    });

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
