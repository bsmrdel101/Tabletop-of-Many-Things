import React, { useState, useEffect } from "react";
import { getGames } from "../../controllers/dashboardController";
import { Game } from "../../scripts/types";
import GameCard from "../GameCard/GameCard";
import './GameList.scss';

interface Props {
    joinGame: (roomCode: string) => void
}

export default function GameList({ joinGame }: Props) {
  const [gameFormOpen, setGameFormOpen] = useState(false);
  const [gamesList, setGamesList] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setGamesList(await getGames());
    };
    fetchData();
  }, []);

  // Form that creates new campaign
  const toggleGameForm = () => {
    setGameFormOpen(!gameFormOpen);
    if (gameFormOpen) {
      // Open add game form
    } else {
      // Close add game form
    }
  };

  return (
    <div className="games-list">
      {gamesList.map((game) => {
        return <GameCard key={game.id} game={game} joinGame={joinGame} />;
      })}
      <button className="btn--hover" onClick={toggleGameForm}>
        Create Campaign
      </button>
    </div>
  );
}
