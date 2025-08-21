import { FormEvent, useState } from "react";
import Input from "../Library/Input";
import Button from "../Library/Button";
import { addGame } from "@/services/dashboardService";
import RulesetSelect5e from "../Library/Select/RulesetSelect5e";
import { getDefaultGameSettings } from "@/scripts/gameSettings";

interface Props {
  setOpen: (value: boolean) => void
  refetch: () => void
}


export default function NewGameCard({ setOpen, refetch }: Props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [ruleset, setRuleset] = useState('');

  const handleNewGame = async (e: FormEvent) => {
    e.preventDefault();
    await addGame({ name, password, ruleset, gameSettings: getDefaultGameSettings(ruleset) });
    refetch();
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
