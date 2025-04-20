import { FormEvent, useEffect, useState } from "react";
import Button from "../Library/Button";
import Input from "../Library/Input";
import { getGamesByUser, getGamesHistory } from "@/controllers/dashboardController";
import GameCard from "./GameCard";

interface Props {
  setMenu: (menu: string) => void
}


export default function GamesList({ setMenu }: Props) {
  const [games, setGames] = useState<GameMin[]>([]);
  const [gameHistory, setGameHistory] = useState<GameMin[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameMin | null>(null);

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


  return (
    <div className="games-list">
      <div>
        <Button variants={['border']} onClick={() => setMenu('')}>Back</Button>
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
        <h3>Your Campaigns</h3>
        {games.map((game: GameMin) => {
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
    </div>
  );
}
