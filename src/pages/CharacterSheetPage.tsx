import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../scripts/controllers/5e/charactersController";
import CharacterSheet5e from "../components/CharacterSheet/5e/CharacterSheet";
import { emitServerEvent } from "../scripts/config/socket-io";
import { useAtom } from "jotai";
import { userAtom } from "../scripts/atoms/state";
import { makeID } from "../scripts/tools/utils";


export default function CharacterSheetPage() {
  const { id } = useParams<any>();
  const [user] = useAtom<User>(userAtom);
  const [character5e, setCharacter5e] = useState<Character_5e>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCharacterById(id);
      emitServerEvent('JOIN_ROOM', [user.username, makeID()]);
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
