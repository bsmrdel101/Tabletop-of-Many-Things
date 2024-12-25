import { useState } from "react";
import Input from "../../Library/Input";
import HealthBar from "./HealthBar";
import Button from "../../Library/Button";
import { addPlayerTempHp, dmgPlayer, dmgPlayerMaxHp, healPlayer } from "../../../scripts/tools/5e/characterUtils";

interface Props {
  character: Character_5e
  setCharacter: (character: Character_5e) => void
}


export default function HealthManagement({ character, setCharacter }: Props) {
  const [value, setValue] = useState(0);


  return (
    <div className="hp-management">
      <HealthBar character={character} setCharacter={setCharacter} />

      <div className="hp-management__input">
        <Input
          variants={['no-arrows']}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          type="number"
        />

        <div className="hp-management__buttons">
          <Button
            style={{ background: 'var(--red-2)' }}
            onClick={() => dmgPlayerMaxHp(character, Number(value))}
          >
            Max Hp Damage
          </Button>
          <Button
            style={{ background: 'var(--blue-0)' }}
            onClick={() => addPlayerTempHp(character, Number(value))}
          >
            Temp Hp
          </Button>
          <Button
            style={{ background: 'var(--red-1)' }}
            onClick={() => dmgPlayer(character, Number(value))}
          >
            Damage
          </Button>
          <Button
            style={{ background: 'var(--green-0)' }}
            onClick={() => healPlayer(character, Number(value))}
          >
            Heal
          </Button>
        </div>
      </div>
    </div>
  );
}
