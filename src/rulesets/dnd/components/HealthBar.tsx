import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../../../components/library/Button";
import { emitServerEvent } from "../../../scripts/config/socket-io";
import Input from "../../../components/library/Input";
import { useAtom } from "jotai";
import { roomAtom } from "@/scripts/atoms/state";
import { getHealthColor } from "@/scripts/tools/utils";
import { editCharacter } from "@/rulesets/dnd/services/charactersService";

interface Props {
  character: Character_Dnd
}


export default function HealthBar({ character }: Props) {
  const [room] = useAtom<string>(roomAtom);
  const ref = useRef<HTMLDivElement>(null);
  const barValueRef = useRef<HTMLParagraphElement>(null);
  const [hp, setHp] = useState<number>(character.hp);
  const [tempHp, setTempHp] = useState<number>(character.tempHp);
  const [maxHp, setMaxHp] = useState<number>(character.maxHp);
  const [editHp, setEditHp] = useState(false);
  const [maxHpMod, setMaxHpMod] = useState<number>(character.maxHpMod);
  const [maxHpOverride, setMaxHpOverride] = useState<number>(character.maxHpOverride);
  const animationFrame = useRef<number | null>(null);
  const isBelowMaxHp = (character.maxHp - character.maxHpDmg <= 0) && character.maxHpOverride === 0;
  const tempHpColor = 'var(--temp-hp)';
  const easing = 0.1;

  let targetHp = hp;
  let targetTempHp = tempHp;
  let targetMaxHp = maxHp;
  let currentHp = hp;
  let currentTempHp = tempHp;
  let currentMaxHp = maxHp;

  useEffect(() => {
    targetHp = character.hp;
    targetTempHp = character.tempHp;
    targetMaxHp = character.maxHp;
    animateHpBar();

    return () => cancelAnimationFrame(animationFrame.current!);
  }, [character]);

  const animateHpBar = () => {
    currentHp += (targetHp - currentHp) * easing;
    currentTempHp += (targetTempHp - currentTempHp) * easing;
    currentMaxHp += (targetMaxHp - currentMaxHp) * easing;

    if (Math.abs(targetHp - currentHp) < 0.1 && Math.abs(targetTempHp - currentTempHp) < 0.1 && Math.abs(targetMaxHp - currentMaxHp) < 0.1) {
      currentHp = targetHp;
      currentTempHp = targetTempHp;
      currentMaxHp = targetMaxHp;
    }

    const total = currentTempHp > 0 ? currentMaxHp + currentTempHp : currentMaxHp;
    const hpAngle = (currentHp / total) * 360;
    const tempHpAngle = currentTempHp > 0 ? (currentTempHp / total) * 360 : 0;

    setHp(Math.round(currentHp));
    setTempHp(Math.round(currentTempHp));
    setMaxHp(Math.round(currentMaxHp));

    if (ref.current) {
      ref.current.style.background = currentTempHp > 0
        ? `conic-gradient(
            ${getHealthColor(currentHp, currentMaxHp)} 0deg,
            ${getHealthColor(currentHp, currentMaxHp)} ${hpAngle}deg,
            ${tempHpColor} ${hpAngle}deg,
            ${tempHpColor} ${hpAngle + tempHpAngle}deg,
            black ${hpAngle + tempHpAngle}deg
          )`
        : `conic-gradient(
            ${getHealthColor(currentHp, currentMaxHp)} 0deg,
            ${getHealthColor(currentHp, currentMaxHp)} ${hpAngle}deg,
            black ${hpAngle}deg
          )`;
    }

    if (targetHp !== currentHp || targetTempHp !== currentTempHp || targetMaxHp !== currentMaxHp) {
      animationFrame.current = requestAnimationFrame(animateHpBar);
    }
  };

  const handleEditHpValues = async (e: FormEvent) => {
    e.preventDefault();
    setEditHp(false);
    const newMaxHp = Number(maxHpOverride) > 0 ? Number(maxHpOverride) : character.maxHp + Number(maxHpMod);
    const newHp = hp > newMaxHp ? newMaxHp : hp;
    emitServerEvent('UPDATE_PLAYER', [{ ...character, maxHpMod: Number(maxHpMod), maxHpOverride: Number(maxHpOverride), maxHp: newMaxHp, hp: newHp }, room]);
    await editCharacter({ ...character, maxHpMod: Number(maxHpMod), maxHpOverride: Number(maxHpOverride), maxHp: newMaxHp, hp: newHp });
  };


  return (
    <div className="circular-hp-bar" ref={ref}>
      <div className="circular-hp-bar__inner-circle"></div>
      <div className="circular-hp-bar__center" onClick={() => !editHp && setEditHp(true)}>
        {editHp ?
          <form className="circular-hp-bar__hp" onSubmit={handleEditHpValues}>
            <Input
              label="Max HP Mod"
              value={maxHpMod}
              onChange={(e: any) => setMaxHpMod(e.target.value)}
              type="number"
            />
            <Input
              label="Override Max HP"
              value={maxHpOverride}
              onChange={(e: any) => setMaxHpOverride(e.target.value)}
              type="number"
            />
            <div className="form__footer">
              <Button variants={['danger', 'bold']} type="button" onClick={() => setEditHp(false)}>Cancel</Button>
              <Button variants={['save', 'bold']} type="submit">Save</Button>
            </div>
          </form>
          :
          <div className="circular-hp-bar__inner-circle--middle">
            { tempHp > 0 && <p className="circular-hp-bar__temp-hp" data-testid="temp-hp">{ tempHp && `+${tempHp}` }</p> }
            <p className="circular-hp-bar__hp" ref={barValueRef} data-testid="hp">
              <span>{ hp } </span>
              /
              <span style={isBelowMaxHp ? { color: 'var(--red-4)' } : {}}> { maxHp }</span>
            </p>
          </div>
        }
      </div>
    </div>
  );
}
