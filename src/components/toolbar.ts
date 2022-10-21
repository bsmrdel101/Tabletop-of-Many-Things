import { emitServerEvent, socket } from '../scripts/socket-io';
import { ready } from '../scripts/tools/utils';
import { room } from '../views/dashboardPage';

const leaveRoom = () => {
    emitServerEvent('USER_DISCONNECT', [room, socket.id]);
    socket.disconnect();
    location.reload();
};

const bindEventsToToolbar = () => {
    document.getElementById('leave-game-btn').addEventListener('click', () => {
        leaveRoom();
    });
};

export default function toolbar() {
    ready(() => {
        bindEventsToToolbar();
    }, '.toolbar');

    return `
        <div class="toolbar">
            <button class="toolbar__btn" onclick="zoomIn()">+</button>
            <button class="toolbar__btn" onclick="zoomOut()">-</button>
            <button class="toolbar__btn" onclick="togglePlayerList()">Show Players</button>
            <p class="toolbar__text">Room: ${room}</p>
            <a class="toolbar__leave-btn" id="leave-game-btn">Leave Game</a>
        </div>
    `;
}
