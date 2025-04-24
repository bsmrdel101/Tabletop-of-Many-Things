import { FormEvent, useState } from "react";
import Input from "../Library/Input";
import Select from "../Library/Select";
import Button from "../Library/Button";
import { addGame, getGameById } from "@/controllers/dashboardController";

interface Props {
  setOpen: (value: boolean) => void
  refreshGames: (game: Game) => void
}


export default function NewGameCard({ setOpen, refreshGames }: Props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [ruleset, setRuleset] = useState('');

  const handleNewGame = async (e: FormEvent) => {
    e.preventDefault();
    const id = await addGame({ name, password, ruleset });
    if (id) {
      const game = await getGameById(id);
      if (game) refreshGames({ ...game, password });
    }
    setOpen(false);
  };


  return (
    <form onSubmit={handleNewGame} className="game-card game-card--new-card">
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
      <Button variants={['small', 'dark']} type="submit">Create</Button>
    </form>
  );
}
