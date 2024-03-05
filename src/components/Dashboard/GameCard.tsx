import React from "react";

interface Props {
  game: Game
  joinGame: (roomCode: string) => void
}


export default function GameCard({ game, joinGame }: Props) {
  return (
    <button className="game-list__item" onClick={() => joinGame(game.code)}>
      {game.name}
    </button>
  );
}
