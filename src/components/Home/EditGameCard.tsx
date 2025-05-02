import { FormEvent, useState } from "react";
import Input from "../Library/Input";
import Select from "../Library/Select";
import Button from "../Library/Button";
import { editGame } from "@/services/dashboardService";

interface Props {
  setOpen: (value: boolean) => void
  refreshGames: (game: Game) => void
  game: Game
}


export default function NewGameCard({ setOpen, refreshGames, game }: Props) {
  const [name, setName] = useState(game.name);
  const [password, setPassword] = useState(game.password ?? '');
  const [ruleset, setRuleset] = useState(game.ruleset);

  const handleEditGame = async (e: FormEvent) => {
    e.preventDefault();
    const newGame: Game = { ...game, name, password, ruleset };
    await editGame(newGame);
    refreshGames(newGame);
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
      <Select
        variants={['label-thin']}
        label="Ruleset"
        value={ruleset}
        onChange={(e) => setRuleset(e.target.value)}
      >
        <option value="5e">D&D 5E</option>
        <option value="2024" disabled>D&D 2024</option>
        <option value="sw" disabled>Star Wars (Fantasy Flight)</option>
      </Select>
      <Button variants={['small', 'dark']} type="submit">Save</Button>
    </form>
  );
}
