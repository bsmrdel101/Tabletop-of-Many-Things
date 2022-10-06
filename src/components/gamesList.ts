import { addGame, getGames } from "../controllers/dashboardController";
import { ready } from "../scripts/utils";
import { Game } from "../scripts/types";
import gameCard from "./gameCard";
import { joinDM } from "../views/dashboardPage";

let gameFormOpen: boolean = false;

// Form that creates new campaign
const toggleGameForm = () => {
    gameFormOpen = !gameFormOpen;
    if (gameFormOpen) {
        document.querySelector('.games-list__content')?.insertAdjacentHTML('beforeend', `
            <form class="form--add-game">
                <input id="game-name-input" placeholder="name" required>
                <button class="button--submit btn--hover">Submit</button>
            </form>
        `);
        bindEventToGamesListForm();
    } else {
        document.querySelector('.form--add-game')?.remove();
    }
};

// Renders the list and all game cards within the list
const renderGamesList = (gamesList: Game[]) => {
    const gameListContent: Element = document.querySelector('.games-list__content')!;
    gameListContent.innerHTML = '';

    // Add all games from game list
    gamesList.forEach((game: Game) => {
        gameListContent.insertAdjacentHTML('beforeend', gameCard({ game: game }));
        bindEventToGameCard(game);
    });

    // Add create campaign button at the end
    gameListContent.insertAdjacentHTML('beforeend', `
        <button class="games-list__button btn--hover">Create Campaign</button>
    `);    
};

// Runs toggleGameForm()
const bindEventToCreateCampaign = () => {
    document.querySelector('.games-list__button')?.addEventListener('click', () => {
        toggleGameForm();
    });
};

// Handles submitting form for new campaign
const bindEventToGamesListForm = () => {
    document.querySelector('.form--add-game')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const gameNameInput: HTMLInputElement = (<HTMLInputElement>document.getElementById('game-name-input'));
        addGame({ name: gameNameInput.value });
    });
};

// Handles click on game card
// Joins game as DM
const bindEventToGameCard = (game: Game) => {        
    document.getElementById(`game-list__item-${game.id}`).addEventListener('click', () => {
        joinDM(game.code);
    });
};

export default function gamesList() {
    ready(async () => {
        const games: Game[] = await getGames();
        renderGamesList(games);
        bindEventToCreateCampaign();
        // prevGame = await getPrevGame();
        // roomCode = prevGame.code;
        // document.getElementById('room-code-input').value = prevGame.code;
        // Get D&D api data
        // getCreatures();
    }, '.games-list__content');

    return `
        <div class="games-list games-list__content"></div>
    `;
}
