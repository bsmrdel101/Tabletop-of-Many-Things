import { gameAtom } from "@/atoms/state";
import Button from "@/components/Library/Button";
import { xpForNextLevel } from "@/logic/dnd/gameSystemsInfo";
import { formatCharacterClasses } from "@/scripts/tools/utils";
import { useAtom } from "jotai";

interface Props {
  character: Character_5e
}


export default function MainHeader({ character }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);


  return (
    <header className="character-sheet-main-header">
      <div className="character-sheet-main-header__character-info">
        <img className="character-sheet-main-header__character-pic" src={character.img} alt="Character image" />
        <div>
          <h2 className="character-sheet-main-header__name">{ character.name }</h2>
          <p>{ formatCharacterClasses(character.classes) }</p>
          <p>{ character.race?.name }{ character.subrace && ` (${character.subrace})` }</p>
          <p>{ character.background?.name }</p>
        </div>
      </div>

      <div className="character-sheet-main-header__lvl-manager">
        <p className="character-sheet-main-header__lvl-manager--lvl">Lvl { character.lvl }</p>
        { game?.settings.dnd?.usingXp && <p>Xp: { character.xp } / { xpForNextLevel(character.lvl) }</p> }
        <Button>Level Up</Button>
      </div>
    </header>
  );
}
