import { useState } from "react";
import Button from "../library/Button";
import { getGamesByUser } from "@/services/dashboardService";
import GameCard from "./GameCard";
import NewGameCard from "./NewGameCard";
import { useQuery } from "@tanstack/react-query";
import EditGameCard from "./EditGameCard";


export default function GamesList() {
  const [showNewGame, setShowNewGame] = useState(false);
  const [editGameId, setEditGameId] = useState<string | null>(null);

  const { data: games = [], refetch } = useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: getGamesByUser
  });

  const onClickShowNewGame = () => {
    setShowNewGame(true);
    setEditGameId(null);
  };


  return (
    <div className="play__column">
      <h3>
        Your Campaigns&nbsp;&nbsp;
        <Button variants={['small', 'flat']} onClick={onClickShowNewGame}>+</Button>
      </h3>

      { showNewGame && <NewGameCard setOpen={setShowNewGame} refetchGames={refetch} /> }
      
      {!showNewGame && games.map((game: Game) => {
        if (game.pubId === editGameId) {
          return <EditGameCard key={game.pubId} setOpen={() => setEditGameId(null)} game={game} refetchGames={refetch} />;
        } else {
          return <GameCard key={game.pubId} game={game} onClickEditGame={(g) => setEditGameId(g.pubId)} refetchGames={refetch} />;
        }
      })}
    </div>
  );
}
