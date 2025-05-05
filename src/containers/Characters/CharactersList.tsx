import { userAtom } from "@/atoms/state";
import CharacterCard from "@/components/Characters/CharacterCard";
import NewCharacterCard from "@/components/Characters/NewCharacterCard";
import Button from "@/components/Library/Button";
import { addCharacter, deleteCharacter, getCharactersByUser } from "@/services/5e/charactersService";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";


export default function CharactersList() {
  const [user] = useAtom(userAtom);
  const [characters, setCharacters] = useState<CharacterMin_5e[]>([]);
  const [showNewCharacterForm, setShowNewCharacterForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getCharactersByUser();
    setCharacters(res);
  };

  const handleDelete = async (character: CharacterMin_5e) => {
    if (!confirm(`Do you want to delete ${character.name}?`)) return;
    await deleteCharacter(character.id);
    setCharacters(characters.filter((c) => c.id !== character.id));
  };

  const onCreateCharacter = async (name: string, img: File | null, ruleset: string) => {
    setShowNewCharacterForm(false);
    await addCharacter(user, name, img, ruleset);
    await fetchData();
  };


  return (
    <>
      <div className="characters-list__title">
        <h2>Characters</h2>
        <Button
          variants={['small', 'flat']}
          onClick={() => setShowNewCharacterForm(true)}
          data-testid="new-btn"
        >
          +
        </Button>
      </div>

      <div className="characters-list">
        {!showNewCharacterForm && characters.map((character) => {
          return <CharacterCard key={character.id} character={character} deleteFn={handleDelete} />;
        })}
        {showNewCharacterForm &&
          <NewCharacterCard
            setOpen={setShowNewCharacterForm}
            onCreateCharacter={onCreateCharacter}
          />
        }
        </div>
    </>
  );
}
