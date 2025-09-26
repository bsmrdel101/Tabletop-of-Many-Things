import { rollCheck } from "../../scripts/gameplayMechanics";
import { memo } from "react";
import SavingThrow from "../stat-block/SavingThrow";
import { profFromLvl } from "../../scripts/gameSystemsInfo";

interface Props {
  abilityScores: AbilityScore_Dnd[]
  lvl: number
}


function SavingThrows({ abilityScores, lvl }: Props) {
  const handleRollCheck = (abilityScore: AbilityScore_Dnd) => {
    rollCheck(abilityScore.mod);
  };


  return (
    <div className="character-sheet-saving-throws">
      <h3 className="character-sheet-saving-throws__title">Saving Throws</h3>
      <div className="character-sheet-saving-throws__list">
        {abilityScores.map((abilityScore: AbilityScore_Dnd) => {
          return (
            <SavingThrow
              key={abilityScore.id}
              abilityScore={abilityScore}
              prof={abilityScore.prof ? profFromLvl(lvl) : 0}
              onClick={handleRollCheck}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(SavingThrows);
