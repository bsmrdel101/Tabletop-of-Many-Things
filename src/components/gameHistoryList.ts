import { ready } from "../scripts/utils";
import { Game } from "../scripts/types";
import { getGamesHistory } from "../controllers/dashboardController";
import gameCard from "./gameCard";
import { joinPlayer } from "../views/dashboardPage";

export default function gamesHistoryList() {
    ready(async () => {
        const gamesHistory: Game[] = await getGamesHistory();
        renderGamesHistoryList(gamesHistory);
    }, '.games-history-list__content');

    const renderGamesHistoryList = (gamesHistory: Game[]) => {
        const gameListContent: Element = document.querySelector('.games-history-list__content');
        gameListContent.innerHTML = '';
    
        // Add all games from game history
        gamesHistory.forEach((game: Game) => {
            // TODO: Fix non-unique element id
            gameListContent.insertAdjacentHTML('beforeend', gameCard({ game: game }));
            bindEventToGameCard(game);
        });
    };

    // Handles click on game card
    // Joins game as player
    const bindEventToGameCard = (game: Game) => {
        document.getElementById(`game-list__item-${game.id}`).addEventListener('click', () => {
            joinPlayer(game.code);
        });
    };

    return `
        <div class="games-list games-history-list__content"></div>
    `;
}