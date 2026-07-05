import ClassOptionsStepItems from "./ClassOptionsStepItems";
import ClassOptionsStepProficiencies from "./ClassOptionsStepProficiencies";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
}


export default function ClassOptionsStep({ character, updateCharacter }: Props) {
  return (
    <div className="class-options-step">
      <ClassOptionsStepProficiencies character={character} updateCharacter={updateCharacter} />
      <hr/>
      <ClassOptionsStepItems character={character} updateCharacter={updateCharacter} />
      <br />
    </div>
  );
}

export const isClassOptionsComplete = (character: CharacterDraft_5e, classesData: Class_5e[]): boolean => {
  const hasSelection = (name: string, source: string) => {
    return (
      character.skills.some((s) => s.name === name && s.source === source) ||
      character.proficiencies.tools.some((p) => p.name === name && p.source === source) ||
      character.proficiencies.instruments.some((p) => p.name === name && p.source === source)
    );
  };

  const countStrings = (options: string[], source: string) =>
    options.reduce((acc, o) => acc + (hasSelection(o, source) ? 1 : 0), 0);

  const evaluateChoice = (choice: ProfChoice_dnd, source: string): boolean => {
    const opts = choice.options;

    if (typeof opts[0] === 'string') {
      return countStrings(opts as string[], source) >= choice.amount;
    }

    return (opts as ProfChoice_dnd[]).some((group) => evaluateChoice(group, source));
  };

  const hasStartingItemChoices = (classData: Class_5e) => {
    return classData.startingItemChoices.every((choice) =>
      choice.options.some((optionGroup) =>
        character.items.some((item) =>
          optionGroup.some((option) => {
            if (!("data" in option)) return false;

            return (
              item.data.name === option.data.name &&
              item.qty === option.qty
            );
          })
        )
      )
    );
  };

  return character.classes.every((playerClass, i) => {
    const classData = classesData.find((c) => c.id === playerClass.classId);
    if (!classData) return false;

    const source = classData.name.toLowerCase();
    const choices = i === 0 ? classData.profChoices : classData.multiClassing.profChoices;
    const profsComplete = choices.every((choice) => evaluateChoice(choice, source));

    if (!profsComplete) return false;

    if (i === 0 && !hasStartingItemChoices(classData)) {
      return false;
    }

    return true;
  });
};