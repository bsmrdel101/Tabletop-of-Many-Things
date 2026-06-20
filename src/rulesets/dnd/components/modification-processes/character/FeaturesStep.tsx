import { gameAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";

interface Props {
  character: CharacterDraft_Dnd
  updateCharacter: (value: CharacterDraft_Dnd) => void
}


export default function FeaturesStep({ character, updateCharacter }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);


  return (
    <div className="features-step">
      
    </div>
  );
}

export const isFeaturesComplete = (character: CharacterDraft_Dnd): boolean => {
  return !!character;
};
