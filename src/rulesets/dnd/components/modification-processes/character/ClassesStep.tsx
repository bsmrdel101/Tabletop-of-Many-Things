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
  

  return (
    <div className="classes-step">
      <div>
        {classes.map((c) => {
          const characterClass = character.classes.find((cl) => cl.id === c.id)

          return (
            <div key={c.id}>
              <Button>{ c.name }</Button>
              
              <div>
                {characterClass ?
                  <p>Lvl</p>
                  :
                  <Button>Select</Button>
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
