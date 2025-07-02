import CharacterNavbar from "@/components/Characters/CharacterNavbar";
import { useEffect, useState } from "react";
import CharacterSheetMain from "./CharacterSheetMain";
import { getCharacterById } from "@/services/5e/charactersService";
import { useParams } from "react-router";


export default function CharacterSheet5e() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character_5e | null>(null);
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
  }, []);

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
