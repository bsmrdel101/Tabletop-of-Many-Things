import { useEffect } from "react";
import Header from "./Header";
import { useAtom } from "jotai";
import { backgroundsAtom, classesAtom, racesAtom } from "../../../scripts/atoms/state";
import { getAllRaces } from "../../../scripts/controllers/5e/racesController";
import { getAllBackgrounds } from "../../../scripts/controllers/5e/backgroundsController";
import { getAllClasses } from "../../../scripts/controllers/5e/classesController";

interface Props {
  character: Character
}


export default function CharacterSheet5e({ character }: Props) {
  const [races, setRaces] = useAtom<Race[]>(racesAtom);
  const [backgrounds, setBackgrounds] = useAtom<Background[]>(backgroundsAtom);
  const [classes, setClasses] = useAtom<Class[]>(classesAtom);

  useEffect(() => {
    const fetchData = async () => {
      setRaces(await getAllRaces());
      setBackgrounds(await getAllBackgrounds());
      setClasses(await getAllClasses());
    };
    fetchData();
  }, []);


  return (
    <div className="character-sheet-page--5e">
      <div className="character-sheet__top-bar">
        <Header character={character} />
      </div>
    </div>
  );
}
