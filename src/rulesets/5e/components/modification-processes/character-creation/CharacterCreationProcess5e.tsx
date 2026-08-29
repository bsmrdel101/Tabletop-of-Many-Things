import { useEffect, useState } from "react";
import ModificationProcess, { ModificationStep } from "@/components/ModificationProcess";
import SetupStep, { isSetupComplete } from "./SetupStep";
import { useCharacterDraft } from "../../../hooks/useCharacterDraft";
import ClassesStep, { isClassesComplete } from "./ClassesStep";
import RaceStep, { isRaceComplete } from "./RaceStep";
import BackgroundStep, { isBackgroundComplete } from "./BackgroundStep";
import AbilityScoresStep, { isAbilityScoresComplete } from "./AbilityScoresStep";
import FeaturesStep, { isFeaturesComplete } from "./FeaturesStep";
import ClassOptionsStep, { isClassOptionsComplete } from "@/rulesets/5e/components/modification-processes/character-creation/ClassOptionsStep/ClassOptionsStep";
import { useAtom } from "jotai";
import { characterCreationProcess5eAtom, gameAtom } from "@/scripts/atoms/state";
import { useQuery } from "@tanstack/react-query";
import { getClasses } from "@/rulesets/5e/services/classesService";
import { getRaces } from "@/rulesets/dnd/services/racesService";

interface Props {
  showCharacterCreation: boolean
  setShowCharacterCreation: (value: boolean) => void
  refetch: () => void
}


export default function CharacterCreationProcess5e({ showCharacterCreation, setShowCharacterCreation, refetch }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);
  const [process, setProcess] = useAtom<CharacterCreationProcess_5e>(characterCreationProcess5eAtom);
  const { character, updateCharacter, resetCharacter } = useCharacterDraft();
  const [changesRequired, setChangesRequired] = useState({
    setup: true,
    classes: true,
    classOptions: true,
    race: true,
    subrace: true,
    background: true,
    abilityScore: true,
    features: true
  });

  const { data: classes = [] } = useQuery<Class_5e[]>({
    queryKey: ['classes', game],
    queryFn: () => getClasses({ gameId: game?.pubId ?? null, worldId: game?.worldId ?? null, userContent: true })
  });

  const { data: races = [] } = useQuery<Race_5e[]>({
    queryKey: ['races', game],
    queryFn: async () => {
      const search = {
        gameId: game?.pubId ?? null,
        worldId: game?.worldId ?? null,
        userContent: false,
        name: null
      };
      return await getRaces(search);
    }
  });

  useEffect(() => {
    setChangesRequired({
      setup: !isSetupComplete(character),
      classes: !isClassesComplete(character),
      classOptions: !isClassOptionsComplete(character, classes, process),
      race: !isRaceComplete(character),
      subrace: !isRaceComplete(character),
      background: !isBackgroundComplete(character),
      abilityScore: !isAbilityScoresComplete(character),
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
          classes={classes}
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
      name: 'Race',
      content: (
        <RaceStep
          character={character}
          updateCharacter={updateCharacter}
          races={races}
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
      name: 'Hit Points',
      content: (
        <AbilityScoresStep
          character={character}
          updateCharacter={updateCharacter}
        />
      ),
      changesRequired: changesRequired.abilityScore,
      hidden: character.lvl <= 1
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
    setProcess({
      focusedClass: null,
      itemPage: 'gear',
      selectedChoices: {}
    });
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
