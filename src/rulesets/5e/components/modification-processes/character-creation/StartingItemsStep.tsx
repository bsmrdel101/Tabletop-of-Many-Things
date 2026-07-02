import { gameAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";

interface Props {
  character: CharacterDraft_Dnd
  updateCharacter: (value: CharacterDraft_Dnd) => void
}


export default function StartingItemsStep({ character, updateCharacter }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);


  return (
    <div className="starting-items-step">
      
    </div>
  );
}

export const isStartingItemsComplete = (character: CharacterDraft_Dnd): boolean => {
  return !!character;
};
