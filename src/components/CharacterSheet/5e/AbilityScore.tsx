import { useState } from "react";
import Input from "../../Library/Input";
import { emitServerEvent } from "../../../scripts/config/socket-io";
import { editCharacter } from "../../../scripts/controllers/5e/charactersController";

interface Props {
  character: Character_5e
  ability: AbilityScore_5e
  editing: boolean
  room: string
  index: number
}


export default function AbilityScore({ character, ability, editing, room, index }: Props) {
  const [score, setScore] = useState(ability.value);
  const [mod, setMod] = useState(ability.mod);

  const handleToggleProf = async () => {
    const abilityScores = character.abilityScores.map((a, i) => {
      if (i === index) return { ...a, prof: !ability.prof };
      return a;
    });
    emitServerEvent('UPDATE_PLAYER', [{ ...character, abilityScores }, room]);
    await editCharacter({ ...character, abilityScores });
  };

  const handleEditAbility = async () => {
    const abilityScores = character.abilityScores.map((a, i) => {
      if (i === index) return { ...a, value: Number(score), mod: Number(mod) };
      return a;
    });
    console.log(abilityScores);
    emitServerEvent('UPDATE_PLAYER', [{ ...character, abilityScores }, room]);
    await editCharacter({ ...character, abilityScores });
  };


  return (
    <>
      {editing?
        <div className="ability-score">
          <div className="ability-score__title">
            <img
              style={{ cursor: 'pointer' }}
              src={`/images/icons/star${!ability.prof ? '-empty' : ''}.svg`}
              alt="proficient"
              draggable={false}
              onClick={handleToggleProf}
            />
            <p>{ ability.name.toUpperCase() }</p>
          </div>
          <Input
            value={score}
            onChange={(e: any) => setScore(e.target.value)}
            onBlur={(e: any) => handleEditAbility()}
            type="number"
          />
          <Input
            value={mod}
            onChange={(e: any) => setMod(e.target.value)}
            onBlur={(e: any) => handleEditAbility()}
            type="number"
          />
        </div>
        :            
        <div className="ability-score">
          <div className="ability-score__title">
            {ability.prof && <img src="/images/icons/star.svg" alt="proficient" draggable={false} /> }
            <p>{ ability.name.toUpperCase() }</p>
          </div>
          <p className="ability-score__value">{ ability.value }</p>
          <p className="ability-score__mod">{ ability.mod >= 0 ? '+' : '' }{ ability.mod }</p>
        </div>
      }
    </>
  );
}
