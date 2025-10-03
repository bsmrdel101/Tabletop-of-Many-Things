import { gameAtom, roomAtom } from "@/scripts/atoms/state";
import Button from "@/components/library/Button";
import { xpForNextLevel } from "@/rulesets/dnd/scripts/gameSystemsInfo";
import { useAtom } from "jotai";
import { ChangeEvent, memo, useState } from "react";
import Img from "@/components/library/Img";
import Inspiration from "../Inspiration";
import Input from "@/components/library/Input";
import useAutoSave from "@/hooks/useAutoSave";
import { editCharacter, getCharacterById } from "@/rulesets/dnd/services/charactersService";
import { emitServerEvent } from "@/scripts/config/socket-io";
import Select from "@/components/library/select/Select";
import useClasses5e from "@/rulesets/5e/hooks/useClasses5e";
import { editPlayerClass, removePlayerClass } from "@/rulesets/5e/services/classesService";

interface Props {
  characterId: number
  characterImg: string
  characterName: string
  characterClasses: PlayerClass_5e[] | PlayerClass_2024[]
  characterRace: PlayerRace_Dnd | null
  characterSubrace: PlayerSubrace_Dnd | null
  characterBackground: PlayerBackground_5e | PlayerBackground_2024 | null
  characterXp: number
  characterLvl: number
  characterBardicInsp: BardicInsp_Dnd | null
}


function EditMainHeader({ characterId, characterImg, characterName, characterClasses, characterRace, characterSubrace, characterBackground, characterXp, characterLvl, characterBardicInsp }: Props) {
  const [room] = useAtom<string>(roomAtom);
  const [game] = useAtom<Game | null>(gameAtom);
  const [name, setName] = useState({ error: '', value: characterName });
  const [playerClasses, setPlayerClasses] = useState<PlayerClass_5e[] | PlayerClass_2024[]>(characterClasses);
  const { classes } = useClasses5e(game?.id ?? 0);

  const handleSave = async () => {
    const res = await getCharacterById(characterId);
    if (!res) return;
    if (!name.value) {
      setName({ error: 'Name cannot be empty', value: '' });
      return;
    }

    const character = { ...res, name: name.value, classes: playerClasses };
    emitServerEvent('UPDATE_PLAYER', [character, room]);
    editCharacter(character);
  };

  useAutoSave(name, handleSave);
  useAutoSave(playerClasses, handleSave);

  const handleDeleteClass = async (id: number) => {
    const newClasses = playerClasses.filter((c) => c.playerClassId !== id);
    setPlayerClasses(newClasses);
    await removePlayerClass(id);
  };

  const handleEditClassLevel = async (e: ChangeEvent<HTMLSelectElement>, playerClassId: number) => {
    const classesToEdit: PlayerClass_5e[] | PlayerClass_2024[] = [];
    const newClasses = playerClasses.map((c) => {
      if (c.id === playerClassId) {
        const newClass = { ...c, lvl: Number(e.target.value) };
        classesToEdit.push(newClass);
        return newClass;
      }
      return c;
    });
    setPlayerClasses(newClasses);

    for (const c of classesToEdit) {
      await editPlayerClass({ id: c.playerClassId, lvl: c.lvl, subclassId: null });
    }
  };


  return (
    <header className="character-sheet-main-header edit-character-sheet-main-header">
      <div className="character-sheet-main-header__character-info">
        <Img
          className="character-sheet-main-header__character-pic"
          src={characterImg}
          alt="Character image"
          draggable
        />
        <div className="edit-character-sheet-main-header__column">
          <Input
            variants={['empty', 'label-xl']}
            value={name.value}
            onChange={(e) => setName({ error: '', value: e.target.value })}
            error={name.error}
          />
          <p><strong>CLASSES:</strong></p>
          <div className="edit-character-sheet-main-header__classes">
            {playerClasses.map((c) => {
              const levels = Array.from({ length: 20 }, (_, index) => index + 1);
              return (
                <div key={c.id} className="edit-character-sheet-main-header__class-row">
                  <div className="edit-character-sheet-main-header__class-row--left">
                    <p>{ c.name }</p>
                    <Select
                      value={c.lvl}
                      onChange={(e) => handleEditClassLevel(e, c.id)}
                    >
                      {levels.map((lvl: number) => {
                        return <option key={lvl}>{ lvl }</option>;
                      })}
                    </Select>
                  </div>

                  <Button
                    variants={['danger', 'image']}
                    style={{ padding: '0.2rem' }}
                    onClick={() => handleDeleteClass(c.playerClassId)}
                  >
                    <Img src="/images/icons/trash.svg" alt="Delete button" />
                  </Button>
                </div>
              );
            })}
          </div>
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

export default memo(EditMainHeader);
