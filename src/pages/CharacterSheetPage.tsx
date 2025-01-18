import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../scripts/controllers/5e/charactersController";
import CharacterSheet5e from "../components/CharacterSheet/5e/CharacterSheet";
import { emitServerEvent } from "../scripts/config/socket-io";
import { useAtom } from "jotai";
import { gameAtom, userAtom } from "../scripts/atoms/state";
import { makeID } from "../scripts/tools/utils";
import Button from "../components/Library/Button";


export default function CharacterSheetPage() {
  const { id } = useParams<any>();
  const [user] = useAtom<User>(userAtom);
  const [game, setGame] = useAtom<GameState>(gameAtom);
  const [character5e, setCharacter5e] = useState<Character_5e>(null);
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCharacterById(id);
      const code = makeID();
      emitServerEvent('JOIN_ROOM', [user.username, code]);
      setGame({ room: code, game: null, map: null });
      setCharacter5e(res);
    };
    fetchData();
  }, []);


  return (
    <div className="character-sheet-page">
      <Button className="character-sheet-page__menu-btn" onClick={() => setMenuOpen(true)}>
        <img src="/images/icons/hamburger-btn.svg" alt="character sheet menu" />
      </Button>
      {menuOpen &&
        <div className="character-sheet-page__menu">
          <Button variants={['X']} onClick={() => setMenuOpen(false)}>X</Button>
          <div className="character-sheet-page__menu-content">
            <h3>Menu</h3>
            <Button variants={['hover-white']}>Import Game Data</Button>
            <Button variants={['link', 'hover-white']}>
              <a href="/characters">Exit</a>
            </Button>
          </div>
        </div>
      }

      {character5e &&
        <>
          <CharacterSheet5e
            character={character5e}
            setCharacter={setCharacter5e}
            editing={editing}
            setEditing={setEditing}
            room={game.room}
          />
        </>
      }
    </div>
  );
}
