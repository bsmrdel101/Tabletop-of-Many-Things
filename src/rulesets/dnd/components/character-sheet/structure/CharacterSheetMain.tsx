import MainHeader from "@/rulesets/dnd/components/character-sheet/MainHeader";
import HealthManagement from "../../stat-block/HealthManagement";
import MainStats from "../MainStats";
import AbilityScores from "../AbilityScores";
import SavingThrows from "../SavingThrows";
import Attributes from "../Attributes";

interface Props {
  character: Character_Dnd
}


export default function CharacterSheetMain({ character }: Props) {
  return (
    <section className="character-sheet-main">
      <MainHeader
        characterImg={character.img}
        characterName={character.name}
        characterClasses={character.classes}
        characterRace={character.race}
        characterSubrace={character.subrace}
        characterBackground={character.background}
        characterXp={character.xp}
        characterLvl={character.lvl}
      />
      <div className="character-sheet-main__row">
        <HealthManagement character={character} />
        <MainStats character={character} />
      </div>
      <AbilityScores abilityScores={character.abilityScores} />
      <SavingThrows abilityScores={character.abilityScores} lvl={character.lvl} />
      <Attributes character={character} />
    </section>
  );
};
