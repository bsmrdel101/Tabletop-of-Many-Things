import { useState } from "react";
import Input from "../../Library/Input";
import HealthBar from "./HealthBar";
import Button from "../../Library/Button";
import { addPlayerTempHp, dmgPlayer, dmgPlayerMaxHp, healPlayer } from "../../../scripts/tools/5e/characterUtils";

interface Props {
  character: Character_5e
  room: string
}


export default function HealthManagement({ character, room }: Props) {
  const [value, setValue] = useState(0);


  return (
    <div className="hp-management">
      <HealthBar character={character} room={room} />

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
            onClick={() => dmgPlayerMaxHp(character, Number(value), room)}
          >
            Max Hp Damage
          </Button>
          <Button
            style={{ background: 'var(--blue-0)' }}
            onClick={() => addPlayerTempHp(character, Number(value), room)}
          >
            Temp Hp
          </Button>
          <Button
            style={{ background: 'var(--red-1)' }}
            onClick={() => dmgPlayer(character, Number(value), room)}
          >
            Damage
          </Button>
          <Button
            style={{ background: 'var(--green-0)' }}
            onClick={() => healPlayer(character, Number(value), room)}
          >
            Heal
          </Button>
        </div>
      </div>
    </div>
  );
}
