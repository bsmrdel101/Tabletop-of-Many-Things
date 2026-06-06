import { FormEvent, useState } from "react";
import Input from "../library/Input";
import Button from "../library/Button";
import { editGame } from "@/services/dashboardService";

interface Props {
  setOpen: (value: boolean) => void
  refetchGames: () => void
  game: Game
}


export default function EditGameCard({ setOpen, refetchGames, game }: Props) {
  const [name, setName] = useState(game.name);
  const [password, setPassword] = useState(game.password ?? '');

  const handleEditGame = async (e: FormEvent) => {
    e.preventDefault();
    const newGame: Game = { ...game, name, password };
    await editGame(newGame);
    refetchGames();
    setOpen(false);
  };


  return (
    <form onSubmit={handleEditGame} className="game-card game-card--form-card">
      <Button variants={['X']} onClick={() => setOpen(false)}>X</Button>

      <Input
        variants={['label-thin']}
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        variants={['label-thin']}
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variants={['small', 'dark']} type="submit">Save</Button>
    </form>
  );
}
