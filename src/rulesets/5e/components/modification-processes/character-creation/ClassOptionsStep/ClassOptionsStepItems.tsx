import Button from "@/components/library/Button";
import { getClassById } from "@/rulesets/5e/services/classesService";
import { characterCreationProcess5eAtom } from "@/scripts/atoms/state";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
}


export default function ClassOptionsStepItems({ character, updateCharacter }: Props) {
  const [process, setProcess] = useAtom<CharacterCreationProcess_5e>(characterCreationProcess5eAtom);
  const [openDescriptions, setOpenDescriptions] = useState<Set<number>>(new Set());
  
  const { data: primaryClass } = useQuery<Class_5e | null>({
    queryKey: ['primaryClass', character.classes],
    queryFn: () => getClassById(character.classes[0].classId)
  });

  useEffect(() => {
    if (!process.itemPage || !primaryClass) return;
    if (process.itemPage === 'gear') {
      const items = [...primaryClass.startingItems];

      primaryClass.startingItemChoices.forEach((choice, choiceIndex) => {
        const selectedOptionIndex = process.selectedChoices[choiceIndex];
        if (selectedOptionIndex === undefined) return;

        items.push(choice.options[selectedOptionIndex]);
      });

      updateCharacter({ ...character, items });
    } else {
      updateCharacter({ ...character, items: [] });
    }
  }, [process.itemPage, primaryClass, process.selectedChoices]);

  const onClickToggleDesc = (hasDesc: boolean, index: number) => {
    if (!hasDesc) return;

    setOpenDescriptions((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }


  if (!primaryClass) return;

  return (
    <div className="class-options-step__starting-items">
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
        <Button
          style={process.itemPage === 'gear' ? { textShadow: 'var(--pink-1) 1px 0 10px' } : {}}
          variants={['small', 'secondary-blue']}
          onClick={() => setProcess((prev) => ({ ...prev, itemPage: 'gear' }))}
        >
          Starting Items
        </Button>
        <h3>OR</h3>
        <Button
          style={process.itemPage === 'gold' ? { textShadow: 'var(--pink-1) 1px 0 10px' } : {}}
          variants={['small', 'secondary-blue']}
          onClick={() => setProcess((prev) => ({ ...prev, itemPage: 'gold' }))}
        >
          Buy Gear With Gold
        </Button>
      </div>
      
      {process.itemPage === 'gear' &&
        <ul style={{ textAlign: 'start' }}>
          {primaryClass.startingItemChoices.map((choice, i) => (
            <li key={`choice-${i}`}>
              <div>{ choice.description }</div>
              
              <div style={{ display: 'flex', gap: '0.2rem', margin: '0.3rem 0 0.8rem' }}>
                {choice.options.map((option, optionIndex) => {
                  return (
                    <Button
                      key={optionIndex}
                      style={process.selectedChoices[i] === optionIndex ? { background: 'var(--bg-2)' } : {}}
                      variants={['small']}
                      onClick={() => {
                        setProcess((prev) => ({
                          ...prev,
                          selectedChoices: { ...prev.selectedChoices, [i]: optionIndex, }
                        }));
                      }}
                    >
                      { option.data.name }
                      { option.qty > 1 ? ` (${option.qty})` : '' }
                    </Button>
                  );
                })}
              </div>

              {process.selectedChoices[i] !== undefined &&
                choice.options[process.selectedChoices[i]].data.description && (
                  <div className="class-options-step__starting-item-desc">
                    {choice.options[process.selectedChoices[i]].data.description}
                  </div>
                )}
            </li>
          ))}

          {primaryClass.startingItems.map((item, i) => {
            const hasDesc = !!item.data.description;
            const isOpen = openDescriptions.has(i);

            return (
              <li key={i}>
                <span
                  style={hasDesc ? { textDecoration: 'underline', cursor: 'pointer' } : {}}
                  onClick={() => onClickToggleDesc(hasDesc, i)}
                >
                  { item.data.name }
                  { item.qty > 1 ? ` (${item.qty})` : '' }
                </span>

                {(hasDesc && isOpen) && (
                  <span className="class-options-step__starting-item-desc">{ item.data.description }</span>
                )}
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
}
