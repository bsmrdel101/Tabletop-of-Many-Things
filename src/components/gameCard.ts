import { Game } from "../scripts/types";

interface Props {
    game: Game
}

export default function gameCard({ game }: Props) {
    return `
        <a class="game-list__item" data-game-code="${game.code}" id="game-list__item-${game.id}">
            ${game.name}
        </a>
    `;
}
