import { Link } from "react-router-dom";
import Button from "../components/Library/Button";
import { Fragment, useEffect, useState } from "react";
import { addCharacter, getAllCharacters } from "../scripts/controllers/5e/charactersController";
import CharacterCard from "../components/CharacterCard";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character_5e[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCharacters();
      setCharacters(res);
    };
    fetchData();
  }, []);

  const handleNewCharacter = async () => {
    await addCharacter();
    location.reload();
  };


  return (
    <div className="characters-page">
      <h1>Tabletop of <br /> Many Things</h1>

      <div className="characters-page__links-list">
        <Link to="/">Back</Link>
        <Button onClick={handleNewCharacter}>New Character</Button>
      </div>
      <div className="characters-page__content">
        {characters.map((char) => {
          return (
            <Fragment key={char.id}>
              <CharacterCard char={char} characters={characters} setCharacters={setCharacters} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
