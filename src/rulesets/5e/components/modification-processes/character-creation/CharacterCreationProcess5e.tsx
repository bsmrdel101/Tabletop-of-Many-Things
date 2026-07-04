import { useEffect, useState } from "react";
import ModificationProcess, { ModificationStep } from "@/components/ModificationProcess";
import SetupStep, { isSetupComplete } from "./SetupStep";
import { useCharacterDraft } from "../../../hooks/useCharacterDraft";
import ClassesStep, { isClassesComplete } from "./ClassesStep";
import SubclassesStep, { isSubclassesComplete } from "./SubclassesStep";
import RaceStep, { isRaceComplete } from "./RaceStep";
import BackgroundStep, { isBackgroundComplete } from "./BackgroundStep";
import AbilityScoresStep, { isAbilityScoresComplete } from "./AbilityScoresStep";
import StartingItemsStep, { isStartingItemsComplete } from "./StartingItemsStep";
import FeaturesStep, { isFeaturesComplete } from "./FeaturesStep";
import ClassOptionsStep, { isClassOptionsComplete } from "@/rulesets/5e/components/modification-processes/character-creation/ClassOptionsStep";
import useClasses from "@/rulesets/5e/hooks/useClasses";
import { useAtom } from "jotai";
import { gameAtom } from "@/scripts/atoms/state";

interface Props {
  showCharacterCreation: boolean
  setShowCharacterCreation: (value: boolean) => void
  refetch: () => void
}


export default function CharacterCreationProcess5e({ showCharacterCreation, setShowCharacterCreation, refetch }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);
  const { character, updateCharacter, resetCharacter } = useCharacterDraft();
  const { classes } = useClasses(game?.pubId ?? null, game?.worldId ?? null, true);
  const [changesRequired, setChangesRequired] = useState({
    setup: true,
    classes: true,
    classOptions: true,
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
      classOptions: !isClassOptionsComplete(character, classes),
      subclasses: !isSubclassesComplete(character),
      race: !isRaceComplete(character),
      subrace: !isRaceComplete(character),
      background: !isBackgroundComplete(character),
      abilityScore: !isAbilityScoresComplete(character),
      startingItems: !isStartingItemsComplete(character),
      features: !isFeaturesComplete(character)
    });
  }, [character]);

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
      name: 'Class Options',
      content: (
        <ClassOptionsStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: changesRequired.classOptions,
      disabled: character.classes.length === 0
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

  const onCloseCharacterCreation = async () => {

    
    setShowCharacterCreation(false);
    resetCharacter();
    refetch();
  };


  return (
    <ModificationProcess
      open={showCharacterCreation}
      onClose={onCloseCharacterCreation}
      steps={steps5e}
      className="dnd-character-modification-process"
    />
  );
}
