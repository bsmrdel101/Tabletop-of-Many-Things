import { Link } from "react-router-dom";
import Button from "../components/Library/Button";
import { useEffect, useState } from "react";
import { addCharacter, getAllCharacters } from "../scripts/controllers/charactersController";

export default function LoginPage() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCharacters();
      setCharacters(res);
    };
    fetchData();
  }, []);

  const handleNewCharacter = async () => {
    await addCharacter();
  };


  return (
    <div className="characters-page">
      <h1>Tabletop of <br /> Many Things</h1>

      <div className="characters-page__links-list">
        <Link to="/">Back</Link>
        <Button onClick={handleNewCharacter}>New Character</Button>
      </div>
      <div className="characters-page__content">

      </div>
    </div>
  );
}
