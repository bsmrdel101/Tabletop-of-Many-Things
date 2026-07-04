import { getClassById } from "@/rulesets/5e/services/classesService";
import ProfChoices from "@/rulesets/dnd/components/ProfChoices";
import Proficiencies from "@/rulesets/dnd/components/stat-block/Proficiencies";
import { useQuery } from "@tanstack/react-query";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
}


export default function ClassOptionsStep({ character, updateCharacter }: Props) {
  const getProfType = (choice: ProfChoice_Dnd): string => {
    if (typeof choice.options[0] !== 'string') return 'group';

    const description = choice.description.toLowerCase();
    if (description.includes('instrument')) return 'instruments';
    if (description.includes('tool')) return 'tools';
    return 'skills';
  };

  const getProfChoiceTitle = (choice: ProfChoice_Dnd): string => {
    if (typeof choice.options[0] !== 'string') {
      const titles = Array.from(
        new Set(
          choice.options.flatMap((option) => {
            const description = (option as ProfChoice_Dnd).description.toLowerCase();

            if (description.includes('instrument')) return ['Instruments'];
            if (description.includes('tool')) return ['Tools'];
            if (description.includes('skill')) return ['Skills'];
            return [];
          })
        )
      )

      return titles.length ? titles.join(' & ') : 'Proficiencies';
    }

    const description = choice.description.toLowerCase();
    if (description.includes('instrument')) return 'Instruments';
    if (description.includes('tool')) return 'Tools';
    return 'Skills';
  };

  const resolveGroupType = (name: string, choice: ProfChoice_Dnd): 'tools' | 'instruments' => {
    const found = choice.options.find((o) =>
      typeof o !== 'string' && (o as ProfChoice_Dnd).options?.includes(name as any)
    ) as ProfChoice_Dnd | undefined;

    const desc = found?.description.toLowerCase() ?? '';
    if (desc.includes('instrument')) return 'instruments';
    return 'tools';
  };

  const handleProfChoice = (name: string, checked: boolean, type: string, source: string, parentChoice?: ProfChoice_Dnd) => {
    if (type === 'skills') {
      const skills = checked ?
        [...character.skills, { name, source }]
        :
        character.skills.filter((s) => !(s.name === name && s.source === source));

      updateCharacter({ ...character, skills });
      return
    }

    const proficiencies: any = structuredClone(character.proficiencies) as ProfDraft_Dnd;
    const resolvedType = type === 'group' ? resolveGroupType(name, parentChoice!) : type;

    if (checked) {
      proficiencies[resolvedType].push({ name, source });
    } else {
      proficiencies[resolvedType] = proficiencies[resolvedType].filter((p: ProfSelectionDraft_Dnd) =>
        !(p.name === name && p.source === source)
      );
    }

    updateCharacter({ ...character, proficiencies });
  };
  

  return (
    <div className="class-options-step">
      {character.classes.map((c, i) => {
        const { data } = useQuery<Class_5e | null>({
          queryKey: ['class', c],
          queryFn: () => getClassById(c.classId)
        });

        if (!data) return null;

        const isPrimaryClass = (i === 0 || (character.classes.length > 1 && i === 0));
        const profChoices = isPrimaryClass ? data.profChoices : data.multiClassing.profChoices;
        const classSource = c.name.toLowerCase();
        const hasProficiencies = Object.values(data.multiClassing.proficiencies).some((row) => row.length > 0);

        return (
          <div key={i} className="class-options-step__class">
            <h1 style={{ textDecoration: 'underline' }}>
              { c.name }
              { isPrimaryClass && ' (primary)' }
            </h1>

            {(i > 0 && hasProficiencies) && (
              <Proficiencies
                proficiencies={data.multiClassing.proficiencies}
                noStyle={true}
              />
            )}

            <div className="class-options-step__skills">
              {profChoices.map((choice, i) => {
                const type = getProfType(choice);

                return (
                  <div key={i}>
                    <p style={{ marginBottom: '0.2rem' }}>
                      <strong>
                        { getProfChoiceTitle(choice) } (Pick { choice.amount })
                      </strong>
                    </p>

                    <ProfChoices
                      character={character}
                      profChoices={choice}
                      type={type}
                      source={classSource}
                      onChange={(name, checked, t) =>
                        handleProfChoice(name, checked, t, classSource, choice)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}


      <div className="class-options-step__starting-items">
        <h3>Starting Items</h3>
      </div>
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

  const evaluateChoice = (choice: ProfChoice_Dnd, source: string): boolean => {
    const opts = choice.options;

    if (typeof opts[0] === "string") {
      return countStrings(opts as string[], source) >= choice.amount;
    }

    const groups = opts as ProfChoice_Dnd[];
    return groups.some((group) => {
      return evaluateChoice(group, source);
    });
  };


  return character.classes.every((playerClass, i) => {
    const classData = classesData.find((c) => c.id === playerClass.classId);

    if (!classData) return false;

    const source = classData.name.toLowerCase();
    const choices = i === 0
      ? classData.profChoices
      : classData.multiClassing.profChoices;

    return choices.every((choice) => evaluateChoice(choice, source));
  });
};
