import MainHeader from "@/rulesets/5e/components/character-sheet/MainHeader";
import HealthManagement from "../HealthManagement";
import MainStats from "../MainStats";

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
    </section>
  );
};
