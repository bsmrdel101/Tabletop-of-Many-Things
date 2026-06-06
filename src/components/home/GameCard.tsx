import Button from "../library/Button";

interface Props {
  game: GameMin
}


export default function GameCard({ game }: Props) {
  return (
    <div className="game-card">
      <h3 className="game-card__name">{ game.name }</h3>

      <div className="game-card__bottom-row">
        <div className="game-card__buttons">
          <Button variants={['small', 'image', 'empty']}>
            <img src="/images/icons/play.svg" alt="Play button" />
          </Button>
          <Button variants={['small', 'image', 'empty']}>
            <img src="/images/icons/pen.svg" alt="Edit button" />
          </Button>
          <Button variants={['small', 'image', 'empty']}>
            <img src="/images/icons/trash.svg" alt="Delete button" />
          </Button>
        </div>

        <p className="game-card__ruleset"><em>{ game.ruleset }</em></p>
      </div>
    </div>
  );
}
