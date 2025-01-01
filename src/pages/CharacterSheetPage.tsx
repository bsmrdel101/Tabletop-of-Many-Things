import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../scripts/controllers/5e/charactersController";
import CharacterSheet5e from "../components/CharacterSheet/5e/CharacterSheet";


export default function CharacterSheetPage() {
  const { id } = useParams<any>();
  const [character5e, setCharacter5e] = useState<Character_5e>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCharacterById(id);
      setCharacter5e(res);
    };
    fetchData();
  }, []);


  return (
    <div className="character-sheet-page">
      {character5e &&
        <>
          <CharacterSheet5e character={character5e} setCharacter={setCharacter5e} editing={editing} setEditing={setEditing} />
        </>
      }
    </div>
  );
}
