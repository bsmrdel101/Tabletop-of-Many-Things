import { useEffect } from "react";
import { onServerEvent } from "../../../scripts/config/socket-io";
import Button from "../../Library/Button";
import { restorePlayerMaxHp } from "../../../scripts/tools/5e/characterUtils";

interface Props {
  character: Character
  setCharacter: (character: Character) => void
}


export default function HealthBar({ character, setCharacter }: Props) {
  useEffect(() => {
    onServerEvent('UPDATE_PLAYER', (char: Character) => {
      if (character.id === char.id) setCharacter(char);
    });
  }, []);


  return (
    <div className="hp-bar">
      <p>{ character.hp + character.tempHp } / { character.maxHp }</p>
      <Button onClick={() => restorePlayerMaxHp(character)}>Restore</Button>
    </div>
  );
}
