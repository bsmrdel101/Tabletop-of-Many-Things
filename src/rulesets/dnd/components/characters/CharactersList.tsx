import CharacterCard from "./CharacterCard";
import Button from "@/components/library/Button";
import { deleteCharacter, getCharactersByUser } from "@/rulesets/dnd/services/charactersService";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ModificationProcess, { ModificationStep } from "@/components/ModificationProcess";
import SetupStep, { isSetupComplete } from "../modification-processes/character/SetupStep";
import { useCharacterDraft } from "../hooks/useCharacterDraft";


export default function CharactersList() {
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);
  const { character, updateCharacter, resetCharacter } = useCharacterDraft();

  const { data: characters = [], refetch, isFetched } = useQuery<CharacterCard_Dnd[]>({
    queryKey: ['characters'],
    queryFn: getCharactersByUser
  });

  const steps: ModificationStep[] = [
    {
      name: 'Setup',
      content: (
        <SetupStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Classes',
      content: (
        <SetupStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Subclasses',
      content: (
        <SetupStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Race',
      content: (
        <SetupStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Background',
      content: (
        <SetupStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Ability Scores',
      content: (
        <SetupStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Starting Items',
      content: (
        <SetupStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Features',
      content: (
        <SetupStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    }
  ];

  const handleDelete = async (character: CharacterCard_Dnd) => {
    if (!confirm(`Do you want to delete ${character.name}?`)) return;
    await deleteCharacter(character.id);
    await refetch();
  };

  const onCloseCharacterCreation = async () => {

    
    setShowCharacterCreation(false);
    resetCharacter();
    refetch();
  };
  

  return (
    <>
      <ModificationProcess
        open={showCharacterCreation}
        onClose={onCloseCharacterCreation}
        steps={steps}
        className="character-modification-process"
      />

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
