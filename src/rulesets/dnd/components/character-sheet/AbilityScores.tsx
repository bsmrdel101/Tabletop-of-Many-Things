import AbilityScore from "@/rulesets/dnd/components/AbilityScore";

interface Props {
  character: Character_Dnd
}


export default function AbilityScores({ character }: Props) {
  const handleRollCheck = (abilityScore: AbilityScore_Dnd) => {
    console.log(abilityScore);
  };


  return (
    <div className="character-sheet-main-ability-scores">
      {character.abilityScores.map((abilityScore: AbilityScore_Dnd) => {
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
