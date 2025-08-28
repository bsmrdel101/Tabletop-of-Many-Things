import { FormEvent, useState } from "react";
import Button from "../library/Button";
import Input from "../library/Input";
import { getGamesByUser, getGamesHistory } from "@/services/dashboardService";
import GameCard from "./GameCard";
import NewGameCard from "./NewGameCard";
import { useQuery } from "@tanstack/react-query";

interface Props {
  setMenu: (menu: string) => void
}


export default function GamesList({ setMenu }: Props) {
  const [selectedGame, setSelectedGame] = useState<GameMin | null>(null);
  const [showNewGame, setShowNewGame] = useState(false);

  const { data: games = [], refetch } = useQuery<GameMin[]>({
    queryKey: ['games'],
    queryFn: getGamesByUser
  });

  const { data: gameHistory = [] } = useQuery<GameMin[]>({
    queryKey: ['gameHistory'],
    queryFn: getGamesHistory
  });

  const handleJoinGame = async (e: FormEvent) => {
    e.preventDefault();
  };


  return (
    <div className="games-list">
      <div>
        <Button variants={['border']} onClick={() => setMenu('')}>Back</Button>
        <form className="games-list__join-game" onSubmit={handleJoinGame}>
          <Input
            variants={['fit', 'label-large']}
            label="Join Game"
            placeholder="Room code"
            required
          />
          <Button type="submit">Join</Button>
        </form>
      </div>

      <div className="games-list__column">
        <h3>
          Your Campaigns&nbsp;&nbsp;
          <Button variants={['small', 'flat']} onClick={() => setShowNewGame(true)}>+</Button>
        </h3>
        { showNewGame && <NewGameCard setOpen={setShowNewGame} refetch={refetch} /> }
        {!showNewGame && games.map((game: GameMin) => {
          return (
            <GameCard
              key={game.id}
              game={game}
              selected={selectedGame?.id === game.id && !selectedGame?.gameId}
              setSelected={setSelectedGame}
            />
          );
        })}
      </div>

      {gameHistory.length > 0 &&
        <div className="games-list__column">
          <h3>Game History</h3>
          {gameHistory.map((game: GameMin) => {
            return (
              <GameCard
                key={game.id}
                game={game}
                selected={Boolean(selectedGame?.id === game.id && selectedGame?.gameId)}
                setSelected={setSelectedGame}
              />
            );
          })}
        </div>
      }
    </div>
  );
}
