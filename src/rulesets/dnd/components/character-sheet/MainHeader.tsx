import { gameAtom } from "@/scripts/atoms/state";
import Button from "@/components/library/Button";
import { xpForNextLevel } from "@/rulesets/dnd/scripts/gameSystemsInfo";
import { useAtom } from "jotai";
import { formatCharacterClasses } from "../../scripts/utils";
import { memo } from "react";
import Inspiration from "./Inspiration";
import Img from "@/components/library/Img";

interface Props {
  characterImg: string
  characterName: string
  characterClasses: PlayerClass_Dnd[]
  characterRace: PlayerRace_Dnd | null
  characterSubrace: PlayerSubrace_Dnd | null
  characterBackground: PlayerBackground_5e | PlayerBackground_2024 | null
  characterXp: number
  characterLvl: number
  characterBardicInsp: BardicInsp_Dnd | null
}


function MainHeader({ characterImg, characterName, characterClasses, characterRace, characterSubrace, characterBackground, characterXp, characterLvl, characterBardicInsp }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);


  return (
    <header className="character-sheet-main-header">
      <div className="character-sheet-main-header__character-info">
        <Img
          className="character-sheet-main-header__character-pic"
          src={characterImg}
          alt="Character image"
          draggable
        />
        <div>
          <h2 className="character-sheet-main-header__name">{ characterName }</h2>
          <p><strong>CLASSES</strong>: { formatCharacterClasses(characterClasses) }</p>
          <p><strong>RACE</strong>: { characterRace?.name }{ characterSubrace && ` (${characterSubrace.name})` }</p>
          <p><strong>BACKGROUND</strong>: { characterBackground?.name }</p>
        </div>
      </div>

      <div className="character-sheet-main-header__right">
        { characterBardicInsp && <Inspiration bardicInsp={characterBardicInsp} /> }

        <div className="character-sheet-main-header__rest-buttons">
          <Button variants={['thin', 'secondary-blue', 'left-icon']}>
            <Img src="/images/game/campfire.svg" alt="Campfire" /> Short Rest
          </Button>
          <Button variants={['thin', 'secondary-blue', 'left-icon']}>
            <Img src="/images/game/tent.svg" alt="Tent" /> Long Rest
          </Button>
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
