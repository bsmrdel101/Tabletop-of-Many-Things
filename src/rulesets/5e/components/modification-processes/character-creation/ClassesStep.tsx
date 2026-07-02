import Button from "@/components/library/Button";
import useClasses from "@/rulesets/5e/hooks/useClasses";
import { gameAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";

interface Props {
  character: CharacterDraft_Dnd
  updateCharacter: (value: CharacterDraft_Dnd) => void
}


export default function ClassesStep({ character, updateCharacter }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);
  const [focusedClass, setFocusedClass] = useState<Class_5e | null>(null);
  const { classes } = useClasses(game?.pubId ?? null, game?.worldId ?? null, true);
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

    updateCharacter({ ...character, classes: updatedClasses });
  };


  return (
    <div className="classes-step">
      {totalLvl > character.lvl &&
        <h2 style={{ color: 'var(--red-4)' }}>Character should be lvl { character.lvl }</h2>
      }

      <div style={{ display: 'flex' }}>
        <div className="classes-step__class-options">
          {classes.map((c) => {
            const characterClass = character.classes.find((cl) => cl.classId === c.id)
            const isFocusedClass = c.id === focusedClass?.id;

            return (
              <div key={c.id} className="classes-step__class-option">
                <Button
                  variants={['dark']}
                  onClick={() => setFocusedClass(c)}
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

        {focusedClass &&
          <div>
            <p style={{ whiteSpace: "pre-wrap" }}>{ focusedClass.description }</p>
            <hr />
            <p><strong>Saving Throws: </strong> { focusedClass.saves.map((s) => s.name).join(', ') }</p>
            <p><strong>Skills (Pick):</strong></p>
            <p><strong>Starting Items:</strong></p>
            <p><strong>Subclasses (lvl):</strong></p>
          </div>
        }
      </div>
    </div>
  );
}

export const isClassesComplete = (character: CharacterDraft_Dnd): boolean => {
  return (
    (character.classes.reduce((acc, c) => acc + c.lvl, 0) === character.lvl)
  );
};
