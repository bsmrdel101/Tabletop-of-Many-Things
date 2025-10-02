import EditMainHeader from "../edit-mode/EditMainHeader";
import EditButton from "../EditButton";

interface Props {
  character: Character_Dnd
  editing: boolean
  setEditing: (value: boolean) => void
}


export default function EditCharacterSheetMain({ character, editing, setEditing }: Props) {
  return (
    <section className="character-sheet-main edit-character-sheet-main">
      <EditMainHeader
        characterId={character.id}
        characterImg={character.img}
        characterName={character.name}
        characterClasses={character.classes}
        characterRace={character.race}
        characterSubrace={character.subrace}
        characterBackground={character.background}
        characterXp={character.xp}
        characterLvl={character.lvl}
        characterBardicInsp={character.bardicInsp}
      />
      <div className="character-sheet-main__row">
        
      </div>

      <EditButton editing={editing} setEditing={setEditing} />
    </section>
  );
};
