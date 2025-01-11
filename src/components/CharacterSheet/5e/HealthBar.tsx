import { useEffect, useRef, useState } from "react";
import Button from "../../Library/Button";
import { getHealthColor, restorePlayerMaxHp } from "../../../scripts/tools/5e/characterUtils";
import { onServerEvent } from "../../../scripts/config/socket-io";

interface Props {
  character: Character_5e
  room: string
}

export default function HealthBar({ character, room }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const barValueRef = useRef<HTMLParagraphElement>(null);
  const [hp, setHp] = useState<number>(character.hp);
  const [tempHp, setTempHp] = useState<number>(character.tempHp);
  const [maxHp, setMaxHp] = useState<number>(character.maxHp);
  const tempHpColor = '#2e4cb6';
  const easing = 0.1;

  let targetHp = hp;
  let targetTempHp = tempHp;
  let targetMaxHp = maxHp;
  let currentHp = hp;
  let currentTempHp = tempHp;
  let currentMaxHp = maxHp;

  useEffect(() => {
    const handleUpdate = (char: Character_5e) => {
      targetHp = char.hp;
      targetTempHp = char.tempHp;
      targetMaxHp = char.maxHp;
      animateHpBar();
    };

    onServerEvent('UPDATE_PLAYER', handleUpdate);
    handleUpdate(character);

    return () => cancelAnimationFrame(animationFrameRef.current!);
  }, []);

  const animationFrameRef = useRef<number | null>(null);

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
      animationFrameRef.current = requestAnimationFrame(animateHpBar);
    }
  };


  return (
    <div className="circular-hp-bar" ref={ref}>
      <div className="circular-hp-bar__inner-circle"></div>
      <div className="circular-hp-bar__center">
        <p className="circular-hp-bar__hp" ref={barValueRef}>
          <span style={character.tempHp ? { color: 'var(--blue-2)' } : {}}>{ hp + tempHp } </span>
          /
          <span style={character.maxHp < character.prevMaxHp ? { color: 'var(--red-4)' } : {}}> { maxHp }</span>
        </p>
        {character.maxHp < character.prevMaxHp &&
          <Button
            variants={['plain']}
            onClick={() => restorePlayerMaxHp(character, room)}
          >
            Restore
          </Button>
        }
      </div>
    </div>
  );
}
