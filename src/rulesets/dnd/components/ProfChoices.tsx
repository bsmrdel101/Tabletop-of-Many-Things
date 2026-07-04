import Checkbox from "@/components/library/Checkbox";

interface Props {
  character: CharacterDraft_5e
  profChoices: ProfChoice_Dnd
  onChange: (name: string, checked: boolean, type: string) => void
  type: string
  source: string
  nested?: boolean
}


export default function ProfChoices({ character, profChoices, onChange, type, source, nested = false }: Props) {
  const isToolOrInstrumentGroup = type === 'tools' || type === 'instruments';

  const globalSelectedCount = [
    ...character.proficiencies.tools,
    ...character.proficiencies.instruments
  ].filter((p) => p.source === source).length;

  const getAllOwned = (name: string) => {
    return [
      ...character.skills,
      ...character.proficiencies.tools,
      ...character.proficiencies.instruments
    ].filter((p) => p.name === name);
  };

  const isOwnedByThisSource = (name: string) => {
    return getAllOwned(name).some((p) => p.source === source);
  };

  const isOwnedByOtherSource = (name: string) => {
    return getAllOwned(name).some((p) => p.source !== source);
  };

  const selectedCount = profChoices.options.filter((option) => {
    if (typeof option !== 'string') return;

    return (
      character.skills.some((s) => s.name === option && s.source === source) ||
      character.proficiencies.tools.some((p) => p.name === option && p.source === source) ||
      character.proficiencies.instruments.some((p) => p.name === option && p.source === source)
    );
  }).length;

  const maxReached = isToolOrInstrumentGroup ? globalSelectedCount >= profChoices.amount : selectedCount >= profChoices.amount;


  return (
    <div>
      { nested && <p><em>{ profChoices.description }</em></p> }

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: '0.3rem' }}>
        {profChoices.options.map((option, i) => {
          const name = typeof option === 'string' ? option : null;

          if (!name) {
            const nestedChoice = option as ProfChoice_Dnd;

            const nestedType =
              nestedChoice.description.toLowerCase().includes('instrument') ? 'instruments' : 'tools';

            return (
              <div key={i} style={{ marginTop: '1rem' }}>
                <ProfChoices
                  profChoices={option as ProfChoice_Dnd}
                  character={character}
                  onChange={onChange}
                  type={nestedType}
                  source={source}
                  nested={true}
                />
              </div>
            );
          }

          const isChecked = isOwnedByThisSource(name) || isOwnedByOtherSource(name);
          const isDisabled = isOwnedByOtherSource(name) || (!isChecked && maxReached);

          return (
            <div key={i} style={{ border: '1px solid black', padding: '0.2rem', borderRadius: '0.2rem' }}>
              <Checkbox
                label={name}
                checked={isChecked}
                disabled={isDisabled}
                onChange={(e) => {
                  if (isDisabled) return;
                  onChange(name, e.target.checked, type);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
