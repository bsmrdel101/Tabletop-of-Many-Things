import React, { useState, useEffect } from "react";
import { getGamesHistory } from "../../controllers/dashboardController";
import { Game } from "../../scripts/types";
import GameCard from "../GameCard/GameCard";
import './GameListHistory.scss';

interface Props {
  joinGame: (roomCode: string) => void
}

export default function GameListHistory({ joinGame }: Props) {
  const [gameHistory, setGameHistory] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setGameHistory(await getGamesHistory());
    };
    fetchData();
  }, []);
  
  return (
    <div className="games-list">
      {gameHistory.map((game) => {
        return <GameCard key={game.id} game={game} joinGame={joinGame} />;
      })}
    </div>
  );
}
