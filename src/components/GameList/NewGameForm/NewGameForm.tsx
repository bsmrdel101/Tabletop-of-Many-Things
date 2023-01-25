import React, { FormEvent, useState } from "react";
import { addGame } from "../../../controllers/dashboardController";
import { userRef } from "../../../views/GamePage/GamePage";
import './NewGameForm.scss';


export default function GameList() {
  const [name, setName] = useState('');
  const [ruleset, setRuleset] = useState('');

  // Add game to game_list
  const handleCreateNewCampaign = (e: FormEvent) => {
    e.preventDefault();
    console.log(userRef);
    
    addGame({
      name: name,
      ruleset: ruleset
    });
    location.reload();
  };

  return (
    <div className="new-game-form">
      <form onSubmit={(e) => handleCreateNewCampaign(e)}>
        <label>
          Campaign Name
          <input
            placeholder="Nelzern"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Ruleset
          <select
            onChange={(e) => setRuleset(e.target.value)}
            value={ruleset}
          >
            <option value="5e">5e</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
