import { numPrefix } from "@/scripts/tools/utils";

interface Props {
  abilityScore: AbilityScore_Dnd
  prof: number
  onClick: (abilityScore: AbilityScore_Dnd) => void
}


export default function SavingThrow({ abilityScore, prof, onClick }: Props) {
  return (
    <div className="saving-throw" onClick={() => onClick(abilityScore)}>
      { abilityScore.prof && <img src="/images/game/star.svg" alt="Star" /> }
      <p className="saving-throw__name">{ abilityScore.name.toUpperCase() }</p>
      <p className="saving-throw__mod">{ numPrefix(abilityScore.mod + prof) }</p>
    </div>
  );
}
