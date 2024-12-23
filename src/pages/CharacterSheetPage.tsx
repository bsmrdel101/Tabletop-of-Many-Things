import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../scripts/controllers/5e/charactersController";
import CharacterSheet5e from "../components/CharacterSheet/5e/CharacterSheet";


export default function CharacterSheetPage() {
  const { id } = useParams<any>();
  const [character, setCharacter] = useState<Character>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCharacterById(id);
      setCharacter(res);
    };
    fetchData();
  }, []);


  return (
    <div className="character-sheet-page">
      {character &&
      <>
        <CharacterSheet5e character={character} setCharacter={setCharacter} />
      </>
      }
    </div>
  );
}
