import HealthBar from "./HealthBar";
import Button from "@/components/library/Button";
import Img from "@/components/library/Img";
import Input from "@/components/library/Input";
import { playerManager } from "@/rulesets/dnd/scripts/playerManager";
import { roomAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";
import { useState } from "react";

interface Props {
  character: Character_Dnd
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
            onClick={() => playerManager.heal(character, Number(value), room)}
            data-testid="heal-btn"
          >
            <Img src="/images/game/heart.svg" alt="Heal" draggable={false} />
          </Button>

          <Button
            style={{ background: 'var(--dmg)' }}
            onClick={() => playerManager.dmg(character, Number(value), room)}
            data-testid="dmg-btn"
          >
            <Img src="/images/game/dmg.svg" alt="Damage" draggable={false} />
          </Button>

          <Button
            style={{ background: 'var(--temp-hp)' }}
            onClick={() => playerManager.setTempHp(character, Number(value), room)}
            data-testid="temp-hp-btn"
          >
            <Img src="/images/game/temp-hp.svg" alt="Temp hp" draggable={false} />
          </Button>

          <Button
            style={{ background: 'var(--severe-dmg)' }}
            onClick={() => playerManager.dmgMaxHp(character, Number(value), room)}
            data-testid="max-hp-dmg-btn"
          >
            <Img src="/images/game/dmg-max-hp.svg" alt="Damage max hp" draggable={false} />
          </Button>

          <Button
            style={{ background: 'var(--dmg-ability)' }}
            // onClick={() => playerManager.dmgAbility(character, Number(value), room)}
            data-testid="dmg-ability-btn"
          >
            <Img src="/images/game/dmg-ability.svg" alt="Damage ability" draggable={false} />
          </Button>

          <Button
            style={{ background: 'var(--restore)' }}
            onClick={() => playerManager.restoreMaxHp(character, room)}
            data-testid="restore-max-hp-btn"
          >
            <Img src="/images/game/restore.svg" alt="Restore max hp" draggable={false} />
          </Button>
        </div>
      </div>
    </div>
  );
}
