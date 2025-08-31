import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../../../components/library/Button";
import { emitServerEvent } from "../../../scripts/config/socket-io";
import Input from "../../../components/library/Input";
import { useAtom } from "jotai";
import { roomAtom } from "@/scripts/atoms/state";
import { editCharacter } from "@/rulesets/dnd/services/charactersService";
import { getHealthColor } from "../scripts/utils";

interface Props {
  character: Character_Dnd
}


export default function HealthBar({ character }: Props) {
  const [room] = useAtom<string>(roomAtom);
  const ref = useRef<HTMLDivElement | null>(null);
  const barValueRef = useRef<HTMLParagraphElement | null>(null);
  const [editHp, setEditHp] = useState(false);
  const [maxHpMod, setMaxHpMod] = useState<number>(character.maxHpMod);
  const [maxHpOverride, setMaxHpOverride] = useState<number>(character.maxHpOverride);

  const animationFrame = useRef<number | null>(null);
  const tempHpColor = 'var(--temp-hp)';
  const easing = 0.1;
  const currentHp = useRef(character.hp);
  const currentTempHp = useRef(character.tempHp);
  const currentMaxHp = useRef(character.maxHp - character.maxHpDmg);
  const targetHp = useRef(character.hp);
  const targetTempHp = useRef(character.tempHp);
  const targetMaxHp = useRef(character.maxHp - character.maxHpDmg);
  const isBelowMaxHp = character.maxHp - character.maxHpDmg <= 0 && character.maxHpOverride === 0;

  useEffect(() => {
    targetHp.current = character.hp;
    targetTempHp.current = character.tempHp;
    targetMaxHp.current = character.maxHp - character.maxHpDmg;

    const animate = () => {
      // ease towards targets
      currentHp.current += (targetHp.current - currentHp.current) * easing;
      currentTempHp.current += (targetTempHp.current - currentTempHp.current) * easing;
      currentMaxHp.current += (targetMaxHp.current - currentMaxHp.current) * easing;

      // snap if close enough
      if (
        Math.abs(targetHp.current - currentHp.current) < 0.1 &&
        Math.abs(targetTempHp.current - currentTempHp.current) < 0.1 &&
        Math.abs(targetMaxHp.current - currentMaxHp.current) < 0.1
      ) {
        currentHp.current = targetHp.current;
        currentTempHp.current = targetTempHp.current;
        currentMaxHp.current = targetMaxHp.current;
      }

      const total = currentTempHp.current > 0 ? currentMaxHp.current + currentTempHp.current : currentMaxHp.current;
      const hpAngle = (currentHp.current / total) * 360;
      const tempHpAngle = currentTempHp.current > 0 ? (currentTempHp.current / total) * 360 : 0;

      if (ref.current) {
        ref.current.style.background = currentTempHp.current > 0 ?
          `conic-gradient(
            ${getHealthColor(currentHp.current, currentMaxHp.current)} 0deg,
            ${getHealthColor(currentHp.current, currentMaxHp.current)} ${hpAngle}deg,
            ${tempHpColor} ${hpAngle}deg,
            ${tempHpColor} ${hpAngle + tempHpAngle}deg,
            black ${hpAngle + tempHpAngle}deg
          )`
          : `conic-gradient(
            ${getHealthColor(currentHp.current, currentMaxHp.current)} 0deg,
            ${getHealthColor(currentHp.current, currentMaxHp.current)}
            ${hpAngle}deg, black ${hpAngle}deg
          )`;
      }

      if (barValueRef.current) {
        barValueRef.current.innerHTML = (`
          <span>${Math.round(currentHp.current)}</span>
          /
          <span style="${isBelowMaxHp ? "color: var(--red-4);" : ""}">
            ${Math.round(currentMaxHp.current)}
          </span>
        `);
      }

      if (
        currentHp.current !== targetHp.current ||
        currentTempHp.current !== targetTempHp.current ||
        currentMaxHp.current !== targetMaxHp.current
      ) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [character.hp, character.tempHp, character.maxHp, character.maxHpDmg, editHp]);

  const handleEditHpValues = async (e: FormEvent) => {
    e.preventDefault();
    setEditHp(false);
    const newMaxHp = Number(maxHpOverride) > 0 ? Number(maxHpOverride) : character.maxHp + Number(maxHpMod);
    const newHp = currentHp.current > newMaxHp ? newMaxHp : currentHp.current;
    const newCharacter = {
      ...character,
      maxHpMod: Number(maxHpMod),
      maxHpOverride: Number(maxHpOverride),
      maxHp: newMaxHp,
      hp: newHp
    };
    emitServerEvent("UPDATE_PLAYER", [newCharacter, room]);
    await editCharacter(newCharacter);
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
            {character.tempHp > 0 && (
              <p className="circular-hp-bar__temp-hp" data-testid="temp-hp">{ `+${character.tempHp}` }</p>
            )}
            <p className="circular-hp-bar__hp" ref={barValueRef} data-testid="hp" />
          </div>
        }
      </div>
    </div>
  );
}
