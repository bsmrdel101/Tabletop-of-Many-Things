import { ask } from "@/scripts/tools/interactions";
import Button from "../library/Button";
import { deleteGame } from "@/services/dashboardService";
import Img from "../library/Img";

interface Props {
  game: Game
  setEditGameId: (pubId: string) => void
  refetchGames: () => void
}


export default function GameCard({ game, setEditGameId, refetchGames }: Props) {
  const onClickDelete = async () => {
    if (!await ask(`Do you want to delete ${game.name}?`)) return;
    await deleteGame(game.pubId);
    refetchGames();
  };


  return (
    <div className="game-card">
      <h3 className="game-card__name">{ game.name }</h3>

      <div className="game-card__bottom-row">
        <div className="game-card__buttons">
          <a href={`/vtt/${game.pubId}`}>
            <Button variants={['small', 'image', 'empty']}>
              <Img src="/images/icons/play.svg" alt="Play button" />
            </Button>
          </a>
          <Button variants={['small', 'image', 'empty']} onClick={() => setEditGameId(game.pubId)}>
            <Img src="/images/icons/pen.svg" alt="Edit button" />
          </Button>
          <Button variants={['small', 'image', 'empty']} onClick={onClickDelete}>
            <Img src="/images/icons/trash.svg" alt="Delete button" />
          </Button>
        </div>

        <p className="game-card__ruleset"><em>{ game.ruleset }</em></p>
      </div>
    </div>
  );
}
