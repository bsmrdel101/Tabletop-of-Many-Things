import { gameAtom, roomAtom } from "@/scripts/atoms/state";
import Button from "@/components/library/Button";
import { xpForNextLevel } from "@/rulesets/dnd/scripts/gameSystemsInfo";
import { useAtom } from "jotai";
import { ChangeEvent, memo, useState } from "react";
import Img from "@/components/library/Img";
import Inspiration from "../../../dnd/components/character-sheet/Inspiration";
import Input from "@/components/library/Input";
import useAutoSave from "@/hooks/useAutoSave";
import { editCharacter, getCharacterById } from "@/rulesets/dnd/services/charactersService";
import { emitServerEvent } from "@/scripts/config/socket-io";
import Select from "@/components/library/select/Select";
import SelectClassModal from "../modals/SelectClassModal";
import RaceSelect from "@/rulesets/dnd/components/select/RaceSelect";
import { alert } from "@/scripts/tools/popups";
import { useQuery } from "@tanstack/react-query";
import { getClasses } from "../../services/classesService";
import { getRaces } from "@/rulesets/dnd/services/racesService";

interface Props {
  characterId: number
  characterImg: string
  characterName: string
  characterClasses: PlayerClass_5e[] | PlayerClass_2024[]
  characterRace: PlayerRace_5e | null
  characterSubrace: PlayerSubrace_5e | null
  characterBackground: PlayerBackground_5e | null
  characterXp: number
  characterLvl: number
  characterBardicInsp: BardicInsp_dnd | null
}


function EditMainHeader({ characterId, characterImg, characterName, characterClasses, characterRace, characterSubrace, characterBackground, characterXp, characterLvl, characterBardicInsp }: Props) {
  const [room] = useAtom<string>(roomAtom);
  const [game] = useAtom<Game | null>(gameAtom);
  const [name, setName] = useState(characterName);
  const [playerClasses, setPlayerClasses] = useState<PlayerClass_5e[]>(characterClasses as PlayerClass_5e[]);
  const [playerRace, setPlayerRace] = useState<PlayerRace_5e | null>(characterRace);
  const [selectClassModalOpen, setSelectClassModalOpen] = useState(false);

  const { data: classes = [] } = useQuery<Class_5e[]>({
    queryKey: ['classes', game],
    queryFn: () => getClasses({ gameId: game?.pubId ?? null, worldId: game?.worldId ?? null, userContent: true })
  });

  const { data: races = [] } = useQuery<Race_5e[]>({
    queryKey: ['races', game],
    queryFn: async () => {
      const search = {
        gameId: game!.pubId,
        worldId: game!.worldId,
        userContent: false,
        name: null
      };
      return await getRaces(search);
    }
  })

  const handleSave = async () => {
    const res = await getCharacterById(characterId);
    if (!res) return;
    if (!name) {
      return alert('Name cannot be empty.');
    }

    const character = { ...res, name: name, classes: playerClasses };
    emitServerEvent('UPDATE_PLAYER', [character, room]);
    editCharacter(character);
  };

  useAutoSave<string>(name, handleSave);
  useAutoSave<PlayerClass_5e[]>(playerClasses, handleSave);

  const handleAddClass = async (c: Class_5e) => {
    // const newClass = await playerManager.addClass(characterId, c, playerClasses);
    // if (newClass) setPlayerClasses([...playerClasses, newClass]);
    // setSelectClassModalOpen(false);
  };

  const handleDeleteClass = async (id: number, className: string) => {
    // if (!confirm(`Remove the ${className} class from this character?`)) return;
    // const newClasses = await playerManager.removeClass(id, playerClasses);
    // setPlayerClasses(newClasses);
  };

  const handleEditClassLevel = async (e: ChangeEvent<HTMLSelectElement>, playerClassId: number) => {
    // const newClasses = await playerManager.editClassLevel(playerClassId, Number(e.target.value), playerClasses);
    // setPlayerClasses(newClasses);
  };

  const handleEditRace = async (race: Race_5e, subrace: Subrace_5e | null) => {
    console.log(race, subrace);
    
    // await playerManager.changeRace(race.id);
    // const newRace = {
    //   id: race.id,
    //   name: race.name,
    //   subrace
    // } as PlayerRace_5e;
    // setPlayerRace(newRace);
  };


  return (
    <>
      <SelectClassModal
        open={selectClassModalOpen}
        setOpen={setSelectClassModalOpen}
        onSelect={(c) => handleAddClass(c)}
        classes={classes.filter((c) => !playerClasses.some((p) => p.id === c.id))}
      />

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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p><strong>CLASSES</strong>:</p>
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
                      onClick={() => handleDeleteClass(c.id, c.name)}
                    >
                      <Img src="/images/icons/trash.svg" alt="Delete button" />
                    </Button>
                  </div>
                );
              })}
              
              <Button
                variants={['secondary-blue']}
                onClick={() => setSelectClassModalOpen(true)}
              >
                +
              </Button>
            </div>

            <p><strong>RACE</strong>:</p>
            <RaceSelect
              variants={['fit']}
              value={characterRace?.id}
              onChangeRace={handleEditRace}
              races={races}
            />
            
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
    </>
  );
}

export default memo(EditMainHeader);
