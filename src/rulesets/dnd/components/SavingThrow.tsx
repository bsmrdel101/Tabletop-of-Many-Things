import { numPrefix } from "@/scripts/tools/utils";
import { profFromLvl } from "../scripts/gameSystemsInfo";
import { useMemo } from "react";

interface Props {
  abilityScore: AbilityScore_Dnd
  lvl: number
  onClick: (abilityScore: AbilityScore_Dnd) => void
}


export default function SavingThrow({ abilityScore, lvl, onClick }: Props) {
  const prof = useMemo(() => {
    return abilityScore.prof ? profFromLvl(lvl) : 0;
  }, [abilityScore, lvl]);


  return (
    <div className="saving-throw" onClick={() => onClick(abilityScore)}>
      { abilityScore.prof && <img src="/images/game/star.svg" alt="Star" /> }
      <p className="saving-throw__name">{ abilityScore.name.toUpperCase() }</p>
      <p className="saving-throw__mod">{ numPrefix(abilityScore.mod + prof) }</p>
    </div>
  );
}
