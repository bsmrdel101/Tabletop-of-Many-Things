import Button from "@/components/library/Button";
import useClasses from "@/rulesets/5e/hooks/useClasses";
import { gameAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";

interface Props {
  character: CharacterDraft_Dnd
  updateCharacter: (value: CharacterDraft_Dnd) => void
}


export default function ClassesStep({ character, updateCharacter }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);
  const { classes } = useClasses(game?.pubId ?? null, game?.worldId ?? null, true);

  const onClickAddClassLevel = (selectedClass: Class_5e) => {
    if (!character.classes.some((c) => c.classId === selectedClass.id)) {
      const newClass = {};
      updateCharacter({ ...character, classes: [...character.classes, newClass] });
    } else {
      const updatedClasses = character.classes.map((c) => {
        if (c.classId !== selectedClass.id) return c;
        return { ...c, lvl: c.lvl + 1 };
      });
      console.log({ ...character, classes: updatedClasses });
      
      updateCharacter({ ...character, classes: updatedClasses });
    }
  };


  return (
    <div className="classes-step">
      <div>
        {classes.map((c) => {
          const characterClass = character.classes.find((cl) => cl.id === c.id)

          return (
            <div key={c.id} className="classes-step__class-option">
              <Button variants={['dark']}>{ c.name }</Button>
              
              <div style={{ alignContent: 'center' }}>
                {characterClass ?
                  <>
                    <p>Lvl { characterClass.lvl }</p>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <Button
                        variants={['empty', 'success']}
                        onClick={() => onClickAddClassLevel(c)}
                      >
                        +
                      </Button>
                      <Button variants={['empty', 'danger']}>-</Button>
                    </div>
                  </>
                  :
                  <Button
                    variants={['small']}
                    onClick={() => onClickAddClassLevel(c)}
                  >
                    Select
                  </Button>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const isClassesComplete = (character: CharacterDraft_Dnd): boolean => {
  return (
    (character.classes.reduce((acc, c) => acc + c.lvl, 0) === character.lvl)
  );
};
