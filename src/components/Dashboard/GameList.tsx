import { useState, useEffect } from "react";
import { getGames } from "../../scripts/controllers/dashboardController";
import GameCard from "./GameCard";
import NewGameForm from "./NewGameForm";
import Button from "../Library/Button";

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
        <Button variants={['plain']} onClick={() => setGameFormOpen(!gameFormOpen)}>
          { gameFormOpen ? 'Cancel' : 'Create Campaign' }
        </Button>
      </div>
    </>
  );
}
