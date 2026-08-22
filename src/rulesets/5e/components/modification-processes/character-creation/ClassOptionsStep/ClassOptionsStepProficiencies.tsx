import { getClassById } from "@/rulesets/5e/services/classesService";
import ProfChoices from "@/rulesets/dnd/components/ProfChoices";
import Proficiencies from "@/rulesets/dnd/components/stat-block/Proficiencies";
import { useQuery } from "@tanstack/react-query";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
}


export default function ClassOptionsStepProficiencies({ character, updateCharacter }: Props) {
  const getProfType = (choice: ProfChoice_dnd): string => {
    if (typeof choice.options[0] !== 'string') return 'group';

    const description = choice.description.toLowerCase();
    if (description.includes('instrument')) return 'instruments';
    if (description.includes('tool')) return 'tools';
    return 'skills';
  };

  const getProfChoiceTitle = (choice: ProfChoice_dnd): string => {
    if (typeof choice.options[0] !== 'string') {
      const titles = Array.from(
        new Set(
          choice.options.flatMap((option) => {
            const description = (option as ProfChoice_dnd).description.toLowerCase();

            if (description.includes('instrument')) return ['Instruments'];
            if (description.includes('tool')) return ['Tools'];
            if (description.includes('skill')) return ['Skills'];
            return [];
          })
        )
      );

      return titles.length ? titles.join(' & ') : 'Proficiencies';
    }

    const description = choice.description.toLowerCase();
    if (description.includes('instrument')) return 'Instruments';
    if (description.includes('tool')) return 'Tools';
    return 'Skills';
  };

  const resolveGroupType = (name: string, choice: ProfChoice_dnd): 'tools' | 'instruments' => {
    const found = choice.options.find((o) =>
      typeof o !== 'string' && (o as ProfChoice_dnd).options?.includes(name as any)
    ) as ProfChoice_dnd | undefined;

    const desc = found?.description.toLowerCase() ?? '';
    if (desc.includes('instrument')) return 'instruments';
    return 'tools';
  };

  const handleProfChoice = (name: string, checked: boolean, type: string, source: string, parentChoice?: ProfChoice_dnd) => {
    if (type === 'skills') {
      const skills = checked ?
        [...character.skills, { name, source }]
        :
        character.skills.filter((s) => !(s.name === name && s.source === source));

      updateCharacter({ ...character, skills });
      return;
    }

    const proficiencies: any = structuredClone(character.proficiencies) as ProfDraft_dnd;
    const resolvedType = type === 'group' ? resolveGroupType(name, parentChoice!) : type;

    if (checked) {
      proficiencies[resolvedType].push({ name, source });
    } else {
      proficiencies[resolvedType] = proficiencies[resolvedType].filter((p: ProfSelectionDraft_dnd) =>
        !(p.name === name && p.source === source)
      );
    }

    updateCharacter({ ...character, proficiencies });
  };


  return (
    <>
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
              { (character.classes.length > 1 && i === 0) && ' (primary)' }
            </h1>

            {(i > 0 && hasProficiencies) && (
              <Proficiencies
                title="Bonus Proficiencies"
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
    </>
  );
}
