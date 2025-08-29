import MainHeader from "@/rulesets/5e/components/character-sheet/MainHeader";
import HealthManagement from "../../../../dnd/components/HealthManagement";
import MainStats from "../MainStats";
import AbilityScores from "../AbilityScores";

interface Props {
  character: Character_5e
}


export default function CharacterSheetMain({ character }: Props) {
  return (
    <section className="character-sheet-main">
      <MainHeader character={character} />
      <div className="character-sheet-main__row">
        <HealthManagement character={character} />
        <MainStats character={character} />
      </div>
      <AbilityScores character={character} />
    </section>
  );
};
