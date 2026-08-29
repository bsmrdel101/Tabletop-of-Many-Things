import Button from "@/components/library/Button";
import Img from "@/components/library/Img";
import Proficiencies from "@/rulesets/dnd/components/stat-block/Proficiencies";
import { fullAbilityScoreName } from "@/rulesets/dnd/scripts/utils";
import { characterCreationProcess5eAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";
import { useMemo } from "react";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
  classes: Class_5e[]
}


export default function ClassesStep({ character, updateCharacter, classes }: Props) {
  const [process, setProcess] = useAtom<CharacterCreationProcess_5e>(characterCreationProcess5eAtom);
  const totalLvl = useMemo(() => character.classes.reduce((acc, c) => acc + c.lvl, 0), [character.classes]);
  const notFullyLeveled = totalLvl < character.lvl;

  const onClickAddClassLevel = (selectedClass: Class_5e) => {
    if (!notFullyLeveled) return;

    if (!character.classes.some((c) => c.classId === selectedClass.id)) {
      const newClass = {
        classId: selectedClass.id,
        name: selectedClass.name,
        lvl: 1,
        hitDice: selectedClass.hitDice,
        subclass: null
      } as PlayerClass_5e;

      updateCharacter({ ...character, classes: [...character.classes, newClass] });
    } else {
      const updatedClasses = character.classes.map((c) => {
        if (c.classId !== selectedClass.id) return c;
        return { ...c, lvl: c.lvl + 1 };
      });

      updateCharacter({ ...character, classes: updatedClasses });
    }
  };

  const onClickRemoveClassLevel = (selectedClass: Class_5e) => {
    if (!character.classes.some((c) => c.classId === selectedClass.id)) return;

    const updatedClasses = character.classes
      .map((c) => {
        if (c.classId !== selectedClass.id) return c;
        return { ...c, lvl: c.lvl - 1 };
      })
      .filter((c) => c.lvl > 0);

    const proficiencies = {
      weapons: [],
      armor: [],
      tools: [],
      instruments: [],
      vehicles: []
    };

    const isPrimaryClass = character.classes[0].classId === selectedClass.id;
    const items = isPrimaryClass ? [] : character.items;

    if (isPrimaryClass) {
      setProcess((prev) => ({ ...prev, selectedChoices: {} }));
    }

    updateCharacter({ ...character, classes: updatedClasses, skills: [], proficiencies, items });
  };


  return (
    <div className="classes-step">
      {totalLvl > character.lvl &&
        <h2 style={{ color: 'var(--red-4)' }}>Character should be lvl { character.lvl }</h2>
      }

      <div style={{ display: 'flex' }}>
        <div className="classes-step__class-options">
          {classes.map((c) => {
            const characterClass = character.classes.find((cl) => cl.classId === c.id);
            const isFocusedClass = c.id === process.focusedClass?.id;

            return (
              <div key={c.id} className="classes-step__class-option">
                <Button
                  style={process.focusedClass?.id === c.id ? { backgroundColor: 'var(--purple-dark-3)' } : {}}
                  variants={['dark']}
                  onClick={() => setProcess((prev) => ({ ...prev, focusedClass: c }))}
                >
                  { c.name }
                </Button>
                
                <div style={{ alignContent: 'center', position: 'relative' }}>
                  {characterClass &&
                    <div className="classes-step__lvl-container">
                      <p>Lvl { characterClass.lvl }</p>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <Button
                          variants={['success']}
                          onClick={() => onClickAddClassLevel(c)}
                          disabled={!notFullyLeveled}
                        >
                          +
                        </Button>
                        <Button
                          variants={['danger']}
                          onClick={() => onClickRemoveClassLevel(c)}
                        >
                          -
                        </Button>
                      </div>
                    </div>
                  }

                  {(isFocusedClass && !characterClass && notFullyLeveled) &&
                    <Button
                      className="classes-step__class-select-btn"
                      variants={['small']}
                      onClick={() => onClickAddClassLevel(c)}
                      disabled={!notFullyLeveled}
                    >
                      Select
                    </Button>
                  }
                </div>
              </div>
            );
          })}
        </div>

        {process.focusedClass &&
          <div style={{ width: '100%' }}>
            <h2 style={{ textDecoration: 'underline' }}>{ process.focusedClass.name }</h2>
            {process.focusedClass.img &&
              <Img
                style={{ width: '8rem', marginBottom: '0.3rem' }}
                src={process.focusedClass.img}
                alt={process.focusedClass.name}
              />
            }
            <p style={{ whiteSpace: 'pre-wrap' }}><em>{ process.focusedClass.description }</em></p>
            <hr style={{ margin: '1rem' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p><strong>Saving Throws: </strong> { process.focusedClass.saves.map((s) => fullAbilityScoreName(s)).join(', ') }</p>
              <Proficiencies proficiencies={process.focusedClass.proficiencies} noStyle={true} />
              <div>
                <p><strong>Subclasses (lvl)</strong></p>
                <ul>
                  { process.focusedClass.subclasses.map((s) => <li key={s.id}>{ s.name }</li>) }
                </ul>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export const isClassesComplete = (character: CharacterDraft_5e): boolean => {
  return (
    (character.classes.reduce((acc, c) => acc + c.lvl, 0) === character.lvl)
  );
};
