import { gameAtom } from "@/scripts/atoms/state";
import Button from "@/components/library/Button";
import { xpForNextLevel } from "@/rulesets/dnd/scripts/gameSystemsInfo";
import { useAtom } from "jotai";
import { formatCharacterClasses } from "../../scripts/utils";
import { memo } from "react";

interface Props {
  characterImg: string
  characterName: string
  characterClasses: PlayerClass_5e[] | PlayerClass_2024[]
  characterRace: PlayerRace_Dnd | null
  characterSubrace: PlayerSubrace_Dnd | null
  characterBackground: PlayerBackground_5e | PlayerBackground_2024 | null
  characterXp: number
  characterLvl: number
}


function MainHeader({ characterImg, characterName, characterClasses, characterRace, characterSubrace, characterBackground, characterXp, characterLvl }: Props) {
  const [game] = useAtom<Game | null>(gameAtom); // TODO: game is currently not being set anywhere


  return (
    <header className="character-sheet-main-header">
      <div className="character-sheet-main-header__character-info">
        <img className="character-sheet-main-header__character-pic" src={characterImg} alt="Character image" />
        <div>
          <h2 className="character-sheet-main-header__name">{ characterName }</h2>
          <p><strong>CLASSES</strong>: { formatCharacterClasses(characterClasses) }</p>
          <p><strong>RACE</strong>: { characterRace?.name }{ characterSubrace && ` (${characterSubrace.name})` }</p>
          <p><strong>BACKGROUND</strong>: { characterBackground?.name }</p>
        </div>
      </div>

      <div className="character-sheet-main-header__right">
        <div className="character-sheet-main-header__rest-buttons">
          <Button variants={['thin', 'secondary']}>Short Rest</Button>
          <Button variants={['thin', 'secondary']}>Long Rest</Button>
        </div>

        <div className="character-sheet-main-header__lvl-manager">
          { game?.settings.dnd?.usingXp && <p>XP: { characterXp } / { xpForNextLevel(characterLvl) }</p> }
          <Button variants={['thin']}>Level Up</Button>
        </div>
      </div>
    </header>
  );
}

export default memo(MainHeader);
