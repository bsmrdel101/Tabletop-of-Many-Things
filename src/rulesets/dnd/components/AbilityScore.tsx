import { numPrefix } from "@/scripts/tools/utils";

interface Props {
  abilityScore: AbilityScore_Dnd
  onClick: (abilityScore: AbilityScore_Dnd) => void
}


export default function AbilityScore({ abilityScore, onClick }: Props) {
  return (
    <div className="ability-score" onClick={() => onClick(abilityScore)}>
      <p className="ability-score__name">{ abilityScore.name.toUpperCase() }</p>
      <p className="ability-score__value">{ abilityScore.value }</p>
      <p className="ability-score__mod">{ numPrefix(abilityScore.mod) }</p>
    </div>
  );
}
