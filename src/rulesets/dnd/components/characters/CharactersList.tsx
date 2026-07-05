import CharacterCard from "./CharacterCard";
import Button from "@/components/library/Button";
import { deleteCharacter, getCharactersByUser } from "@/rulesets/dnd/services/charactersService";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CharacterCreationProcess5e from "@/rulesets/5e/components/modification-processes/character-creation/CharacterCreationProcess5e";


export default function CharactersList() {
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);
  const [ruleset, setRuleset] = useState<Ruleset>('5e');

  const { data: characters = [], refetch, isFetched } = useQuery<CharacterCard_dnd[]>({
    queryKey: ['characters'],
    queryFn: getCharactersByUser
  });

  const handleDelete = async (character: CharacterCard_dnd) => {
    if (!confirm(`Do you want to delete ${character.name}?`)) return;
    await deleteCharacter(character.id);
    await refetch();
  };
  

  return (
    <>
      {ruleset === '5e' &&
        <CharacterCreationProcess5e
          showCharacterCreation={showCharacterCreation}
          setShowCharacterCreation={setShowCharacterCreation}
          refetch={refetch}
        />
      }

      <div className="characters-list__title">
        <h2>Characters</h2>
        <Button
          variants={['small', 'flat']}
          onClick={() => setShowCharacterCreation(true)}
          data-testid="new-btn"
        >
          +
        </Button>
      </div>

      <div className="characters-list">
        { characters.length === 0 && isFetched && <p>No characters created</p> }
        {!showCharacterCreation && characters.map((character) => {
          return <CharacterCard key={character.id} character={character} deleteFn={handleDelete} />;
        })}
      </div>
    </>
  );
}
