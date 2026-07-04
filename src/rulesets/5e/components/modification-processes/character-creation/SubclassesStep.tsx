import { gameAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
}


export default function SubclassesStep({ character, updateCharacter }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);


  return (
    <div className="subclasses-step">
      
    </div>
  );
}

export const isSubclassesComplete = (character: CharacterDraft_5e): boolean => {
  return !!character;
};
