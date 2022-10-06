import { room } from '../views/dashboardPage';

export default function toolbar() {
    return `
        <div class="toolbar">
            <button class="toolbar__btn" onclick="zoomIn()">+</button>
            <button class="toolbar__btn" onclick="zoomOut()">-</button>
            <button class="toolbar__btn" onclick="togglePlayerList()">Show Players</button>
            <p class="toolbar__text">Room: ${room}</p>
            <a class="toolbar__leave-btn" onclick="leaveRoom()">Leave Game</a>
        </div>
    `;
}
