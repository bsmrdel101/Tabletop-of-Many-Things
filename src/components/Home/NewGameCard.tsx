import { FormEvent, useState } from "react";
import Input from "../Library/Input";
import Button from "../Library/Button";
import { addGame, getGameById } from "@/services/dashboardService";
import RulesetSelect5e from "../Library/Select/RulesetSelect5e";
import { getDefaultGameSettings } from "@/logic/gameSettings";

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
    const id = await addGame({ name, password, ruleset, gameSettings: getDefaultGameSettings(ruleset) });
    if (id) {
      const game = await getGameById(id);
      if (game) refreshGames({ ...game, password });
    }
    setOpen(false);
  };


  return (
    <form onSubmit={handleNewGame} className="game-card game-card--form-card">
      <Button variants={['X']} onClick={() => setOpen(false)}>X</Button>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <RulesetSelect5e
        value={ruleset}
        onChange={(e) => setRuleset(e.target.value)}
      />

      <Button variants={['small', 'dark']} type="submit">Create</Button>
    </form>
  );
}
