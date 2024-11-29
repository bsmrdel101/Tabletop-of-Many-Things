import Button from "../Library/Button";

interface Props {
  game: Game
  joinGame: (roomCode: string) => void
}


export default function GameCard({ game, joinGame }: Props) {
  return (
    <Button variant={['secondary']} className="games-list__item" onClick={() => joinGame(game.code)}>
      {game.name}
    </Button>
  );
}
