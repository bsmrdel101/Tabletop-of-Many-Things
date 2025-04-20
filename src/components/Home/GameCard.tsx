import Button from "../Library/Button";

interface Props {
  game: GameMin
  selected: boolean
  setSelected: (game: GameMin | null) => void
}


export default function GameCard({ game, selected, setSelected }: Props) {
  return (
    <>
      {!selected ?
        <div className="game-card" onClick={() => setSelected(game)}>
          <h3 className="game-card__name">{ game.name }</h3>
          <p className="game-card__ruleset"><em>{ game.ruleset }</em></p>
        </div>
        :
        <div className="game-card">
          <Button variants={['small']}>Launch</Button>
          <Button variants={['small']}>
            <img src="/images/icons/pen.svg" alt="Edit button" />
          </Button>
          <Button variants={['danger']}>
            <img src="/images/icons/trash.svg" alt="Delete button" />
          </Button>
        </div>
      }
    </>
  );
}
