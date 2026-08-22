import Button from "@/components/library/Button";
import { getClassById } from "@/rulesets/5e/services/classesService";
import { SearchItems_5e } from "@/rulesets/5e/services/itemsService";
import { selectItem } from "@/rulesets/dnd/dialogs/ItemSelectionDialog";
import { characterCreationProcess5eAtom, gameAtom } from "@/scripts/atoms/state";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Fragment, useEffect, useState } from "react";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
}


export default function ClassOptionsStepItems({ character, updateCharacter }: Props) {
  const [process, setProcess] = useAtom<CharacterCreationProcess_5e>(characterCreationProcess5eAtom);
  const [game] = useAtom<Game | null>(gameAtom);
  const [openDescriptions, setOpenDescriptions] = useState<Set<number>>(new Set());

  const { data: primaryClass } = useQuery<Class_5e | null>({
    queryKey: ['primaryClass', character.classes],
    queryFn: () => getClassById(character.classes[0].classId),
    enabled: character.classes.length > 0
  });

  useEffect(() => {
    if (!process.itemPage || !primaryClass) return;
    if (process.itemPage === 'gear') {
      const items = [...primaryClass.startingItems];

      primaryClass.startingItemChoices.forEach((choice, choiceIndex) => {
        const selectedOptionIndex = process.selectedChoices[choiceIndex];
        if (selectedOptionIndex === undefined) return;

        items.push(...resolveSelections(choice.options[selectedOptionIndex]));
      });

      updateCharacter({ ...character, items });
    } else {
      updateCharacter({ ...character, items: [] });
    }
  }, [process.itemPage, primaryClass, process.selectedChoices]);

  function resolveSelections(selections: (ItemSelection_dnd | ItemChoices_dnd)[]): ItemSelection_dnd[] {
    const result: ItemSelection_dnd[] = [];
    if (!Array.isArray(selections)) return result;

    for (const selection of selections) {
      if (!selection) continue;

      if ('data' in selection) {
        result.push(selection);
        continue;
      }

      if ('options' in selection) {
        const next = selection.options?.[0];

        if (Array.isArray(next)) {
          result.push(...resolveSelections(next));
        }
      }
    }
    return result;
  }

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
  };

  const getItemCategory = (choice: ItemChoices_dnd, optionIndex: number): EquipmentCategory_dnd | null => {
    const option = choice.options[optionIndex];

    for (const item of option) {
      if ('data' in item) {
        continue;
      }
      
      if ('options' in item) {
        return getItemCategoryFromDescription(item.description);
      }
    }

    return getItemCategoryFromDescription(choice.description);
  };

  const getItemCategoryFromDescription = (description: string): EquipmentCategory_dnd | null => {
    const value = description.toLowerCase();
    if (value.includes('weapon')) return 'Weapon';
    if (value.includes('armor')) return 'Armor';
    if (value.includes('tool')) return 'Tool';
    if (value.includes('instrument')) return 'Instrument';
    return null;
  };

  const getWeaponType = (description: string): WeaponType_dnd | null => {
    const value = description.toLowerCase();
    if (value.includes('martial')) return 'Martial';
    if (value.includes('simple')) return 'Simple';
    if (value.includes('firearm')) return 'Firearm';
    return null;
  };

  const onClickSelectOption = async (choice: ItemChoices_dnd, optionIndex: number, index: number) => {
    const customChoice = choice.options[optionIndex]
      .find((item): item is ItemChoices_dnd => 'options' in item);

    if (customChoice) {
      const search: SearchItems_5e = {
        gameId: game?.pubId ?? null,
        worldId: null,
        userContent: false,
        name: null,
        type: getItemCategory(choice, optionIndex),
        weaponType: getWeaponType(choice.description),
        rarity: null
      };
      const items = (await selectItem(search, customChoice.amount))
        .map((i) => ({ itemId: i.id, qty: 1, data: { name: i.name, desc: '' } }));

      setProcess((prev) => ({
        ...prev,
        selectedChoices: {
          ...prev.selectedChoices,
          [index]: {
            ...prev.selectedChoices[index],
            index: optionIndex,
            items,
            customItems: {
              ...prev.selectedChoices[index]?.customItems,
              [optionIndex]: items
            }
          }
        }
      }));
      return;
    }

    setProcess((prev) => ({
      ...prev,
      selectedChoices: { ...prev.selectedChoices, [index]: { index: optionIndex, items: choice.options[optionIndex] } }
    }));
  };


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
          {primaryClass.startingItemChoices.map((choice, i) => ( // TODO: Set itemId for starting_items in 5e.classes table
            <li key={`choice-${i}`}>
              <div>{ choice.description }</div>
              
              <div style={{ display: 'flex', gap: '0.2rem', margin: '0.3rem 0 0.8rem' }}>
                {choice.options.map((option, optionIndex) => {
                  const customItems: ItemSelection_dnd[] = process.selectedChoices[i]?.customItems?.[optionIndex];
                  const isSelected = process.selectedChoices[i]?.index === optionIndex;

                  return (
                    <Button
                      key={optionIndex}
                      style={isSelected ? { background: 'var(--bg-2)' } : {}}
                      variants={['small']}
                      onClick={() => onClickSelectOption(choice, optionIndex, i)}
                    >
                      {option.map((item, itemIndex) => {
                        if ('data' in item) {
                          return (
                            <Fragment key={itemIndex}>
                              { item.data.name }
                              { item.qty > 1 ? ` (${item.qty})` : '' }
                              { itemIndex < option.length - 1 ? ', ' : '' }
                            </Fragment>
                          );
                        }

                        if ('options' in item) {
                          const name = customItems?.map((customItem) => customItem.data.name).join(', ');

                          return (
                            <Fragment key={itemIndex}>
                              { (isSelected && name) ? name : item.description }
                              { itemIndex < option.length - 1 ? ', ' : '' }
                            </Fragment>
                          );
                        }

                        return null;
                      })}
                    </Button>
                  );
                })}
              </div>

              {process.selectedChoices[i]?.index !== undefined &&
                resolveSelections(choice.options[process.selectedChoices[i]]).map((item, index) =>
                  item.data.description ? (
                    <div key={index} className="class-options-step__starting-item-desc">
                      { item.data.description }
                    </div>
                  ) : null
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
