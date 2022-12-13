import React from "react";
import { Game } from "../../scripts/types";
import './GameCard.scss';

interface Props {
  game: Game
  joinGame: (roomCode: string) => void
}

export default function GameCard({ game, joinGame }: Props) {
  return (
    <a className="game-list__item" onClick={() => joinGame(game.code)}>
      {game.name}
    </a>
  );
}
