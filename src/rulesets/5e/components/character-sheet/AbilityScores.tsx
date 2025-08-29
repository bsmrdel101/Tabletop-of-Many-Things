import AbilityScore from "@/rulesets/dnd/components/AbilityScore";

interface Props {
  character: Character_5e
}


export default function AbilityScores({ character }: Props) {
  const handleRollCheck = (abilityScore: AbilityScore_5e) => {
    
  };


  return (
    <div className="character-sheet-main-ability-scores">
      {character.abilityScores.map((abilityScore: AbilityScore_5e) => {
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
