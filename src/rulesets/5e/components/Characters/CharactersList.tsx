import { userAtom } from "@/scripts/atoms/state";
import CharacterCard from "./CharacterCard";
import NewCharacterCard from "./NewCharacterCard";
import Button from "@/components/Library/Button";
import { addCharacter, deleteCharacter, getCharactersByUser } from "@/rulesets/5e/services/charactersService";
import { useAtom } from "jotai";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";


export default function CharactersList() {
  const [user] = useAtom(userAtom);
  const [showNewCharacterForm, setShowNewCharacterForm] = useState(false);

  const { data: characters = [], refetch, isFetched } = useQuery<CharacterCard_5e[]>({
    queryKey: ['characters'],
    queryFn: getCharactersByUser
  });

  const handleDelete = async (character: CharacterCard_5e) => {
    if (!confirm(`Do you want to delete ${character.name}?`)) return;
    await deleteCharacter(character.id);
    await refetch();
  };

  const handleCreateCharacter = async (name: string, img: File | null, ruleset: string) => {
    setShowNewCharacterForm(false);
    await addCharacter(user, name, img, ruleset);
    await refetch();
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
        { characters.length === 0 && isFetched && <p>No characters created</p> }
        {!showNewCharacterForm && characters.map((character) => {
          return <CharacterCard key={character.id} character={character} deleteFn={handleDelete} />;
        })}
        {showNewCharacterForm &&
          <NewCharacterCard
            setOpen={setShowNewCharacterForm}
            onCreateCharacter={handleCreateCharacter}
          />
        }
      </div>
    </>
  );
}
