import { numPrefix } from "@/scripts/tools/utils";

interface Props {
  abilityScore: AbilityScore_5e
}


export default function AbilityScore({ abilityScore }: Props) {
  return (
    <div className="ability-score">
      <p className="ability-score__name">{ abilityScore.name.toUpperCase() }</p>
      <p className="ability-score__value">{ abilityScore.value }</p>
      <p className="ability-score__mod">{ numPrefix(abilityScore.mod) }</p>
    </div>
  );
}
