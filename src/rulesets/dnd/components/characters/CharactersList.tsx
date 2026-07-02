import CharacterCard from "./CharacterCard";
import Button from "@/components/library/Button";
import { deleteCharacter, getCharactersByUser } from "@/rulesets/dnd/services/charactersService";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ModificationProcess, { ModificationStep } from "@/components/ModificationProcess";
import SetupStep, { isSetupComplete } from "../modification-processes/character-creation/SetupStep";
import { useCharacterDraft } from "../hooks/useCharacterDraft";
import ClassesStep, { isClassesComplete } from "../../../5e/components/modification-processes/character-creation/ClassesStep";
import SubclassesStep, { isSubclassesComplete } from "../../../5e/components/modification-processes/character-creation/SubclassesStep";
import RaceStep, { isRaceComplete } from "../../../5e/components/modification-processes/character-creation/RaceStep";
import BackgroundStep, { isBackgroundComplete } from "../../../5e/components/modification-processes/character-creation/BackgroundStep";
import AbilityScoresStep, { isAbilityScoresComplete } from "../../../5e/components/modification-processes/character-creation/AbilityScoresStep";
import StartingItemsStep, { isStartingItemsComplete } from "../../../5e/components/modification-processes/character-creation/StartingItemsStep";
import FeaturesStep, { isFeaturesComplete } from "../../../5e/components/modification-processes/character-creation/FeaturesStep";


export default function CharactersList() {
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);
  const { character, updateCharacter, resetCharacter } = useCharacterDraft();
  const [changesRequired, setChangesRequired] = useState({
    setup: true,
    classes: true,
    subclasses: true,
    race: true,
    subrace: true,
    background: true,
    abilityScore: true,
    startingItems: true,
    features: true
  });

  useEffect(() => {
    setChangesRequired({
      setup: !isSetupComplete(character),
      classes: !isClassesComplete(character),
      subclasses: !isSubclassesComplete(character),
      race: !isRaceComplete(character),
      subrace: !isRaceComplete(character),
      background: !isBackgroundComplete(character),
      abilityScore: !isAbilityScoresComplete(character),
      startingItems: !isStartingItemsComplete(character),
      features: !isFeaturesComplete(character),
    });
  }, [character]);

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
      changesRequired: changesRequired.setup
    },
    {
      name: 'Classes',
      content: (
        <ClassesStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: changesRequired.classes
    },
    {
      name: 'Subclasses',
      content: (
        <SubclassesStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: changesRequired.subclasses
    },
    {
      name: 'Race',
      content: (
        <RaceStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: changesRequired.race
    },
    {
      name: 'Background',
      content: (
        <BackgroundStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: changesRequired.background
    },
    {
      name: 'Ability Scores',
      content: (
        <AbilityScoresStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: changesRequired.abilityScore
    },
    {
      name: 'Starting Items',
      content: (
        <StartingItemsStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: changesRequired.startingItems
    },
    {
      name: 'Features',
      content: (
        <FeaturesStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: changesRequired.features
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
        steps={steps5e}
        className="dnd-character-modification-process"
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
