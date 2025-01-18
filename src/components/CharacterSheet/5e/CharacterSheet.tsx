import { useEffect, useState } from "react";
import Header from "./Header";
import { useAtom } from "jotai";
import { backgroundsAtom5e, classesAtom5e, racesAtom5e } from "../../../scripts/atoms/state";
import { getAllRaces } from "../../../scripts/controllers/5e/racesController";
import { getAllBackgrounds } from "../../../scripts/controllers/5e/backgroundsController";
import { getAllClasses } from "../../../scripts/controllers/5e/classesController";
import HealthManagement from "./HealthManagement";
import { onServerEvent } from "../../../scripts/config/socket-io";
import MainStats from "./MainStats";
import Speeds from "./Speeds";
import Senses from "./Senses";
import AbilityScores from "./AbilityScores";
import Resistances from "./Resistances";
import Vulnerabilities from "./Vulnerabilities";
import CondImmunities from "./CondImmunities";
import DmgImmunities from "./DmgImmunities";
import QuickAccessNavbar from "./QuickAccessNavbar";

interface Props {
  character: Character_5e
  setCharacter: (character: Character_5e) => void
  editing: boolean
  setEditing: (value: boolean) => void
  room: string
}


export default function CharacterSheet5e({ character, setCharacter, editing, setEditing, room }: Props) {
  const [races, setRaces] = useAtom<Race_5e[]>(racesAtom5e);
  const [backgrounds, setBackgrounds] = useAtom<Background_5e[]>(backgroundsAtom5e);
  const [classes, setClasses] = useAtom<Class_5e[]>(classesAtom5e);
  const [page, setPage] = useState(0);

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
      <QuickAccessNavbar selectedTab={page} setPage={setPage} />

      {/* 
        =============================
                    MAIN
        =============================
      */}
      {page === 0 &&
        <>
          <div className="character-sheet__top-bar">
            <Header character={character} editing={editing} setEditing={setEditing} />
          </div>
          <div className="character-sheet__section">
            <div>
              <div className="character-sheet__section">
                <HealthManagement character={character} room={room} />
                <MainStats character={character} room={room} />
              </div>
              <AbilityScores character={character} />
            </div>
            
            <div>
              <div>
                <Speeds character={character} />
                <br />
                <Senses character={character} />
              </div>
              <br />
            </div>
          </div>

          <div className="attributes">
            <Resistances character={character} />
            <Vulnerabilities character={character} />
            <CondImmunities character={character} />
            <DmgImmunities character={character} />
          </div>
        </>
      }

      {/* 
        =============================
                   SKILLS
        =============================
      */}
      {page === 1
        
      }
    </div>
  );
}
