import CharacterNavbar from "../CharacterNavbar";
import { useEffect, useState } from "react";
import CharacterSheetMain from "./CharacterSheetMain";
import { getCharacterById } from "@/rulesets/dnd/services/charactersService";
import { useParams } from "react-router";
import { offServerEvent, onServerEvent } from "@/scripts/config/socket-io";


export default function CharacterSheetDnd() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character_Dnd | null>(null);
  const [tab, setTab] = useState('main');
  
  const tabs = [
    { name: 'Main', index: 'main' },
    { name: 'Skills', index: 'skills' },
    { name: 'Abilities', index: 'abilities' },
    { name: 'Inventory', index: 'inventory' },
    { name: 'Actions', index: 'actions' },
    { name: 'Spells', index: 'spells' },
    { name: 'Notes', index: 'notes' },
    { name: 'Companions', index: 'companions' },
    { name: 'Variables', index: 'variables' }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCharacterById(Number(id));
      setCharacter(res);
    };
    fetchData();
    onServerEvent('UPDATE_PLAYER', handlePlayerUpdate);

    return () => {
      offServerEvent('UPDATE_PLAYER', handlePlayerUpdate);
    };
  }, []);

  const handlePlayerUpdate = (character: Character_Dnd) => {
    setCharacter(character);
  };

  const onChangeTab = (tab: string) => {
    setTab(tab);
  };


  return (
    <div className="character-sheet">
      {character &&
        <>
          <CharacterNavbar selectedTab={tab} tabs={tabs} onChangeTab={onChangeTab} />
          { tab === 'main' && <CharacterSheetMain character={character} /> }
        </>
      }
    </div>
  );
}
