import { formatCharacterClasses } from "@/scripts/tools/utils";

interface Props {
  character: Character_5e
}


export default function MainHeader({ character }: Props) {
  return (
    <header className="character-sheet-main-header">
      <img className="character-sheet-main-header__character-pic" src={character.img} alt="Character image" />
      <div>
        <h2 className="character-sheet-main-header__name">{ character.name }</h2>
        <p>{ formatCharacterClasses(character.classes) }</p>
        <p>{ character.race?.name }{ character.subrace && ` (${character.subrace})` }</p>
        <p>{ character.background?.name }</p>
      </div>
    </header>
  );
}
