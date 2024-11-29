import { FormEvent, useState } from "react";
import { addGame } from "../../scripts/controllers/dashboardController";
import Input from "../Library/Input";
import Select from "../Library/Select";
import Button from "../Library/Button";


export default function GameList() {
  const [name, setName] = useState('');
  const [ruleset, setRuleset] = useState('');

  const handleNewCampaign = async (e: FormEvent) => {
    e.preventDefault();
    await addGame({ name, ruleset });
    location.reload();
  };


  return (
    <div className="new-game-form">
      <form onSubmit={handleNewCampaign}>
        <Input
          label="Campaign Name"
          placeholder="Nelzern"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <Select
          label="Ruleset"
          variant={['label-stack', 'fit']}
          onChange={(e: any) => setRuleset(e.target.value)}
          value={ruleset}
        >
          <option value="5e">5e</option>
        </Select>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
