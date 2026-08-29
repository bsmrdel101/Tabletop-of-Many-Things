import Button from "@/components/library/Button";
import { fullAbilityScoreName } from "@/rulesets/dnd/scripts/utils";
import { useEffect } from "react";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
  races: Race_5e[]
}


export default function RaceStep({ character, updateCharacter, races }: Props) {
  useEffect(() => {
    if (character.subrace?.id && character.subrace.id === character.race?.id) return;
    updateCharacter({ ...character, subrace: null });
  }, [character.race]);


  return (
    <div className="races-step">
      <div style={{ display: 'flex' }}>
        <div className="races-step__race-options">
          {races.map((race) => {
            const isSelectedRace = character.race?.id === race.id;
            
            return (
              <div key={race.id} className="races-step__race-option">
                <Button
                  variants={['dark']}
                  style={isSelectedRace ? { backgroundColor: 'var(--purple-dark-3)' } : {}}
                  onClick={() => updateCharacter({ ...character, race: race })}
                >
                  { race.name }
                </Button>

                {(isSelectedRace && race.subraces.length > 0) &&
                  <div className="races-step__subrace-options">
                    <h3>Pick Subrace</h3>

                    {race.subraces.map((subrace) => {
                      const isSelectedSubrace = character.subrace?.id === subrace.id;

                      return (
                        <Button
                          key={subrace.id}
                          variants={['dark', 'small']}
                          style={isSelectedSubrace ? { backgroundColor: 'var(--purple-dark-3)' } : {}}
                          onClick={() => updateCharacter({ ...character, subrace: subrace })}
                        >
                          { subrace.name }
                        </Button>
                      );
                    })}
                  </div>
                }
              </div>
            );
          })}
        </div>

        <div>
          {character.subrace &&
            <div style={{ width: '100%', borderBottom: '2px solid white', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <h2 style={{ textDecoration: 'underline' }}>{ character.subrace.name }</h2>
              <p style={{ whiteSpace: 'pre-wrap', marginBottom: '0.5rem' }}><em>{ character.subrace.description }</em></p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>{ character.subrace.abilityBonuses.map((a) => `${fullAbilityScoreName(a.name)} +${a.value}`).join(', ') }</p>
              </div>
            </div>
          }

          {character.race &&
            <div style={{ width: '100%' }}>
              <h2 style={{ textDecoration: 'underline' }}>{ character.race.name }</h2>
              <p style={{ whiteSpace: 'pre-wrap', marginBottom: '0.5rem' }}><em>{ character.race.description }</em></p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>{ character.race.abilityBonuses.map((a) => `${fullAbilityScoreName(a.name)} +${a.value}`).join(', ') }</p>
                {character.race.alignment &&
                  <p><strong>Alignment </strong><br /> { character.race.alignment }</p>
                }
                {character.race.sizeDesc &&
                  <p><strong>Size </strong><br /> { character.race.sizeDesc }</p>
                }
                {character.race.age &&
                  <p><strong>Age </strong><br /> { character.race.age }</p>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export const isRaceComplete = (character: CharacterDraft_5e): boolean => {
  const hasSubraces = Number(character.race?.subraces.length) > 0;
  return (!!character.race && !hasSubraces) || (!!character.race && !!character.subrace);
};
