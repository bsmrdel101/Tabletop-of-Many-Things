import AbilityScore from "@/rulesets/dnd/components/stat-block/AbilityScore";
import { rollCheck } from "../../scripts/gameplayMechanics";
import { memo } from "react";

interface Props {
  abilityScores: AbilityScore_Dnd[]
}


function AbilityScores({ abilityScores }: Props) {
  const handleRollCheck = (abilityScore: AbilityScore_Dnd) => {
    rollCheck(abilityScore.mod);
  };


  return (
    <div className="character-sheet-ability-scores">
      {abilityScores.map((abilityScore: AbilityScore_Dnd) => {
        return (
          <AbilityScore
            key={abilityScore.id}
            abilityScore={abilityScore}
            onClick={handleRollCheck}
          />
        );
      })}
    </div>
  );
}

export default memo(AbilityScores);
