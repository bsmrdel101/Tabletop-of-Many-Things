import { gameAtom } from "@/scripts/atoms/state";
import Button from "@/components/Library/Button";
import { xpForNextLevel } from "@/rulesets/dnd/scripts/gameSystemsInfo";
import { formatCharacterClasses } from "@/scripts/tools/utils";
import { useAtom } from "jotai";

interface Props {
  character: Character_5e
}


export default function MainHeader({ character }: Props) {
  const [game] = useAtom<Game | null>(gameAtom); // TODO: game is currently not being set anywhere


  return (
    <header className="character-sheet-main-header">
      <div className="character-sheet-main-header__character-info">
        <img className="character-sheet-main-header__character-pic" src={character.img} alt="Character image" />
        <div>
          <h2 className="character-sheet-main-header__name">{ character.name }</h2>
          <p><strong>CLASSES</strong>: { formatCharacterClasses(character.classes) }</p>
          <p><strong>RACE</strong>: { character.race?.name }{ character.subrace && ` (${character.subrace})` }</p>
          <p><strong>BACKGROUND</strong>: { character.background?.name }</p>
        </div>
      </div>

      <div className="character-sheet-main-header__lvl-manager">
        { game?.settings.dnd?.usingXp && <p>Xp: { character.xp } / { xpForNextLevel(character.lvl) }</p> }
        <Button variants={['thin']}>Level Up</Button>
      </div>
    </header>
  );
}
