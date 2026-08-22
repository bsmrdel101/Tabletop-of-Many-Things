import { FormEvent, useState } from "react";
import Button from "../library/Button";
import Input from "../library/Input";
import { getGamesByUser, getGamesHistory } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import NewGameCard from "../games/NewGameCard";
import GameCard from "../games/GameCard";


export default function GamesList() {
  const [, setGameEdited] = useState<Game | null>(null);
  const [showNewGame, setShowNewGame] = useState(false);

  const { data: games = [], refetch: refetchGames } = useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: getGamesByUser
  });

  const { data: gameHistory = [] } = useQuery<Game[]>({
    queryKey: ['gameHistory'],
    queryFn: getGamesHistory
  });

  const handleJoinGame = async (e: FormEvent) => {
    e.preventDefault();
  };


  return (
    <div className="games-list">
      <div>
        <form className="games-list__join-game" onSubmit={handleJoinGame}>
          <Input
            variants={['fit']}
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
        { showNewGame && <NewGameCard setOpen={setShowNewGame} refetchGames={refetchGames} /> }
        {!showNewGame && games.map((game: Game) => {
          return (
            <GameCard
              key={game.id}
              game={game}
              onClickEditGame={(g) => setGameEdited(g)}
              refetchGames={refetchGames}
            />
          );
        })}
      </div>

      {gameHistory.length > 0 &&
        <div className="games-list__column">
          <h3>Game History</h3>
          {gameHistory.map((game: Game) => {
            return (
              <GameCard
                key={game.id}
                game={game}
                onClickEditGame={(g) => setGameEdited(g)}
                refetchGames={refetchGames}
              />
            );
          })}
        </div>
      }
    </div>
  );
}
