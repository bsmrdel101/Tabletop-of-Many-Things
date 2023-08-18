import { useState, useEffect } from "react";
import { getGames } from "../../scripts/controllers/dashboardController";
import { Game } from "../../scripts/types";
import GameCard from "./GameCard";
import NewGameForm from "./NewGameForm";


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
  };
  

  return (
    <>
      <div className="games-list">
        <p className="games-list__title">Game List</p>
        {gamesList.map((game) => {
          return <GameCard key={game.id} game={game} joinGame={joinGame} />;
        })}
        {gameFormOpen &&
          <NewGameForm />
        }
        <button className="btn--hover" onClick={toggleGameForm}>
          { gameFormOpen ? 'Cancel' : 'Create Campaign' }
        </button>
      </div>
    </>
  );
}
