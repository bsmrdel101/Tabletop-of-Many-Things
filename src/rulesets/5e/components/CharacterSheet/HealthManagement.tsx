import HealthBar from "@/rulesets/5e/components/CharacterSheet/HealthBar";
import Button from "@/components/Library/Button";
import Input from "@/components/Library/Input";
import { addPlayerTempHp, dmgPlayer, dmgPlayerMaxHp, healPlayer } from "@/rulesets/5e/scripts/playerManager";
import { roomAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";
import { useState } from "react";

interface Props {
  character: Character_5e
}


export default function HealthManagement({ character }: Props) {
  const [room] = useAtom(roomAtom);
  const [value, setValue] = useState('0');


  return (
    <div className="hp-management">
      <HealthBar character={character} />

      <div className="hp-management__input">
        <Input
          variants={['no-arrows']}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          type="number"
          data-testid="hp-management-input"
        />

        <div className="hp-management__buttons">
          <Button
            style={{ background: 'var(--healing)' }}
            onClick={() => healPlayer(character, Number(value), room)}
            data-testid="heal-btn"
          >
            <img src="/images/game/heart.svg" alt="Heal" />
          </Button>

          <Button
            style={{ background: 'var(--dmg)' }}
            onClick={() => dmgPlayer(character, Number(value), room)}
            data-testid="dmg-btn"
          >
            <img src="/images/game/dmg.svg" alt="Damage" />
          </Button>

          <Button
            style={{ background: 'var(--temp-hp)' }}
            onClick={() => addPlayerTempHp(character, Number(value), room)}
            data-testid="temp-hp-btn"
          >
            <img src="/images/game/temp-hp.svg" alt="Temp hp" />
          </Button>

          <Button
            style={{ background: 'var(--severe-dmg)' }}
            onClick={() => dmgPlayerMaxHp(character, Number(value), room)}
            data-testid="max-hp-dmg-btn"
          >
            <img src="/images/game/dmg-max-hp.svg" alt="Damage max hp" />
          </Button>

          <Button
            style={{ background: 'var(--dmg-ability)' }}
            // onClick={() => dmgPlayerAbility(character, Number(value), room)}
            data-testid="dmg-ability-btn"
          >
            <img src="/images/game/dmg-ability.svg" alt="Damage ability" />
          </Button>

          <Button
            style={{ background: 'var(--restore)' }}
            onClick={() => dmgPlayerMaxHp(character, -character.maxHpDmg, room)}
            data-testid="restore-max-hp-btn"
          >
            <img src="/images/game/restore.svg" alt="Restore max hp" />
          </Button>
        </div>
      </div>
    </div>
  );
}
