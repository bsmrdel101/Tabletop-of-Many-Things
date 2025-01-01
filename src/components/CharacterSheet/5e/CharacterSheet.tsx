import { useEffect } from "react";
import Header from "./Header";
import { useAtom } from "jotai";
import { backgroundsAtom, classesAtom, racesAtom } from "../../../scripts/atoms/state";
import { getAllRaces } from "../../../scripts/controllers/5e/racesController";
import { getAllBackgrounds } from "../../../scripts/controllers/5e/backgroundsController";
import { getAllClasses } from "../../../scripts/controllers/5e/classesController";
import HealthManagement from "./HealthManagement";
import { onServerEvent } from "../../../scripts/config/socket-io";
import MainStats from "./MainStats";
import Speeds from "./Speeds";
import Senses from "./Senses";

interface Props {
  character: Character_5e
  setCharacter: (character: Character_5e) => void
  editing: boolean
  setEditing: (value: boolean) => void
}


export default function CharacterSheet5e({ character, setCharacter, editing, setEditing }: Props) {
  const [races, setRaces] = useAtom<Race_5e[]>(racesAtom);
  const [backgrounds, setBackgrounds] = useAtom<Background_5e[]>(backgroundsAtom);
  const [classes, setClasses] = useAtom<Class_5e[]>(classesAtom);

  useEffect(() => {
    const fetchData = async () => {
      setRaces(await getAllRaces());
      setBackgrounds(await getAllBackgrounds());
      setClasses(await getAllClasses());
    };
    fetchData();

    onServerEvent('UPDATE_PLAYER', (char: Character_5e) => {
      if (character.id === char.id) setCharacter(char);
    });
  }, []);


  return (
    <div className="character-sheet-page--5e">
      <div className="character-sheet__top-bar">
        <Header character={character} editing={editing} setEditing={setEditing} />
      </div>
      <div className="character-sheet__section">
        <HealthManagement character={character} setCharacter={setCharacter} />
        <MainStats character={character} editing={editing} />
        <div style={{ marginLeft: '4rem' }}>
          <Speeds character={character} />
          <br />
          <Senses character={character} />
        </div>
      </div>
    </div>
  );
}
