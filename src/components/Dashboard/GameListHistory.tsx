import { useState, useEffect } from "react";
import { getGamesHistory } from "../../scripts/controllers/dashboardController";
import { Game } from "../../scripts/types";
import GameCard from "./GameCard";


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
      <p className="games-list__title">Game History</p>
      {gameHistory.map((game) => {
        return <GameCard key={game.id} game={game} joinGame={joinGame} />;
      })}
    </div>
  );
}
