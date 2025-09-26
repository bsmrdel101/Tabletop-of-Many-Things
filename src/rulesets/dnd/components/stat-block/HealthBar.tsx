import { useEffect, useRef } from "react";
import { getHealthColor } from "../../scripts/utils";

interface Props {
  character: Character_Dnd
}


export default function HealthBar({ character }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const barValueRef = useRef<HTMLParagraphElement | null>(null);

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
  }, [character.hp, character.tempHp, character.maxHp, character.maxHpDmg]);


  return (
    <div className="circular-hp-bar" ref={ref}>
      <div className="circular-hp-bar__inner-circle"></div>
      <div className="circular-hp-bar__center">
        <div className="circular-hp-bar__inner-circle--middle">
          {character.tempHp > 0 && (
            <p className="circular-hp-bar__temp-hp" data-testid="temp-hp">{ `+${character.tempHp}` }</p>
          )}
          <p className="circular-hp-bar__hp" ref={barValueRef} data-testid="hp" />
        </div>
      </div>
    </div>
  );
}
