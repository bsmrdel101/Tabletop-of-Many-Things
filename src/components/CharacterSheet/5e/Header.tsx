import { useEffect, useState } from "react";
import Input from "../../Library/Input";
import Select from "../../Library/Select";
import { useAtom } from "jotai";
import { backgroundsAtom, classesAtom, racesAtom } from "../../../scripts/atoms/state";
import Button from "../../Library/Button";
import { getCharacterSubtitle, getXpFromLvl } from "../../../scripts/tools/5e/characterUtils";

interface Props {
  character: Character
}


export default function Header({ character }: Props) {
  const [racesData] = useAtom<Race[]>(racesAtom);
  const [classesData] = useAtom<Class[]>(classesAtom);
  const [backgroundsData] = useAtom<Background[]>(backgroundsAtom);
  const [editing, setEditing] = useState(false);
  const [subtitle, setSubtitle] = useState('');
  const [name, setName] = useState(character.name);
  const [race, setRace] = useState<Race>(character.race);
  const [classes, setClasses] = useState<Class[]>(character.classes);
  const [background, setBackground] = useState<Background>(character.background);

  useEffect(() => {
    setSubtitle(getCharacterSubtitle(character));
  }, []);

  const handleChangeRace = (id: number) => {
    setRace(racesData.find((r) => r.id = id));
  };

  const handleChangeBackground = (id: number) => {
    setBackground(backgroundsData.find((r) => r.id = id));
  };


  return (
    <header className="character-sheet__header">
      <img className="character-sheet__header-pic" src={character.img} alt="Character picture" />
      {editing ?
        <div className="character-sheet__header-content-container">
          <div className="character-sheet__header-content">
            <Input
              variants={['h1']}
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
            <Select
              variants={['label-bold', 'gap']}
              label="Race"
              value={race ? race.id : 0}
              onChange={(e: any) => handleChangeRace(Number(e.target.value))}
            >
              <option value="" disabled={race !== null}>-- PICK RACE --</option>
              {racesData.map((race) => {
                return (
                  <option key={race.id} value={race.id}>{ race.name }</option>
                );
              })}
            </Select>
            {race && race.subrace &&
              <Select
                variants={['label-bold', 'gap']}
                label="Subrace"
                value={race.subrace.id}
                onChange={(e: any) => handleChangeRace(Number(e.target.value))}
              >
                <option value="" disabled={race.subrace !== null}>-- PICK SUBRACE --</option>
                {racesData.map((race) => {
                  return (
                    <option key={race.subrace.id} value={race.subrace.id}>{ race.subrace.name }</option>
                  );
                })}
              </Select>
            }
            <Select
              variants={['label-bold', 'gap']}
              label="Background"
              value={background ? background.id : 0}
              onChange={(e: any) => handleChangeBackground(Number(e.target.value))}
            >
              <option value="" disabled={background !== null}>-- PICK BACKGROUND --</option>
              {backgroundsData.map((background) => {
                return (
                  <option key={background.id} value={background.id}>{ background.name }</option>
                );
              })}
            </Select>

            <Button variants={['brown', 'fit', 'bold', 'hover-scale']}>Manage Classes</Button>
          </div>

          <div className="character-sheet__header-right-content">
            <p>{character.xp}/{getXpFromLvl(character.lvl)} xp</p>
            <Button variants={['hover-scale']}>Grant Xp</Button>
            <Button variants={['hover-scale']}>Level Up</Button>
          </div>
        </div>
        :
        <div className="character-sheet__header-content-container">
          <div className="character-sheet__header-content">
            <h1>{ character.name }</h1>
            <h4>Level { character.lvl }</h4>
            <p>{ subtitle }</p>
          </div>

          <div className="character-sheet__header-right-content">
            <p>{character.xp}/{getXpFromLvl(character.lvl)} xp</p>
            <Button variants={['hover-scale']}>Grant Xp</Button>
            <Button variants={['hover-scale']}>Level Up</Button>
          </div>
        </div>
      }

      <Button onClick={() => setEditing(!editing)} variants={['edit']}>E</Button>
    </header>
  );
}
