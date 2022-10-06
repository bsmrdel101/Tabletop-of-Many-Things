import { Game } from "../../scripts/types";

interface Props {
    game: Game
};

export default function gameCard({ game }: Props) {
    return `
        <div class="game-list__item" id="game-list__item-${game.id}">
            <p>${game.name}</p>
        </div>
    `;
}
