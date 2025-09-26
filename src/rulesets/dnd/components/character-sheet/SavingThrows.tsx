import { rollCheck } from "../../scripts/gameplayMechanics";
import { memo } from "react";
import SavingThrow from "../SavingThrow";

interface Props {
  abilityScores: AbilityScore_Dnd[]
  lvl: number
}


function SavingThrows({ abilityScores, lvl }: Props) {
  const handleRollCheck = (abilityScore: AbilityScore_Dnd) => {
    rollCheck(abilityScore.mod);
  };


  return (
    <div className="character-sheet-main-saving-throws">
      <h3 className="character-sheet-main-saving-throws__title">Saving Throws</h3>
      <div className="character-sheet-main-saving-throws__list">
        {abilityScores.map((abilityScore: AbilityScore_Dnd) => {
          return (
            <SavingThrow
              key={abilityScore.id}
              abilityScore={abilityScore}
              lvl={lvl}
              onClick={handleRollCheck}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(SavingThrows);
