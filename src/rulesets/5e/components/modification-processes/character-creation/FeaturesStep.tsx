import { gameAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
}


export default function FeaturesStep({ character, updateCharacter }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);
  console.log(character);

  return (
    <div className="features-step">
      
    </div>
  );
}

export const isFeaturesComplete = (character: CharacterDraft_5e): boolean => {
  return !!character;
};
