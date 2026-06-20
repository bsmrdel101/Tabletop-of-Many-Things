import CharacterCard from "./CharacterCard";
import Button from "@/components/library/Button";
import { deleteCharacter, getCharactersByUser } from "@/rulesets/dnd/services/charactersService";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ModificationProcess, { ModificationStep } from "@/components/ModificationProcess";
import SetupStep, { isSetupComplete } from "../modification-processes/character/SetupStep";
import { useCharacterDraft } from "../hooks/useCharacterDraft";
import ClassesStep from "../../../5e/components/modification-processes/character/ClassesStep";
import SubclassesStep from "../../../5e/components/modification-processes/character/SubclassesStep";
import RaceStep from "../../../5e/components/modification-processes/character/RaceStep";
import BackgroundStep from "../../../5e/components/modification-processes/character/BackgroundStep";
import AbilityScoresStep from "../../../5e/components/modification-processes/character/AbilityScoresStep";
import StartingItemsStep from "../../../5e/components/modification-processes/character/StartingItemsStep";
import FeaturesStep from "../../../5e/components/modification-processes/character/FeaturesStep";


export default function CharactersList() {
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);
  const { character, updateCharacter, resetCharacter } = useCharacterDraft();
  const [ruleset, setRuleset] = useState<Ruleset>('5e');

  const { data: characters = [], refetch, isFetched } = useQuery<CharacterCard_Dnd[]>({
    queryKey: ['characters'],
    queryFn: getCharactersByUser
  });

  const steps5e: ModificationStep[] = [
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
        <ClassesStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Subclasses',
      content: (
        <SubclassesStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Race',
      content: (
        <RaceStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Background',
      content: (
        <BackgroundStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Ability Scores',
      content: (
        <AbilityScoresStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Starting Items',
      content: (
        <StartingItemsStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: !isSetupComplete(character)
    },
    {
      name: 'Features',
      content: (
        <FeaturesStep
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
      {ruleset === '5e' &&
        <ModificationProcess
          open={showCharacterCreation}
          onClose={onCloseCharacterCreation}
          steps={steps5e}
          className="dnd-character-modification-process"
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
