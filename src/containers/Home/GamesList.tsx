import { FormEvent, useEffect, useState } from "react";
import Button from "../../components/Library/Button";
import Input from "../../components/Library/Input";
import { getGamesByUser, getGamesHistory } from "@/services/dashboardService";
import GameCard from "../../components/Home/GameCard";
import NewGameCard from "../../components/Home/NewGameCard";

interface Props {
  setMenu: (menu: string) => void
}


export default function GamesList({ setMenu }: Props) {
  const [games, setGames] = useState<GameMin[]>([]);
  const [gameHistory, setGameHistory] = useState<GameMin[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameMin | null>(null);
  const [showNewGame, setShowNewGame] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const gamesRes = await getGamesByUser();
      setGames(gamesRes);
      const historyRes = await getGamesHistory();
      setGameHistory(historyRes);
    };
    fetchData();
  }, []);

  const handleJoinGame = async (e: FormEvent) => {
    e.preventDefault();
  };

  const refreshGames = (game: Game) => {
    setGames([...games, game]);
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
        { showNewGame && <NewGameCard setOpen={setShowNewGame} refreshGames={refreshGames} /> }
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
